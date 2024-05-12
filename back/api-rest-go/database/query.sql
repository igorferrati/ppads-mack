--- ESTE DOCUMENTO CONTÉM INFORMAÇÕES FICTICIAS PARA DESENVOLVIMENTO DE DADOS INICIAIS DO PROJETO ALÉM ABORDAR A ESTRUTURA DE DADOS E COMANDOS ÚTEIS NO DESENVOLVIMENTO DA API. 

-----------------------------------------------------------------------------

CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome_aluno VARCHAR(255),
    turma VARCHAR(10),
    responsavel VARCHAR(255),
    email_responsavel VARCHAR(255),
    faltas INT
);

INSERT INTO alunos (nome_aluno, turma, responsavel, email_responsavel, faltas) VALUES
('João Silva', '5A', 'Maria Silva', 'maria_silva@email.com', 0),
('Maria Oliveira', '5A', 'Ana Oliveira', 'ana_oliveira@email.com', 0),
('Pedro Santos', '5A', 'José Santos', 'jose_santos@email.com', 0),
('Carla Souza', '5A', 'Joaquim Souza', 'joaquim_souza@email.com', 0),
('Ana Pereira', '5A', 'Antônio Pereira', 'antonio_pereira@email.com', 0),
('Lucas Costa', '5A', 'Sandra Costa', 'sandra_costa@email.com', 0),
('Juliana Almeida', '5A', 'Fernando Almeida', 'fernando_almeida@email.com', 0),
('Marcos Lima', '5A', 'Cristina Lima', 'cris_lima@email.com', 0),
('Camila Martins', '5A', 'Roberto Martins', 'roberto_martins@email.com', 0),
('Felipe Oliveira', '5A', 'Patrícia Oliveira', 'patricia_oliveira@email.com', 0),
---5B
('Gustavo Oliveira', '5B', 'Fernanda Oliveira', 'fernanda_oliveira@email.com', 0),
('Amanda Silva', '5B', 'Ricardo Silva', 'ricardo_silva@email.com', 0),
('Daniel Santos', '5B', 'Andréa Santos', 'andrea_santos@email.com', 0),
('Luiza Costa', '5B', 'Rodrigo Costa', 'rodrigo_costa@email.com', 0),
('Laura Pereira', '5B', 'Gustavo Pereira', 'gustavo_pereira@email.com', 0),
('Lucas Martins', '5B', 'Mariana Martins', 'mariana_martins@email.com', 0),
('Beatriz Oliveira', '5B', 'Carlos Oliveira', 'carlos_oliveira@email.com', 0),
('Gabriel Souza', '5B', 'Isabela Souza', 'isabela_souza@email.com', 0),
('Isabela Almeida', '5B', 'Vinícius Almeida', 'vinicius_almeida@email.com', 0),
('Rafael Lima', '5B', 'Priscila Lima', 'priscila_lima@email.com', 0),
---5C
('Ana Clara Oliveira', '5C', 'Ricardo Oliveira', 'ricardo_oliveira@email.com', 0),
('José Pereira', '5C', 'Sueli Pereira', 'sueli_pereira@email.com', 0),
('Carolina Santos', '5C', 'Marcos Santos', 'marcos_santos@email.com', 0),
('Vinícius Costa', '5C', 'Fernanda Costa', 'fernanda_costa@email.com', 0),
('Letícia Souza', '5C', 'Antônio Souza', 'antonio_souza@email.com', 0),
('Matheus Martins', '5C', 'Aline Martins', 'aline_martins@email.com', 0),
('Mariana Silva', '5C', 'Pedro Silva', 'pedro_silva@email.com', 0),
('Gabriela Oliveira', '5C', 'Renato Oliveira', 'renato_oliveira@email.com', 0),
('Rafaela Lima', '5C', 'Roberta Lima', 'roberta_lima@email.com', 0),
('Pedro Almeida', '5C', 'Lúcia Almeida', 'lucia_almeida@email.com', 0),
---5D
('Joãozinho Pereira', '5D', 'Fernando Pereira', 'fernando_pereira@email.com', 0),
('Marina Santos', '5D', 'Paulo Santos', 'paulo_santos@email.com', 0),
('Thiago Oliveira', '5D', 'Márcia Oliveira', 'marcia_oliveira@email.com', 0),
('Aline Costa', '5D', 'Eduardo Costa', 'eduardo_costa@email.com', 0),
('Carlos Souza', '5D', 'Regina Souza', 'regina_souza@email.com', 0),
('Luana Silva', '5D', 'Felipe Silva', 'felipe_silva@email.com', 0),
('Leonardo Martins', '5D', 'Adriana Martins', 'adriana_martins@email.com', 0),
('Bianca Lima', '5D', 'Ricardo Lima', 'ricardo_lima@email.com', 0),
('Fernanda Almeida', '5D', 'Roberto Almeida', 'roberto_almeida@email.com', 0),
('Guilherme Oliveira', '5D', 'Carla Oliveira', 'carla_oliveira@email.com', 0);

-----------------------------------------------------------------------------

CREATE TABLE professores (
    id SERIAL PRIMARY KEY,
    nome_professor VARCHAR(255),
    materia VARCHAR(50)
);

INSERT INTO professores (nome_professor, materia) VALUES
('Pedro Carvalho', 'Matemática'),
('Maria Rodrigues', 'História'),
('Carlos Munhoz', 'Português'),
('Laura Tedis', 'Geografia'),
('Paula Canned', 'Ciências'),
('Rodrigo Maldonado', 'Física'),
('Fernanda Silva', 'Química'),
('Lucas Pimenta', 'Inglês'),
('Tatiane Cristina', 'Artes'),
('Gustavo Deline', 'Educação Física');

-----------------------------------------------------------------------------

CREATE TABLE materias (
    id SERIAL PRIMARY KEY,
    nome_materia VARCHAR(50)
);

INSERT INTO materias (nome_materia) VALUES
('Matemática'),
('História'),
('Português'),
('Geografia'),
('Ciências'),
('Física'),
('Química'),
('Inglês'),
('Artes'),
('Educação Física');

-----------------------------------------------------------------------------

CREATE TABLE presencas (
    id SERIAL PRIMARY KEY,
    aluno_id INT REFERENCES alunos(id),
    materia_id INT REFERENCES materias(id),
    professor_id INT REFERENCES professores(id),
    data DATE,
    presente BOOLEAN
);

-- Insere registros para cada aluno em cada matéria com presente = true
INSERT INTO presencas (aluno_id, materia_id, professor_id, data, presente)
SELECT 
    alunos.id AS aluno_id, 
    materias.id AS materia_id, 
    professores.id AS professor_id, 
    CURRENT_DATE AS data,
    true AS presente
FROM 
    alunos, 
    materias, 
    professores;

-----------------------------------------------------------------------------

--- DROPAR TODAS TABELAS
DROP TABLE IF EXISTS presencas, materias, alunos, professores ;

-----------------------------------------------------------------------------
---/alunos/criar
{
    "nome_aluno": "Igor Ferrati",
    "turma": "5A",
    "responsavel": "Maria Fatima",
    "email_responsavel": "igorferrati93@gmail.com",
    "faltas": 0
}

-----------------------------------------------------------------------------
---/presencas/chamada/
{
    "aluno_id": 11,
    "presente": false
}

-----------------------------------------------------------------------------
---CRON
---#EXECUTA GET PARA ENDPOINT DA FUNCAO
--*/5 * * * * curl -X GET https://api-escola2.ddns.net:8080/alunos/enviaemail >/dev/null 2>&1