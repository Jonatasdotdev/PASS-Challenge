# Documentação Técnica — `components/`

Este documento descreve os componentes de alto nível localizados em `components/` e como eles se relacionam.

Principais componentes e responsabilidades

- `account-detail-modal.tsx`
  - Mostra informações detalhadas de uma conta (nome, saldo, transações, contatos, notas).
  - Geralmente é acionado a partir de uma listagem ou da rota `/conta/[id]`.
  - Inputs esperados: `accountId` ou `account` (objeto), callbacks como `onClose`, `onUpdate`.

- `add-account-modal.tsx`
  - Formulário para criar/registrar uma nova conta. Contém validação local e emite um evento `onCreate`.
  - Fluxo típico: botão 'Adicionar conta' → abre modal → submit → atualiza o estado ou chama API.

- `app-sidebar.tsx`
  - Sidebar com navegação principal. Usa `use-sidebar` para estado (aberto/fechado) e responde a breakpoints.

- `charts-section.tsx`
  - Responsável por montar gráficos do dashboard (ex.: receita x despesa, evolução por período).
  - Agrega dados de `lib/data/accounts.ts` ou de um endpoint e passa para `components/ui/chart.tsx`.

- `command-palette.tsx`
  - Paleta de comandos tipo Spotlight/Command-K; captura atalhos de teclado e permite navegação rápida.

- `data-table-pagination.tsx`
  - Componente que combina uma tabela com controles de paginação e busca.
  - Integra com `components/ui/pagination.tsx` e `components/ui/data-table.tsx`.

- `file-upload-modal.tsx`
  - Modal para upload de arquivos (CSV, imagens). Normalmente processa arquivo e fornece callback `onUpload`.

- `financial-data-view.tsx`
  - Visualização/tabulação de informações financeiras: saldos, filtros por data/status e ações rápidas.

- `header.tsx`
  - Cabeçalho global que contém busca, dropdown de perfil (`profile-menu`), botões rápidos e atalho para `command-palette`.

- `keyword-picker.tsx`
  - Componente para selecionar tags/keywords; útil em filtros ou classificação de contas/transações.

- `nav-main.tsx`, `nav-projects.tsx`, `nav-user.tsx`
  - Fragmentos de navegação que podem ser compostos dentro de `app-sidebar` ou `header`.

- `pass-apps-menu.tsx`
  - Menu com links para apps auxiliares ou integrações do ecossistema PASS.

- `payment-modal.tsx`
  - Modal que simula/realiza um pagamento; recebe `onPay` e detalhes da transação.

- `profile-menu.tsx`
  - Dropdown com ações do usuário (perfil, settings, logout).

- `section-cards.tsx`
  - Cards de resumo (KPIs): total de receitas, despesas, saldo disponível.

- `status-filter.tsx`
  - UI para filtrar por status (ex.: pendente, pago, atrasado). Emite `onChange` com filtro.

- `team-switcher.tsx`
  - Permite alternar entre times/organizações; provavelmente manipula contexto e roteamento.

- `theme-provider.tsx`
  - Provider para tema da aplicação (light/dark). Fornece contexto com `toggleTheme` e `theme`.


Como os componentes se integram (exemplos de fluxo)

- Adicionar uma conta:
  1. Usuário clica em botão 'Add' no `header` ou em uma página.
  2. `add-account-modal` abre com o formulário.
  3. Ao submeter, modal chama `onCreate` que atualiza `lib/data/accounts.ts` (mock) ou dispatch para API.
  4. A listagem (tabela) é atualizada com a nova conta via estado global, props ou re-fetch.

- Visualizar detalhes de conta:
  1. Usuário clica em uma linha da tabela.
  2. `account-detail-modal` é aberto com o item selecionado ou o app navega para `/conta/[id]`.

Boas práticas

- Componentes em `components/` devem ser orientados ao domínio (conta, pagamento, dashboard).
- Componentes puramente visuais e genéricos devem residir em `components/ui/`.
