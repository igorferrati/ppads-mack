package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/igorferrati/ppads-mack/controllers"
)

func HandleRequests() {
	r := gin.Default()

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

	r.Run(":8081")
}
