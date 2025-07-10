# NLW Agents - Backend

Uma API robusta e inteligente construída durante um evento da [Rocketseat](https://www.rocketseat.com.br/) que transcreve em tempo real o áudio de uma livestream usando IA, armazena os conteúdos em um banco de dados e permite responder perguntas com base no que já foi dito durante a transmissão.

## Índice

- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Setup e Configuração](#setupeconfiguracao)
- [Scripts Disponíveis](#scripts)
- [Endpoints](#endpoints)

## Tecnologias

- **Node.js** com TypeScript nativo (experimental strip types)
- **Fastify** - Framework web rápido e eficiente
- **PostgreSQL** com extensão **pgvector** para vetores
- **Drizzle ORM** - Type-safe database operations
- **Zod** - Schema validation
- **Docker** - Containerização do banco de dados
- **Biome** - Linting e formatação de código

## Arquitetura

O projeto segue uma arquitetura modular com:

- **Separação de responsabilidades** entre rotas, schemas e conexão com banco
- **Validação de schemas** com Zod para type safety
- **ORM type-safe** com Drizzle para operações de banco de dados
- **Validação de variáveis de ambiente** centralizadas

## Setup e Configuração

### Pré-requisitos

- Node.js (versão com suporte a `--experimental-strip-types`)
- Docker e Docker Compose

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd backend
```

### 2. Configure o banco de dados
```bash
docker-compose up -d
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
```

### 4. Instale as dependências
```bash
npm install
```

### 5. Execute as migrações do banco
```bash
npm run db:migrate
```

### 6. (Opcional) Popule o banco com dados de exemplo
```bash
npm run db:seed
```

### 7. Execute o projeto

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

## Scripts Disponíveis

- `npm run dev` - Executa o servidor em modo de desenvolvimento com hot reload
- `npm start` - Executa o servidor em modo de produção
- `npm run db:seed` - Popula o banco de dados com dados de exemplo
- `npm run db:generate` - Gera os arquivos de migração do Drizzle ORM
- `npm run db:migrate` - Executa as migrações pendentes do banco de dados

## Endpoints

A API estará disponível em `http://localhost:3333`

- `GET /health` - Health check da aplicação
- `GET /rooms` - Lista as salas disponíveis
- `POST /rooms` - Cria uma nova sala
- `GET /rooms/:roomId/questions` - Lista as perguntas de uma sala específica
- `POST /rooms/:roomId/questions` - Cria uma nova pergunta em uma sala específica
- `POST /rooms/:roomId/audio` - Envia um áudio para transcrição e armazenamento