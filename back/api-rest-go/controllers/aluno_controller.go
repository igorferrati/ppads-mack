package controllers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/igorferrati/ppads-mack/database"
	"github.com/igorferrati/ppads-mack/models"
	"gopkg.in/gomail.v2"
)

// GetAllAlunos buscar todos alunos no banco de dados
func GetAllAlunos(c *gin.Context) {
	var alunos []models.Aluno
	database.DB.Find(&alunos)
	c.JSON(200, alunos)
}

// AlunosInfo buscar informações combinadas de todos alunos no banco de dados
func AlunosInfo(c *gin.Context) {
	// Struct para representar um aluno com todas as matérias
	type AlunoWithMaterias struct {
		ID          uint     `json:"id"`
		NomeAluno   string   `json:"nome_aluno"`
		Turma       string   `json:"turma"`
		Responsavel string   `json:"responsavel"`
		Faltas      uint     `json:"faltas"`
		Materias    []string `json:"materias"`
	}

	// Variável para armazenar todos os alunos com todas as matérias
	var alunosComMaterias []AlunoWithMaterias

	// Consulta ao banco de dados para obter todas as matrículas de todas as matérias para todos os alunos
	rows, err := database.DB.Table("presencas").
		Select("aluno_id, alunos.nome_aluno, alunos.turma, alunos.responsavel, alunos.faltas, materias.nome_materia").
		Joins("LEFT JOIN alunos ON presencas.aluno_id = alunos.id").
		Joins("LEFT JOIN materias ON presencas.materia_id = materias.id").
		Rows()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar alunos"})
		return
	}
	defer rows.Close()

	alunosMap := make(map[uint]*AlunoWithMaterias)

	for rows.Next() {
		var alunoID uint
		var alunoNome, alunoTurma, alunoResponsavel string
		var alunoFaltas uint
		var materiaNome string

		err := rows.Scan(&alunoID, &alunoNome, &alunoTurma, &alunoResponsavel, &alunoFaltas, &materiaNome)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar alunos"})
			return
		}

		if _, ok := alunosMap[alunoID]; !ok {
			alunosMap[alunoID] = &AlunoWithMaterias{
				ID:          alunoID,
				NomeAluno:   alunoNome,
				Turma:       alunoTurma,
				Responsavel: alunoResponsavel,
				Faltas:      alunoFaltas,
				Materias:    make([]string, 0),
			}
		}
		alunosMap[alunoID].Materias = append(alunosMap[alunoID].Materias, materiaNome)
	}

	// Convertendo o mapa de alunos de volta para um slice
	for _, aluno := range alunosMap {
		alunosComMaterias = append(alunosComMaterias, *aluno)
	}

	c.JSON(http.StatusOK, alunosComMaterias)
}

// GetAlunoByID buscar um aluno por ID no banco de dados
func GetAlunoByID(c *gin.Context) {
	var aluno models.Aluno
	id := c.Params.ByName("id")
	database.DB.First(&aluno, id)

	if aluno.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"Not found": "Aluno não encontrado"})
		return
	}

	c.JSON(http.StatusOK, aluno)
}

// CreateAluno cria aluno no banco de dados
func CreateAluno(c *gin.Context) {
	var aluno models.Aluno
	if err := c.ShouldBindJSON(&aluno); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error()})
		return
	}
	database.DB.Create(&aluno)
	c.JSON(http.StatusOK, aluno)
}

// UpdateAluno atualiza aluno no banco de dados
func UpdateAluno(c *gin.Context) {
	var aluno models.Aluno
	id := c.Params.ByName("id")
	database.DB.First(&aluno, id)

	if err := c.ShouldBindJSON(&aluno); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error()})
		return
	}

	database.DB.Model(&aluno).UpdateColumns(aluno)
	c.JSON(http.StatusOK, aluno)
}

// DeleteAluno deleta aluno no banco de dados
func DeleteAluno(c *gin.Context) {
	var aluno models.Aluno
	id := c.Params.ByName("id")
	database.DB.Delete(&aluno, id)
	c.JSON(http.StatusOK, gin.H{"data": "Aluno deletado com sucesso"})
}

// AlunosTurma busca alunos por turmas
func AlunosTurma(c *gin.Context) {
	var alunos []models.Aluno
	serie := c.Params.ByName("serie")

	//alunos com base na série
	if err := database.DB.Where("turma LIKE ?", serie+"%").Find(&alunos).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar alunos"})
		return
	}

	if len(alunos) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "Não há alunos nesta série ou série não existe."})
		return
	}

	c.JSON(http.StatusOK, alunos)
}

// AlunosFaltas verifica e envia email caso aluno exceda limite de faltas
func AlunosFaltas(c *gin.Context) {
	var alunosComFalta []models.Aluno
	limiteFaltas := 4

	// Buscar alunos com faltas maiores que 4
	if err := database.DB.Where("faltas > ?", limiteFaltas).Find(&alunosComFalta).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar alunos com faltas"})
		return
	}

	// Coletar e-mails dos responsáveis dos alunos com faltas
	var emailsResponsaveis []string
	for _, aluno := range alunosComFalta {
		emailsResponsaveis = append(emailsResponsaveis, aluno.Email_responsavel)
	}

	// Enviar e-mail de aviso para cada responsável
	for _, email := range emailsResponsaveis {
		if err := enviarEmail(email, "Aviso de faltas", "Atenção, o aluno excedeu o limite de faltas permitido. Por favor entre em contato com a direção."); err != nil {
			log.Printf("Erro ao enviar e-mail para %s: %v\n", email, err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao enviar e-mail"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "Validação de faltas realizada com sucesso. Caso o sistema encontre algum aluno com faltas em excesso um aviso por email será lançado para o resposável"})
}

// Função de exemplo para envio de e-mail
func enviarEmail(destinatario, assunto, corpo string) error {
	m := gomail.NewMessage()
	m.SetHeader("From", "octonogo.school@gmail.com")
	m.SetHeader("To", destinatario)
	m.SetHeader("Subject", assunto)
	m.SetBody("text/plain", corpo)

	d := gomail.NewDialer("smtp.gmail.com", 587, "octonogo.school@gmail.com", "phtt okrv ewjr aglm")
	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}
