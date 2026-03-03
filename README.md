# Guia Medico - Documentacao do Projeto

Este repositorio contem um sistema de busca de prestadores de saude para rede credenciada, composto por frontend Angular e backend Node.js/Express.

## Sumario

- [Visao Geral](./docs/01-visao-geral.md)
- [Arquitetura](./docs/02-arquitetura.md)
- [Backend e API](./docs/03-backend-api.md)
- [Frontend e Fluxos de Busca](./docs/04-frontend-fluxos.md)
- [Operacao, Configuracao e Deploy](./docs/05-operacao-e-deploy.md)
- [Historico de Atualizacoes de Interface](./DESIGN_UPDATES.md)

## Estrutura de Pastas

- `frontend/guia-medico`: aplicacao Angular
- `backend`: API em Node.js/Express
- `docs`: documentacao tecnica

## Estado Atual

- Backend com duas fontes de dados:
  - `inmemory` (default, para desenvolvimento)
  - `oracle` (ativado por variavel de ambiente)
- Busca com validacoes de negocio no backend e no frontend.
- Interface em duas colunas, com fluxo guiado de preenchimento de filtros.

## Requisitos

- Node.js 18+
- npm 9+

## Execucao Rapida

### Backend

```powershell
cd c:\dev\backend
npm install
npm run dev
```

API em `http://localhost:3000`.

### Frontend

```powershell
cd c:\dev\frontend\guia-medico
npm install
npm start
```

Aplicacao em `http://localhost:4200`.

## Observacoes

- O frontend possui budgets de build atualmente restritivos para SCSS. Em ambiente de desenvolvimento, `npm start` funciona normalmente.
- Para uso com Oracle, leia o documento de operacao em `docs/05-operacao-e-deploy.md`.
