# Documentação Técnica — `components/ui/`

Este documento descreve os primitives UI reutilizáveis em `components/ui/`. Estes componentes fornecem a base visual para os componentes de domínio.

Lista de components e responsabilidades

- `avatar.tsx` — Avatar do usuário com fallback, tamanho configurável.
- `badge.tsx` — Pequena etiqueta/contador usada em menus ou indicadores.
- `breadcrumb.tsx` — Navegação hierárquica para páginas internas.
- `button.tsx` — Botão estilizado com variantes (primary, secondary, ghost).
- `calendar.tsx` — Seletor de datas/mini calendário para filtros.
- `card.tsx` — Container visual para agrupar informações.
- `chart.tsx` — Wrapper para bibliotecas de gráfico (Chart.js/visx); recebe `data` e `options`.
- `checkbox.tsx` — Checkbox controlado com stylings.
- `collapsible.tsx` — Área expansível/colapsável.
- `command.tsx` — Pequeno componente para comandos (usado por `command-palette`).
- `data-table.tsx` — Tabela avançada com sorting, seleção e paginação hooks.
- `dialog.tsx` — Wrapper acessível para modais/dialogs.
- `dropdown-menu.tsx` — Menu suspenso com items e grupos.
- `input.tsx` — Campo de texto com suporte a prefix/suffix e validação.
- `label.tsx` — Label acessível para inputs.
- `pagination.tsx` — Controles de paginação (prev/next, jump to page).
- `popover.tsx` — Caixa flutuante para ajuda/context menus.
- `select.tsx` — Dropdown select com múltipla seleção opcional.
- `separator.tsx` — Linha separadora visual.
- `sheet.tsx` — Painel deslizante (sheet) para mobile/ações secundárias.
- `sidebar.tsx` — Estrutura para sidebars (usada por `app-sidebar` mais alto nível).
- `skeleton.tsx` — Placeholders para carregamento.
- `table.tsx` — Tabela simples (sem comportamentos avançados).
- `tabs.tsx` — Tabs para trocar vistas.
- `tooltip.tsx` — Dicas/contextual help.

Convenções e prop-types (recomendadas)

- Todos os primitives devem aceitar `className?: string` e `children?: React.ReactNode`.
- Usar `forwardRef` para compatibilidade com formulários e bibliotecas.
- Exportar variantes e props via TypeScript (ex.: `ButtonProps`) para documentação automática.

Exemplo de uso (padrão)

```
<Button variant="primary" onClick={handleSave}>Salvar</Button>
```
