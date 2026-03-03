# 01. Visao Geral

## Objetivo

Disponibilizar uma busca de prestadores de saude de rede credenciada com filtros de plano, localizacao, tipo, especialidade e nome.

## Escopo Funcional

- Busca por filtros estruturados (aba Especialidade)
- Busca por nome (aba Nome)
- Lista de resultados paginada
- Visualizacao detalhada de prestador
- Integracao opcional com Oracle para dados reais

## Regras de Negocio (resumo)

1. Para pesquisar, `plan` e `city` sao obrigatorios no backend.
2. Pelo menos um entre `type` e `specialty` deve ser informado para a busca estruturada.
3. No frontend, os campos sao liberados em ordem:
   - `Plano` -> libera `Localizacao`
   - `Localizacao` -> libera `Tipo prestador` e `Especialidade`
   - Na aba Nome, `Nome` so habilita apos selecionar `Plano`

## Tecnologias

### Frontend

- Angular 21
- Angular Material
- SCSS
- Reactive Forms

### Backend

- Node.js
- Express
- TypeScript
- CORS e Helmet

## Fontes de Dados

- In-memory (`backend/src/data/providers.ts`) para desenvolvimento
- Oracle (`backend/src/data/providers.oracle.ts`) para ambiente integrado
