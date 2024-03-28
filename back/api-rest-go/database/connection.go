package database

import (
	"log"

	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DB  *gorm.DB
	err error
)

func ConectaDB() {
	stringDeConexao := "host=localhost user=admin password=admin123 dbname=admin port=5432 sslmode=disable"
	DB, err = gorm.Open(postgres.Open(stringDeConexao))
	if err != nil {
		log.Panic("Erro ao conectar com banco de dados")
	}
	// DB.AutoMigrate(&models.Aluno{})
}
