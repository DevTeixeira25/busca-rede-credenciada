# Historico de Atualizacoes de Interface

## Objetivo

Registrar alteracoes de interface que impactam experiencia do usuario, sem detalhar implementacao de baixo nivel.

## Alteracoes Consolidadas

### Layout principal

- Estrutura em duas colunas para busca e resultados.
- Estabilizacao visual do card de busca ao alternar abas.

### Formulario de busca

- Padronizacao visual de campos, abas e botoes.
- Fluxo guiado de habilitacao de campos:
  - Plano -> Localizacao
  - Localizacao -> Tipo/Especialidade
  - Na aba Nome, campo Nome habilita apos Plano.

### Validacoes e mensagens

- Padronizacao de mensagens obrigatorias.
- Ajustes de hierarquia visual para avisos e estados desabilitados.

### Lista e detalhes

- Refinos de tipografia e espacamento.
- Melhorias de leitura e navegacao entre lista e detalhe.

## Pendencias Conhecidas

- Revisao de budgets de estilo no build do frontend.
- Consolidacao de tokens de estilo para reduzir volume de SCSS.
