## Resumo

Desenvolvimento de projeto para Universidade Presbiteriana Mackenzie.

**PRATICA PROFISSIONAL EM ANALISE E DESENVOLVIMENTO DE SISTEMAS**

Consiste no desenvolvimento de projeto consiste na criação de um software para um estudo de caso de uma escola fictícia do qual necessita de um software para organização para automatizar, melhorar e ajudar no controle da presença dos alunos.

---

### Dependências:

- Docker
[Documentação docker:](https://docs.docker.com/engine/install/)

- Docker-compose
[Documentação docker-compose:](https://docs.docker.com/compose/install/)

- Node JS - v20 ou superior [Documentação node:](https://nodejs.org/en/download)
- Npm [Documentação node:](https://nodejs.org/en/download)

- Angular v16 ou superior
[Documentação angular:](https://angular.io/guide/setup-local)

- Golang vgo 1.21.4 ou superior
[Documentação golang:](https://go.dev/doc/install)

## Executando APP

1. Faça o download do repositório git

```
git clone https://github.com/igorferrati/ppads-mack.git
```

2. entre na pasta ```infra/compose```, no arquivo ```docker-compose.yaml``` terá as informações da criação do banco de dados, tais como:

- Credenciais de acesso ao banco e porta.

```yaml
    container_name: postgres
    environment:
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=admin123
      - POSTGRES_DB=base_escola
    ports:
      - "5432:5432"
```
- Informações da interface web usada para auxiliar:

```yaml
    container_name: pdadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: "mack@gmail.com"
      PGADMIN_DEFAULT_PASSWORD: "admin123"
    ports:
      - "54321:80"
```

3. No diretório, rodamos o seguinte comando para subir o banco:

```
docker-compose up -d
```

4. Faça login no ```pgadmin``` em ```localhost:54321``` em seguida faça login no banco criado apontando para ```postgres:5432```, observer que ```postgres``` é o nome do container criado e ```5432``` é a porta do qual ele está exposto. 

- O ```pgadmin``` pedira usuário e senha também para realizar o login no banco, forneça as credenciais e estabeleça o login.

5. Execute as querys para construir a estrutura dos bancos:

```SQL
CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome_aluno VARCHAR(255),
    turma VARCHAR(10),
    responsavel VARCHAR(255)
);
```

```SQL
CREATE TABLE professores (
    id SERIAL PRIMARY KEY,
    nome_professor VARCHAR(255),
    materia VARCHAR(50)
);
```

```SQL
CREATE TABLE materias (
    id SERIAL PRIMARY KEY,
    nome_materia VARCHAR(50)
);
```

```SQL
CREATE TABLE presencas (
    id SERIAL PRIMARY KEY,
    aluno_id INT REFERENCES alunos(id),
    materia_id INT REFERENCES materias(id),
    professor_id INT REFERENCES professores(id),
    data DATE,
    presente BOOLEAN
);
```

6. Após criada a estrutura de tabelas do banco, podemos inserir dados ficticios, utilize o arquivo ```back/api-rest-g/database/query.sql``` .

7. Entre na pasta do backend em ```back/api-rest-go``` e execute os seguintes comando para iniciar o servidor go:

- Baixando todas dependências gerenciadas em ```go.mod``` e ```go.sum```.

```
go mod tidy
```

- Subindo servidor:
```
go run main.go
```

8. Navegue até a pasta ```front``` e execute os seguintes comandos:

- Para instalar as dependências do ```package.json```:

```
npm install, ou npm install --force, caso seja necessário.
```

- Subindo servidor web:

```
ng serve
```

9. Pronto você pode acessar o projeto agora em ```localhost:4200``` por default o ngserve sobe nesta porta.

10. Todas as rotas do front estão apontando para os endpoints descritos no back, solicitando e consumindos os dados da api.
