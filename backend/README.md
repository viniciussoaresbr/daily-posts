# Jwt-auth-api

API desenvolvida com intuito de implementar a autenticação e autorização do JSON Web Token

## ✅ Features

- Cadastro de usuário
- Password hashing
- Login através da criação do access token
- Criação de Posts

## 💻 Tecnologias

- Node.js
- Express.js
- Typescript
- Prisma
- **Banco de dados :** PostgreSQL - Hospedado no ElephantSQL

## 🚀 Deploy na Railway

### Request

`POST /users/`

    curl -X POST https://jwt-auth-api-production.up.railway.app/users -H 'Content-Type: application/json'

Body :

            {
              "name": "Lucas",
              "lastname": "Silva",
              "email": "lucassilva@example.com",
              "password": "1234"
            }

`GET /users/{id}`

    curl -X GET https://jwt-auth-api-production.up.railway.app/users/id -H 'Content-Type: application/json'

- Headers:

  Authorization: Bearer [access_token]

`POST /auth/`

    curl -X POST https://jwt-auth-api-production.up.railway.app/auth -H 'Content-Type: application/json'

Body :

            {
              "email": "lucassilva@example.com",
              "password": "1234"
            }

`POST /posts/`

    curl -X POST https://jwt-auth-api-production.up.railway.app/posts -H 'Content-Type: application/json'

- Headers:

  Authorization: Bearer [access_token]

  Body :

            {
              "text" : "example"
            }

`GET /posts/`

    curl -X GET https://jwt-auth-api-production.up.railway.app/posts -H 'Content-Type: application/json'

- Headers:

  Authorization: Bearer [access_token]

`GET /posts/users/{id}`

    curl -X GET https://jwt-auth-api-production.up.railway.app/posts/users/id -H 'Content-Type: application/json'

- Headers:

  Authorization: Bearer [access_token]

  `DELETE /posts/{id}`

      curl -X DELETE https://jwt-auth-api-production.up.railway.app/posts/id -H 'Content-Type: application/json'

- Headers:

  Authorization: Bearer [access_token]
