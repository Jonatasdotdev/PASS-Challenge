# Documentação Técnica — `hooks/`

Descrição dos hooks customizados

- `use-mobile.tsx`
  - Detecta se o ambiente do usuário é mobile (por largura de viewport ou user-agent).
  - Retorna: `{ isMobile: boolean }` ou hook com `isMobile` e possivelmente `breakpoint`.
  - Uso típico: ajustar renderização do `Sidebar` ou trocar `Sheet`/`Modal` para mobile.

- `use-sidebar.tsx`
  - Hook para gerenciar estado do sidebar (aberto/fechado), persistência e comportamento responsivo.
  - Retorna: `{ isOpen, open, close, toggle }` e eventos para sincronizar com `localStorage` ou `media queries`.
  - Integrado em `app-sidebar.tsx` e `layout.tsx`.

Boas práticas

- Evitar efeitos colaterais diretos no hook; exponha apenas a API mínima.
- Quando necessário, ofereça callbacks (`onOpen`, `onClose`) para integração com analytics.
