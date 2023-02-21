# Daily Posts

Daily Posts é uma aplicação web que permite que os usuários façam login e cadastro para criar, visualizar e deletar posts diários.
A aplicação foi desenvolvida utilizando as tecnologias React e Typescript, e as seguintes bibliotecas: styled components, react-router-dom, react-toastify,
react-hook-form e axios.

### Backend da aplicação - https://github.com/viniciussoaresbr/jwt-auth-api

![image](https://user-images.githubusercontent.com/85377319/220434035-4a0eb4bb-4430-45bb-ad17-6727b813ecc9.png)
![image](https://user-images.githubusercontent.com/85377319/220435181-3ab097a5-c57f-4483-8fda-6ac07cc9ad96.png)

> **Acesse a Página do Projeto:** [Daily Posts](https://daily-posts.vercel.app/)

## ✅ Features :

## Login e Cadastro de Usuário

A aplicação possui um sistema de login e cadastro de usuários. Ao criar uma conta, o usuário é redirecionado para a página inicial da aplicação,
onde pode visualizar seus posts diários e os posts criados por outros usuários.

## Criação de Posts

Na página inicial, o usuário pode criar um novo post que ao ser publicado será salvo na base de dados da aplicação.

## Visualização de Posts

A página inicial também permite que o usuário visualize os posts diários criados por outros usuários. Os posts são exibidos em ordem cronológica,
do mais recente para o mais antigo.

## Remoção de Posts

O usuário pode deletar os posts que criou clicando no ícone da lixeira que aparece no canto superior direito do post.
Ao clicar no botão, um modal de confirmação será exibido e ao clicar em "Sim" o post é removido da base de dados da aplicação.

## Integração com Backend

A aplicação faz uso de uma API desenvolvida em Node.js e Prisma para o armazenamento dos dados em um banco de dados PostgreSql.
A integração entre a aplicação frontend e a API é feita por meio do Axios.
