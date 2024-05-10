package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/igorferrati/ppads-mack/controllers"
)

func HandleRequests() {
	r := gin.Default()

	// Configurar CORS
	corsMiddleware := cors.Default()
	r.Use(corsMiddleware)

	alunos := r.Group("/alunos")
	{
		alunos.GET("/", controllers.GetAllAlunos)
		alunos.GET("/info", controllers.AlunosInfo)
		alunos.GET("/:id", controllers.GetAlunoByID)
		alunos.GET("/turma/:serie", controllers.AlunosTurma)
		alunos.POST("/cria", controllers.CreateAluno)
		alunos.PUT("/:id", controllers.UpdateAluno)
		alunos.DELETE("/:id", controllers.DeleteAluno)
	}

	presencas := r.Group("/presencas")
	{
		presencas.GET("/:turma", controllers.GetPresencaTurmas)
		presencas.POST("/chamada", controllers.RegisterPresenca)
	}

	// certFile := "/etc/letsencrypt/live/api-escola.ddns.net/cert.pem"
	// keyFile := "/etc/letsencrypt/live/api-escola.ddns.net/privkey.pem"

	// // Inicie o servidor Gin com HTTPS
	// r.RunTLS(":8081", certFile, keyFile)
	r.Run(":8081")
}
