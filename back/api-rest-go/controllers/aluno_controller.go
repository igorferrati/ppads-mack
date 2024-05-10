package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/igorferrati/ppads-mack/database"
	"github.com/igorferrati/ppads-mack/models"
)

// GetAllAlunos buscar todos alunos no banco de dados
func GetAllAlunos(c *gin.Context) {
	var alunos []models.Aluno
	database.DB.Find(&alunos)
	c.JSON(200, alunos)
}

// AlunosInfo buscar informações combinadas de todos alunos no banco de dados
func AlunosInfo(c *gin.Context) {
	//struct anônima
	var alunos []struct {
		ID            uint   `json:"id"`
		NomeAluno     string `json:"nome_aluno"`
		Turma         string `json:"turma"`
		Responsavel   string `json:"responsavel"`
		NomeMateria   string `json:"nome_materia"`
		NomeProfessor string `json:"nome_professor"`
	}

	err := database.DB.Table("alunos").
		Select("alunos.id, alunos.nome_aluno, alunos.turma, alunos.responsavel, materias.nome_materia, professores.nome_professor").
		Joins("LEFT JOIN presencas ON alunos.id = presencas.aluno_id").
		Joins("LEFT JOIN materias ON presencas.materia_id = materias.id").
		Joins("LEFT JOIN professores ON presencas.professor_id = professores.id").
		Scan(&alunos).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar alunos"})
		return
	}

	c.JSON(http.StatusOK, alunos)
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
