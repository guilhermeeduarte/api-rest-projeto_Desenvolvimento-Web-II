# API REST - Projeto Desenvolvimento Web II

É necessário ter o Node instalado e abrir o terminal git bash na pasta "rest-api-projeto"

### Código para baixar todas as dependências
```
npm install
```

### Código para inicializar o servidor
```
npm start
```

### (Criar um banco MongoDB com o endereço):
```
mongodb://localhost:27017/rest-api-projeto
```

## Endpoints para serem testado (Postman)
*GET*
- GET http://localhost:3000/autores
- GET http://localhost:3000/autores/:id
- GET http://localhost:3000/livros
- GET http://localhost:3000/livros/:id
- GET http://localhost:3000/dvds
- GET http://localhost:3000/dvds/:id
- GET http://localhost:3000/cds
- GET http://localhost:3000/cds/:id

*POST*
- POST http://localhost:3000/autores
- POST http://localhost:3000/livros
- POST http://localhost:3000/dvds
- POST http://localhost:3000/cds

*PUT*
- PUT http://localhost:3000/autores/:id
- PUT http://localhost:3000/livros/:id
- PUT http://localhost:3000/dvds/:id
- PUT http://localhost:3000/cds/:id

*DELETE*
- DELETE http://localhost:3000/autores/:id
- DELETE http://localhost:3000/livros/:id
- DELETE http://localhost:3000/dvds/:id
- DELETE http://localhost:3000/cds/:id

## Autenticação básica para requisições
username: admin <br>
password: password
