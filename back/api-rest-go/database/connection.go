package database

import (
	"log"

	"github.com/igorferrati/ppads-mack/models"
	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DB  *gorm.DB
	err error
)

func ConectaDB() {
	stringDeConexao := "host=cb889jp6h2eccm.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com user=u1li0tmtiqjeil password=p43e27b856a96f68380a75833e95a79ec77cecd05dc7f5513d194f003cc47e4ff dbname=d36gsljaqq3o2e port=5432 sslmode=disable"
	DB, err = gorm.Open(postgres.Open(stringDeConexao))
	if err != nil {
		log.Panic("Erro ao conectar com banco de dados")
	}
	DB.AutoMigrate(&models.Aluno{})
}
