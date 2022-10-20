# Breaking Bad

Esse projeto é sobre a série Breaking Bad.

É, basicamente, um CRUD de personagens.

Será possível cadastrar personagens e saber em qual episódio eles apareceram.

## Como rodar em ambiente local
Faça um clone desse repositório e rode o comando `npm install`

Renomeio o arquivo `.env.example` para `.env` e preencha todos os dados necessários.

```
DB_NAME: Nome do banco de dados
DB_HOST: Endereço que o banco de dados está rodando
DB_PORT: Porta do banco de dados
DB_USERNAME: Usuário
DB_PASSWORD: Senha
```

Rode o comando `npm run start` e o projeto será iniciado no seu ambiente local.

## Deploy

O deploy sugerido é utilizando a Google Cloud.
O processo é simples e intuitivo:

```
1. Crie um projeto na Google Cloud;
2. Instale a gcloud CLI e faça a autenticação;
3. Encontre o ID do seu projeto utilizando o comando `gcloud projects list
` e acesse o mesmo com o comando `gcloud config set project ~ID DO PROJETO~`;
4. Utilize o comando `gcloud run deploy` para iniciar o deploy;
5. Selecione o caminho do código e defina um nome;
6. Permita que a API seja acessada.
```

Após alguns minutos o deploy será finalizado e será apresentada uma URL para acesso da aplicação.