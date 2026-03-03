# 04. Frontend e Fluxos de Busca

## Estrutura da Tela Principal

- Coluna esquerda: formulario de busca
- Coluna direita: resultados ou detalhes

## Abas de Busca

### Aba Especialidade

Campos:

- Plano (obrigatorio)
- Localizacao (obrigatorio)
- Tipo prestador
- Especialidade

Fluxo de habilitacao:

1. Sem plano, `Localizacao` fica desabilitada.
2. Com localizacao definida, `Tipo prestador` e `Especialidade` sao habilitados.
3. Botao pesquisar so habilita se pelo menos um de `Tipo prestador` ou `Especialidade` estiver selecionado.

### Aba Nome

Campos:

- Plano (obrigatorio)
- Nome (habilita somente apos selecionar plano)

## Geolocalizacao

Quando `Localizacao = nearby`:

1. Tentativa rapida (cache + timeout menor)
2. Fallback com alta precisao se houver timeout
3. Se ambas falharem, muda para modo manual

## Validacoes e Mensagens

- Mensagens obrigatorias customizadas:
  - Plano: `Informe um plano`
  - Localizacao: `Informe uma localizacao`
- Indicacoes visuais de campo desabilitado em cinza

## Componentes Principais

- `search-form`: formulario e validacoes
- `provider-list`: lista e paginacao
- `provider-details`: detalhes e acoes
