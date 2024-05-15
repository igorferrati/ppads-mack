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

	// Struct anônima para representar os alunos
	type Aluno struct {
		ID          uint   `json:"id"`
		NomeAluno   string `json:"nome_aluno"`
		Turma       string `json:"turma"`
		Responsavel string `json:"responsavel"`
		Faltas      uint   `json:"faltas"`
	}

	// Struct para representar o resultado final
	type AlunoInfo struct {
		Aluno
		NomeMateria   string `json:"nome_materia"`
		NomeProfessor string `json:"nome_professor"`
	}

	// Recuperar os alunos do banco de dados
	var alunos []Aluno
	if err := database.DB.Table("alunos").
		Select("id, nome_aluno, turma, responsavel, faltas").
		Find(&alunos).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar alunos"})
		return
	}

	// Listas de matérias e professores
	materias := []string{"Matemática", "Português", "História", "Ciências", "Física", "Química", "Geografia", "Biologia", "Inglês", "Artes"}
	professores := []string{"Carlos Ribeiro", "Paula Veniz", "Bruna Deodor", "Filipe José"}

	// Iterar sobre os alunos e atribuir matérias e professores
	var alunosComInfo []AlunoInfo
	for i, aluno := range alunos {
		info := AlunoInfo{
			Aluno:         aluno,
			NomeMateria:   materias[i%len(materias)],
			NomeProfessor: professores[i%len(professores)],
		}
		alunosComInfo = append(alunosComInfo, info)
	}

	c.JSON(http.StatusOK, alunosComInfo)
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
