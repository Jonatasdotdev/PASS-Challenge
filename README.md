# PASS Challenge - Contas a Pagar

Sistema de gestão de contas a pagar desenvolvido com Next.js, React, ShadCN UI, Tailwind CSS e TypeScript.

## 🚀 Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **ShadCN UI** - Componentes UI
- **Radix UI** - Componentes primitivos acessíveis
- **Lucide React** - Ícones

## 📦 Instalação

1. Instale as dependências:

```bash
npm install
```

2. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
├── app/
│   ├── conta/[id]/      # Página de detalhes da conta
│   ├── globals.css      # Estilos globais
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página inicial (lista de contas)
├── components/
│   ├── ui/              # Componentes ShadCN UI
│   ├── financial-data-view.tsx
│   ├── file-upload-modal.tsx
│   └── payment-modal.tsx
└── lib/
    └── utils.ts         # Utilitários
```

## 🎨 Funcionalidades

### Página Principal
- Lista de contas a pagar em formato de tabela
- Filtros de busca e status
- Navegação para detalhes da conta
- Modal de pagamento

### Página de Detalhes da Conta
- **Dados Gerais**: Informações básicas da conta
- **Participantes**: Credor e devedor
- **Contábil**: Classificações contábeis e gerenciais
- **Dados Financeiros**: Competência, vencimento, parcelas
- **Totais**: Valores, descontos, juros e saldo
- **Pagamento**: Tabela de pagamentos realizados

### Modais
- **Modal de Pagamento**: Formulário para registrar pagamentos
- **Modal de Upload**: Upload de arquivos e notas

## 🎯 Design

O design foi inspirado no estilo moderno e limpo, mantendo todos os campos e funcionalidades da versão original, mas com uma interface atualizada e responsiva.

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

