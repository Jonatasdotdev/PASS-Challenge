# Documentação do Projeto (WIKI)

Esta documentação descreve os arquivos e pastas que estão ativamente utilizados no projeto PASS-Challenge. Serve como referência rápida para desenvolvedores.

## Visão geral
O projeto é uma aplicação front-end construída com Next.js (app router) e TypeScript. A UI é composta por componentes na pasta `components/`, com um conjunto de primitives em `components/ui/`. Hooks reutilizáveis ficam em `hooks/` e utilitários em `lib/`.

---

## Estrutura detalhada

- `app/` - Páginas e layout
  - `page.tsx` - Página raiz (home/dashboard inicial).
  - `layout.tsx` - Layout global da aplicação (provavelmente inclui `ThemeProvider`, `Header` e `Sidebar`).
  - `globals.css` - Estilos globais (Tailwind + customizações).
  - `columns.tsx` - Definição de colunas para tabelas ou layout específico.
  - `conta/[id]/page.tsx` - Rota dinâmica para visualizar/editar uma conta por `id`.
  - `dashboard/page.tsx` - Página do dashboard com visão geral financeira.

- `components/` - Componentes de alto nível usados nas páginas
  - `account-detail-modal.tsx` - Modal que exibe detalhes de uma conta.
  - `add-account-modal.tsx` - Modal para adicionar uma nova conta.
  - `app-sidebar.tsx` - Sidebar principal da aplicação com navegação.
  - `charts-section.tsx` - Seção de gráficos no dashboard.
  - `command-palette.tsx` - Paleta de comandos/atalhos (search/quick actions).
  - `data-table-pagination.tsx` - Componente de paginação para tabelas.
  - `file-upload-modal.tsx` - Modal para upload de arquivos.
  - `financial-data-view.tsx` - Visor/relatório de dados financeiros.
  - `header.tsx` - Cabeçalho global (barra superior).
  - `keyword-picker.tsx` - Componente para seleção de palavras-chave/labels.
  - `nav-main.tsx`, `nav-projects.tsx`, `nav-user.tsx` - Itens de navegação organizados.
  - `pass-apps-menu.tsx` - Menu de apps/pass relacionados.
  - `payment-modal.tsx` - Modal para realizar pagamentos (mock).
  - `profile-menu.tsx` - Menu de perfil/usuário.
  - `section-cards.tsx` - Cards de seção (resumo de métricas).
  - `status-filter.tsx` - Filtro por status (ex.: pendente, pago).
  - `team-switcher.tsx` - Componente para trocar entre times/contas.
  - `theme-provider.tsx` - Provider para tema (modo claro/escuro).

  - `components/ui/` - Biblioteca de primitives UI reutilizáveis
    - `avatar.tsx` - Avatar do usuário.
    - `badge.tsx` - Badge/etiqueta.
    - `breadcrumb.tsx` - Breadcrumb de navegação.
    - `button.tsx` - Botão estilizado.
    - `calendar.tsx` - Componente de calendário.
    - `card.tsx` - Card genérico.
    - `chart.tsx` - Wrapper para gráficos.
    - `checkbox.tsx`, `input.tsx`, `select.tsx` - Form controls.
    - `collapsible.tsx`, `popover.tsx`, `dialog.tsx` - UI interativa.
    - `data-table.tsx`, `table.tsx` - Componentes de tabela e auxílio.
    - `pagination.tsx`, `tooltip.tsx`, `skeleton.tsx` - Helpers de UI.

- `hooks/` - Hooks React
  - `use-mobile.tsx` - Detecta se o usuário está em dispositivo mobile.
  - `use-sidebar.tsx` - Estado do sidebar (aberto/fechado, responsividade).

- `lib/` - Utilitários e dados
  - `utils.ts` - Funções utilitárias (formatadores, helpers de data/número).
  - `data/accounts.ts` - Dados fictícios de contas para mock/local development.

- Arquivos de configuração (na raiz)
  - `package.json` - Scripts e dependências.
  - `next.config.js` - Configurações do Next.js.
  - `tailwind.config.ts` - Configuração do Tailwind CSS.
  - `tsconfig.json` - Configuração do TypeScript.
  - `postcss.config.mjs` - Configuração PostCSS.
  - `components.json` - mapeamento/metadados de componentes 
---

## Fluxos principais 

- Tela inicial / Dashboard: `app/page.tsx`, `app/dashboard/page.tsx`, `components/charts-section.tsx`, `components/section-cards.tsx`.
- Navegação e layout: `components/header.tsx`, `components/app-sidebar.tsx`, `components/theme-provider.tsx`, `app/layout.tsx`.
- Tabelas e listagens: `components/data-table-pagination.tsx`, `components/ui/data-table.tsx`, `components/ui/table.tsx`.

## Boas práticas e recomendações 


- Mantenha `components/ui/` apenas com primitives; componentes de domínio ficam em `components/`.
- Centralize mocks em `lib/data/` para facilitar troca por chamadas reais a APIs.

## Executar testes
- Instalar dependências: `npm install`
- Rodar dev: `npm run dev`

---

