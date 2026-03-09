<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Guia Médico - Rede Credenciada

Sistema completo de busca de prestadores de saúde desenvolvido com Angular 21 e Node.js.

## Arquitetura do Projeto

### Frontend (Angular 21)
- **Localização:** `/frontend/guia-medico/`
- **Framework:** Angular 21 com Angular Material
- **Componentes Principais:**
  - `SearchForm`: Formulário de busca com validações obrigatórias
  - `ProviderList`: Listagem paginada com ordenação
  - `ProviderCard`: Card detalhado de cada prestador

### Backend (Node.js + Express)
- **Localização:** `/backend/`
- **API RESTful** com endpoints para busca e filtros
- **Banco:** MongoDB com Mongoose
- **Modelo:** Provider com especialidades, planos, localização

## Funcionalidades Implementadas

✅ **Sistema de Busca Avançada**
- Filtros obrigatórios: Plano, Cidade, (Tipo OU Especialidade)
- Busca por nome/especialidade
- Validações de formulário

✅ **Interface Responsiva**
- Design Material Design
- Grid adaptativo 
- Paginação e ordenação

✅ **API Completa**
- CRUD de prestadores
- Busca avançada com filtros
- Endpoints para opções de filtros

✅ **Dados de Exemplo**
- Seed com prestadores de Brasília, São Paulo e Rio
- Especialidades médicas variadas
- Diferentes tipos de prestadores

## Informações Adicionais

### Executar o Projeto
```bash
# Via VS Code Task (recomendado)
Ctrl+Shift+P → "Tasks: Run Task" → "Start Full Stack"

# Ou manualmente
cd backend && npm run dev
cd frontend/guia-medico && npm start
```

### URLs
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000

### Validações Importantes
- Plano e Cidade são obrigatórios
- Deve ter pelo menos Tipo OU Especialidade selecionado
- Busca por nome é opcional

## Padrões de Código

- **TypeScript** em todo o projeto
- **Interfaces** bem definidas para modelos
- **Componentes reutilizáveis** no Angular
- **API RESTful** seguindo boas práticas
- **Responsive design** mobile-first
