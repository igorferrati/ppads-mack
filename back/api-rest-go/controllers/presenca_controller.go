package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/igorferrati/ppads-mack/database"
	"github.com/igorferrati/ppads-mack/models"
)

func GetPresencaTurmas(c *gin.Context) {
	turma := c.Param("turma")

	//struct anônima
	var presencas []struct {
		ID            uint   `json:"id"`
		NomeAluno     string `json:"nome_aluno"`
		Turma         string `json:"turma"`
		Responsavel   string `json:"responsavel"`
		NomeMateria   string `json:"nome_materia"`
		NomeProfessor string `json:"nome_professor"`
		Faltas        uint   `json:"faltas"`
	}

	// Consulta ao banco de dados
	err := database.DB.Table("alunos").
		Select("alunos.id, alunos.nome_aluno, alunos.turma, alunos.responsavel, materias.nome_materia, professores.nome_professor, alunos.faltas").
		Joins("LEFT JOIN presencas ON alunos.id = presencas.aluno_id").
		Joins("LEFT JOIN materias ON presencas.materia_id = materias.id").
		Joins("LEFT JOIN professores ON presencas.professor_id = professores.id").
		Where("alunos.turma = ?", turma).
		Scan(&presencas).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Turma não encontrada ou inexistente."})
		return
	}

	c.JSON(http.StatusOK, presencas)
}

// TODO
func RegisterPresenca(c *gin.Context) {
	// Definir a estrutura para receber os dados da requisição
	type RequestBody struct {
		AlunoID     uint   `json:"aluno_id"`
		MateriaID   uint   `json:"materia_id"`
		ProfessorID uint   `json:"professor_id"`
		Data        string `json:"data"`
		Presente    bool   `json:"presente"`
	}

	// Bind the request body to the struct
	var requestBody RequestBody
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos"})
		return
	}

	// Verificar se o aluno existe
	var aluno models.Aluno
	if err := database.DB.First(&aluno, requestBody.AlunoID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Aluno não encontrado"})
		return
	}

	// Criar o registro de presença
	presenca := models.Presenca{
		AlunoID:     requestBody.AlunoID,
		MateriaID:   requestBody.MateriaID,
		ProfessorID: requestBody.ProfessorID,
		Data:        requestBody.Data,
		Presente:    requestBody.Presente,
	}

	// Salvar a presença no banco de dados
	if err := database.DB.Create(&presenca).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao registrar presença"})
		return
	}

	// Se o aluno estiver presente, incrementar o número de faltas
	if requestBody.Presente {
		aluno.Faltas++
		if err := database.DB.Save(&aluno).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar faltas do aluno"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "Presença registrada com sucesso"})
}
