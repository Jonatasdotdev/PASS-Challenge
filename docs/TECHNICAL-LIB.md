# Documentação Técnica — `lib/`

Descrição de utilitários e dados

- `lib/utils.ts`
  - Contém funções utilitárias compartilhadas, como formatadores de data e moeda, helpers para agregação de dados e utilitários pequenos (ex.: `formatCurrency`, `formatDate`, `groupByMonth`).
  - Recomenda-se escrever funções puras e exportá-las com nomes claros.

- `lib/data/accounts.ts`
  - Mock de dados de contas usado para desenvolvimento local e testes.
  - Estrutura esperada (exemplo):
    - `id: string`
    - `name: string`
    - `balance: number`
    - `currency?: string`
    - `status: 'active' | 'pending' | 'closed'`
    - `transactions?: Array<{ id, date, amount, type, description }>`
  - Pontos de atenção: quando trocar para API real, mantenha a forma dos dados ou adapte mapeadores em `lib/utils`.

Fluxos de dados

- Componentes de visualização (charts, tables) consomem `lib/data/accounts` enquanto estiver em modo mock.
- Ao migrar para backend, substituir import por chamadas fetch/axios e transformar/normalizar os dados via `lib/utils`.
