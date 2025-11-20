# Documentação Técnica — `app/`

Este arquivo documenta a pasta `app/` (Next.js App Router) e as páginas/fluxos principais.

Arquivos principais

- `page.tsx` (raiz)
  - Página de entrada da aplicação. Geralmente redireciona ou renderiza o dashboard/home.
  - Deve montar as seções principais (cards, gráficos, listagens) ou delegar para `dashboard/page.tsx`.

- `layout.tsx`
  - Layout global do app. Normalmente envolve providers (ex.: `ThemeProvider`), o `Header` e o `AppSidebar`.
  - Aqui ficam wrappers que persistem entre rotas (menus, estado do layout, estilos globais).

- `globals.css`
  - Estilos globais e configurações do Tailwind. Contém resets, variáveis CSS e classes utilitárias.

- `columns.tsx`
  - Definições de colunas reutilizáveis para tabelas da aplicação. Exporta um array/objeto com colDefs.
  - Usado por listagens (ex.: `data-table`, `financial-data-view`).

- `conta/[id]/page.tsx`
  - Rota dinâmica para exibir detalhes de uma conta específica. Recebe `id` via params do Next.js.
  - Renderiza `account-detail-modal` ou uma página com informações, transações e ações (pagar, editar, excluir).

- `dashboard/page.tsx`
  - Página do dashboard. Composição de `charts-section`, `section-cards` e componentes de resumo financeiro.


Fluxo de navegação e dados

- Inicialização: `layout.tsx` monta o provider de tema e layout persistente.
- Usuário acessa `/` → `page.tsx` ou `/dashboard` → `dashboard/page.tsx` é renderizado.
- Ao abrir uma conta: navegação para `/conta/[id]` carrega dados mock de `lib/data/accounts.ts` (ou uma chamada API no futuro) e renderiza os detalhes.

Observações de implementação

- Prefira manter `layout.tsx` leve — movimentos de estado específicos da página devem ficar nas páginas ou componentes.
- Centralize formatos (moeda, datas) em `lib/utils.ts` e importe nas páginas e componentes para consistência.
