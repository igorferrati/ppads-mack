package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/igorferrati/ppads-mack/database"
	"github.com/igorferrati/ppads-mack/models"
)

func GetPresencaTurmas(c *gin.Context) {
	turma := c.Param("turma")

	type Presenca struct {
		ID          uint   `json:"id"`
		NomeAluno   string `json:"nome_aluno"`
		Turma       string `json:"turma"`
		Responsavel string `json:"responsavel"`
		Faltas      uint   `json:"faltas"`
	}

	// Struct para representar o resultado final
	type PresencaInfo struct {
		Presenca
		NomeMateria   string `json:"nome_materia"`
		NomeProfessor string `json:"nome_professor"`
	}

	// Recuperar os alunos do banco de dados com a condição da turma
	var alunos []Presenca
	if err := database.DB.Table("alunos").
		Select("id, nome_aluno, turma, responsavel, faltas").
		Where("turma = ?", turma).
		Find(&alunos).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar alunos"})
		return
	}

	// Listas de matérias e professores
	materias := []string{"Matemática", "Português", "História", "Ciências", "Física", "Química", "Geografia", "Biologia", "Inglês", "Artes"}
	professores := []string{"Carlos Ribeiro", "Paula Veniz", "Bruna Deodor", "Filipe José"}

	// Iterar sobre os alunos e atribuir matérias e professores
	var alunosComInfo []PresencaInfo
	for i, aluno := range alunos {
		info := PresencaInfo{
			Presenca:      aluno,
			NomeMateria:   materias[i%len(materias)],
			NomeProfessor: professores[i%len(professores)],
		}
		alunosComInfo = append(alunosComInfo, info)
	}

	c.JSON(http.StatusOK, alunosComInfo)
}

func RegisterPresenca(c *gin.Context) {
	var requestBody struct {
		AlunoID  uint `json:"aluno_id"`
		Presente bool `json:"presente"`
	}

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos"})
		return
	}

	// Verifica se o aluno existe
	var aluno models.Aluno
	if err := database.DB.First(&aluno, requestBody.AlunoID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Aluno não encontrado"})
		return
	}

	// Obtém a lista de todas as matérias
	var materias []models.Materia
	if err := database.DB.Find(&materias).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar matérias"})
		return
	}

	// Cria registros de presença
	for _, materia := range materias {
		presenca := models.Presenca{
			AlunoID:   requestBody.AlunoID,
			MateriaID: materia.ID,
			Data:      time.Now().Format("2006-01-02"),
			Presente:  requestBody.Presente,
		}

		// Salva a presença no banco de dados
		if err := database.DB.Create(&presenca).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao registrar presença"})
			return
		}
	}

	// Aluno ausente incrementa o número de faltas
	if !requestBody.Presente {
		aluno.Faltas++
		if err := database.DB.Save(&aluno).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar faltas do aluno"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "Presença registrada com sucesso"})
}
