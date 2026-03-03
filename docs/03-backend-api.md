# 03. Backend e API

## Base URL

- Local: `http://localhost:3000`
- Prefixo: `/api/providers`

## Endpoints

### `GET /api/providers/search`

Busca prestadores com filtros.

#### Parametros

Obrigatorios:

- `plan`: string
- `city`: string

Condicao adicional obrigatoria:

- pelo menos um entre `type` ou `specialty`

Opcionais:

- `name`: string
- `page`: number (default `1`)
- `limit`: number (default `10`)
- `sortBy`: `name | rating | type | city` (default `name`)
- `sortOrder`: `asc | desc` (default `asc`)

#### Resposta (200)

```json
{
  "providers": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "pages": 0
  },
  "filters": {
    "plan": "Plano Premium",
    "city": "Brasilia",
    "type": "HOSPITAL",
    "specialty": null,
    "name": null
  }
}
```

#### Erros

- `400`: parametros obrigatorios ausentes
- `500`: erro interno

### `GET /api/providers/filters`

Retorna opcoes de filtro:

- `cities`
- `specialties`
- `plans`
- `types`
- `neighborhoods`

### `GET /api/providers/:id`

Retorna detalhe de um prestador.

### `GET /api/providers`

Lista todos os prestadores ativos (uso interno e depuracao).

## Fontes de Dados

### Modo in-memory

- Ativado por default
- Arquivo: `src/data/providers.ts`

### Modo Oracle

- Ativado com `DATA_SOURCE=oracle`
- Arquivo: `src/data/providers.oracle.ts`
- Requisita variaveis `ORACLE_USER`, `ORACLE_PASSWORD`, `ORACLE_CONNECT_STRING`

## Regra de Rede Credenciada no Oracle

A query padrao inclui:

- `EXISTS (SELECT 1 FROM ITREDE_ATENDIMENTO ...)`

Isso garante que apenas prestadores da rede credenciada sejam retornados.

## Observacoes de Implementacao

- O driver `oracledb` e carregado de forma dinamica.
- SQL de busca e count podem ser sobrescritos por variavel de ambiente:
  - `ORACLE_SEARCH_SQL`
  - `ORACLE_COUNT_SQL`
