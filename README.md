# 🚀 API Sistema de Blog - Node.js & MongoDB

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge\&logo=express\&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge\&logo=mongodb\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge\&logo=JSON%20web%20tokens)

Esta é uma API REST robusta desenvolvida para a gestão de um sistema de blog. O projeto foca-se em segurança, escalabilidade e boas práticas de desenvolvimento Backend, incluindo autenticação JWT, validação de dados e tratamento centralizado de erros.

---

## 📌 Funcionalidades Core

* **Autenticação Segura:** Registo de utilizadores e Login com geração de tokens JWT.
* **Gestão de Artigos (CRUD):**

  * Criação, leitura, atualização e remoção de artigos.
  * Paginação e filtros por categoria.
  * Proteção de rotas (apenas autores/admins podem editar/apagar).
* **Sistema de Comentários:**

  * Comentários vinculados a artigos específicos.
  * Permissões granulares para remoção de comentários.
* **Segurança & Validação:**

  * Hash de passwords com `bcryptjs`.
  * Validação rigorosa de inputs com `express-validator`.
  * Proteção contra acessos não autorizados via Middleware.

---

## 🛠️ Stack Tecnológica

* **Runtime:** Node.js
* **Framework:** Express.js
* **Base de Dados:** MongoDB com Mongoose (ODM)
* **Segurança:** JSON Web Tokens (JWT) & Bcrypt
* **Utilitários:** Dotenv, Nodemon, Express-Validator

---

## ⚙️ Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/teu-utilizador/teu-repositorio.git
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   * Crie um ficheiro `.env` baseado no `.env.example` fornecido.
   * Adicione a sua `MONGODB_URI` e uma `JWT_SECRET` segura.

4. Inicie o servidor:

   ```bash
   npm run dev
   ```

---

## 🚀 Testar a API

Este projeto inclui uma coleção completa de testes no Postman.

* Localize o ficheiro `apiSistemaBlog.postman_collection.json` na raiz do projeto.
* Importe-o para o seu Postman.
* Configure o **Bearer Token** após realizar o login para aceder às rotas protegidas.

---

## 📡 Endpoints Principais

| Método | Rota                           | Descrição                        | Auth |
| ------ | ------------------------------ | -------------------------------- | ---- |
| POST   | `/api/auth/register`           | Regista novo utilizador          | ❌    |
| POST   | `/api/auth/login`              | Login e devolução de JWT         | ❌    |
| GET    | `/api/artigos`                 | Lista artigos (Paginação/Filtro) | ❌    |
| POST   | `/api/artigos`                 | Cria um novo artigo              | ✅    |
| POST   | `/api/artigos/:id/comentarios` | Adiciona comentário              | ✅    |
