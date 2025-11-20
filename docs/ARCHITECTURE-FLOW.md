# Arquitetura e Fluxos Principais

Este documento descreve o fluxo de dados e a arquitetura de interação entre páginas, componentes e dados.

1) Inicialização e layout

- `app/layout.tsx` monta providers e elementos persistentes (ThemeProvider, Header, Sidebar).
- O cliente carrega a rota solicitada; se for página que precisa de dados, ela requisita os dados do `lib` ou API.

2) Fluxo de CRUD (contas)

- Create (Adicionar conta)
  - Usuário aciona `add-account-modal`.
  - Formulário é submetido e valida localmente; em modo mock atualiza `lib/data/accounts` (ou sinaliza para re-fetch).
  - UI atualiza a listagem via estado local, contexto ou re-render por re-fetch.

- Read (Listar / Detalhar)
  - Listagens usam `components/ui/data-table` com colunas de `app/columns.tsx`.
  - Para detalhes, `account-detail-modal` ou rota `/conta/[id]` renderiza transações e ações.

- Update
  - A edição pode ocorrer dentro de `account-detail-modal` ou em um formulário dedicado; a atualização propaga para o store/api.

- Delete
  - Ação em tabela ou detalhe; exibe confirmação (dialog) e remove do mock/api.

3) Fluxo de pagamentos

- `payment-modal` coleta dados e executa `onPay`.
- O componente pode disparar atualizações de transações e re-calcular balances.

4) Uploads e processamento de arquivos

- `file-upload-modal` recebe arquivos, processa localmente (CSV parse) ou envia para um endpoint, e retorna resultado via callback.

5) Busca e navegação rápida

- `command-palette` expõe busca global e atalhos (navegar para contas, abrir modais, filtrar).

6) Estado e sincronização

- Em modo protótipo, o estado estático é mantido em `lib/data`.
- Para um app em produção, recomenda-se introduzir um cliente HTTP (fetch/axios) e gerenciar cache/estado com SWR/React Query ou Context/Redux.
