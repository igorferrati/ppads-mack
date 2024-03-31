package models

import "gorm.io/gorm"

type Aluno struct {
	gorm.Model
	Nome_aluno  string `json:"nome_aluno"`
	Turma       string `json:"turma"`
	Responsavel string `json:"responsavel"`
}

type Professor struct {
	gorm.Model
	Nome    string `json:"nome"`
	Materia string `json:"materia"`
}

type Materia struct {
	gorm.Model
	Nome string `json:"nome"`
}

type Presenca struct {
	gorm.Model
	AlunoID     uint      `json:"aluno_id"`
	Aluno       Aluno     `json:"aluno"`
	MateriaID   uint      `json:"materia_id"`
	Materia     Materia   `json:"materia"`
	ProfessorID uint      `json:"professor_id"`
	Professor   Professor `json:"professor"`
	Data        string    `json:"data"`
	Presente    bool      `json:"presente"`
}
