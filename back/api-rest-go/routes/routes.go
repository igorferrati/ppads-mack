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
		alunos.POST("/cria", controllers.CreateAluno)
		// alunos.GET("/:id", controllers.GetAlunoByID)
		// alunos.PUT("/:id", controllers.UpdateAluno)
		// alunos.DELETE("/:id", controllers.DeleteAluno)
	}

	// // Rotas para Professores
	// professores := r.Group("/professores")
	// {
	//     // professores.GET("/", controllers.GetAllProfessores)
	//     // professores.GET("/:id", controllers.GetProfessorByID)
	//     // professores.POST("/", controllers.CreateProfessor)
	//     // professores.PUT("/:id", controllers.UpdateProfessor)
	//     // professores.DELETE("/:id", controllers.DeleteProfessor)
	// }

	// // Rotas para Presenças
	// presencas := r.Group("/presencas")
	// {
	//     // presencas.GET("/", controllers.GetAllPresencas)
	//     // presencas.GET("/:id", controllers.GetPresencaByID)
	// }

	certFile := "/etc/letsencrypt/live/api-escola.ddns.net/cert.pem"
	keyFile := "/etc/letsencrypt/live/api-escola.ddns.net/privkey.pem"

	// Inicie o servidor Gin com HTTPS
	r.RunTLS(":8081", certFile, keyFile)
}
