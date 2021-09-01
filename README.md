# Nutcache Challenge

## Como Executar

Em um terminal suba o servidor:
```bash
$ git clone <repo_url>
$ cd nutcache-challenge-AntonioNetto
# Acesse a pasta de backend
$ cd backend
# Instale as dependências
$ npm install
# Em seguida suba localmente seu servidor
$ npm start
# Por padrão: `Server is running at https://localhost:8000`
```
Em seguida, em outro terminal na pasta frontend do projeto, suba a aplicação web.
```bash
$ cd nutcache-challenge-AntonioNetto
# Acesse a pasta de frontend
$ cd frontend
# Instale as dependências
$ npm install
# Em seguida suba localmente seu servidor
$ npm start
# Por padrão: `https://localhost:3000`
```

## Api

### Arquitetura baseada em **Domain Driven Design**(DDD)

- Essa arquitetura é caracterizado pelo **conceitos**, **princípios** e **boas práticas** que devem utilizar em boa partes dos **projetos Backend**.

### **Camada de Módulos/Domínio**

- Isolando camadas da aplicação, melhorando a estrutura da aplicação.
- **Rotes**: Responsável por validar os dados da requisição e se corretamente validados repassar ao Controllers.
- **Controllers**: Arquitetura que lida com a lógica das rotas. Recebe os dados da requisição. Distribui esses dados para o tratamento por meio de serviços e retorna a resposta.
- **Services**: Arquitetura responsável para lidar com as regras de negócio.
- **Repositorios**: Lidam com as responsabilidades e atividades do armazenamento de dados.

### 🚀 Tecnologias

Tecnologias usadas para desenvolver esta API

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Celebrate](https://github.com/arb/celebrate)
- [Jest](https://jestjs.io/)

## Frontend

### 🚀 Tecnologias

Tecnologias usadas para desenvolver esta Aplicação Web

- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://github.com/axios/axios)
- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [Material-ui](https://material-ui.com/)