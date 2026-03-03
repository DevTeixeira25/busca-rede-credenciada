# 05. Operacao, Configuracao e Deploy

## Configuracao de Ambiente

Arquivo: `backend/.env`

Variaveis base:

```env
PORT=3000
FRONTEND_URL=http://localhost:4200
NODE_ENV=development
DATA_SOURCE=inmemory
```

Oracle (quando `DATA_SOURCE=oracle`):

```env
ORACLE_USER=
ORACLE_PASSWORD=
ORACLE_CONNECT_STRING=
```

Sobrescrita opcional de SQL:

```env
ORACLE_SEARCH_SQL=
ORACLE_COUNT_SQL=
```

## Scripts

### Backend

- `npm run dev`: sobe API em desenvolvimento
- `npm run build`: compila TypeScript
- `npm start`: executa build em `dist`

### Frontend

- `npm start`: sobe Angular dev server
- `npm run build`: build de producao

## Procedimento de Subida Local

1. Subir backend
2. Subir frontend
3. Abrir `http://localhost:4200`
4. Validar `http://localhost:3000/api/health`

## Troubleshooting

### Geolocalizacao nao funciona

- Conferir permissao do navegador
- Testar HTTPS ou localhost
- Usar modo manual de localizacao

### Erro de Oracle

- Validar credenciais e connect string
- Validar instalacao do driver `oracledb`
- Validar SQL custom, se configurado

### Build frontend com erro de budget

- Verificar budgets no `angular.json`
- Em desenvolvimento, usar `npm start`

## Checklist de Release

- Backend compila sem erros
- Frontend sobe sem erros em dev
- Busca por filtros validada
- Consulta por ID validada
- Integracao Oracle validada (quando aplicavel)
