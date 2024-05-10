package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/igorferrati/ppads-mack/database"
	"github.com/igorferrati/ppads-mack/models"
	"gorm.io/gorm"
)

func GetPresencaTurmas(c *gin.Context) {

}

func RegisterPresenca(c *gin.Context) {
	var presenca models.Presenca
	if err := c.ShouldBindJSON(&presenca); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//registra presenca
	if err := database.DB.Create(&presenca).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao registrar presença"})
		return
	}

	//atualiza faltas de alunos
	if !presenca.Presente {
		if err := database.DB.Model(&models.Aluno{}).Where("id = ?", presenca.AlunoID).Update("faltas", gorm.Expr("faltas + 1")).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar número de faltas"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Presença registrada com sucesso"})
	}
}
