# 02. Arquitetura

## Visao de Alto Nivel

A aplicacao segue arquitetura cliente-servidor.

- Frontend Angular: interface, validacoes de formulario e consumo de API
- Backend Express: validacoes de regra, consulta de dados e paginacao

## Componentes Frontend

### `app`

- Estrutura principal em duas colunas
- Coluna esquerda: busca
- Coluna direita: lista de resultados ou detalhes

### `search-form`

- Formulario reativo com duas abas:
  - Especialidade
  - Nome
- Controle de habilitacao progressiva de campos
- Captura de geolocalizacao (tentativa rapida + fallback)

### `provider-list`

- Exibe resultados
- Emite eventos de selecao de prestador, ordenacao e pagina

### `provider-details`

- Exibe dados completos do prestador selecionado
- Acoes auxiliares (rotas, imprimir, compartilhar)

## Componentes Backend

### `src/app.ts`

- Bootstrap do servidor
- Middlewares de seguranca
- Registro de rotas

### `src/routes/providers.ts`

- Endpoints de busca, filtros e detalhe
- Validacao dos parametros obrigatorios
- Roteamento por fonte de dados (`DATA_SOURCE`)

### `src/data/providers.ts`

- Repositorio in-memory
- Filtros, ordenacao e paginacao em memoria

### `src/data/providers.oracle.ts`

- Integracao Oracle via `oracledb`
- Query com regra de rede credenciada (`ITREDE_ATENDIMENTO`)
- Mapeamento de linhas Oracle para modelo `Provider`

## Fluxo de Requisicao

1. Usuario preenche formulario no frontend.
2. Frontend envia `GET /api/providers/search` com query params.
3. Backend valida regras obrigatorias.
4. Backend consulta fonte selecionada (`inmemory` ou `oracle`).
5. Backend retorna `providers + pagination + filters`.
6. Frontend renderiza resultados.
