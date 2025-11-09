// Static data service for Accounts Payable

export interface AccountPayable {
  id: string;
  competencia: string;
  vencimento: string;
  quitacao: string;
  status: "Pendente" | "Pago" | "Vencido";
  classificacao: string;
  participantes: string;
  parcela: string;
  total: string;
}

export const accountsData: AccountPayable[] = [
  {
    id: "000070",
    competencia: "31/12/2025",
    vencimento: "05/11/2025",
    quitacao: "2 dias vencidos",
    status: "Pendente",
    classificacao: "1.1.1.01.001 Caixa Fundo Fixo",
    participantes: "Amorim Cortinas\nInjetec",
    parcela: "2/12",
    total: "R$ 100,00",
  },
  {
    id: "000090",
    competencia: "06/11/2025",
    vencimento: "06/11/2025",
    quitacao: "1 dia vencido",
    status: "Pendente",
    classificacao: "Aluguel",
    participantes: "Amorim Cortinas\nIgor Nantal Industria",
    parcela: "1/1",
    total: "R$ 199,00",
  },
  {
    id: "000009",
    competencia: "31/12/2025",
    vencimento: "05/11/2025",
    quitacao: "-",
    status: "Pendente",
    classificacao: "Energia Elétrica",
    participantes: "Amorim Cortinas",
    parcela: "1/6",
    total: "R$ 150,00",
  },
  {
    id: "000071",
    competencia: "30/11/2025",
    vencimento: "10/11/2025",
    quitacao: "-",
    status: "Pendente",
    classificacao: "Telefone",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 89,00",
  },
  {
    id: "000072",
    competencia: "29/11/2025",
    vencimento: "08/11/2025",
    quitacao: "3 dias vencidos",
    status: "Vencido",
    classificacao: "Internet",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 120,00",
  },
  {
    id: "000073",
    competencia: "28/11/2025",
    vencimento: "07/11/2025",
    quitacao: "4 dias vencidos",
    status: "Vencido",
    classificacao: "Água",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 75,00",
  },
  {
    id: "000074",
    competencia: "27/11/2025",
    vencimento: "06/11/2025",
    quitacao: "5 dias vencidos",
    status: "Vencido",
    classificacao: "Gás",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 45,00",
  },
  // Novos registros adicionados para melhor demonstrar os charts
  {
    id: "000075",
    competencia: "31/10/2025",
    vencimento: "15/10/2025",
    quitacao: "Pago em 10/10/2025",
    status: "Pago",
    classificacao: "Material de Escritório",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 250,00",
  },
  {
    id: "000076",
    competencia: "31/10/2025",
    vencimento: "20/10/2025",
    quitacao: "Pago em 18/10/2025",
    status: "Pago",
    classificacao: "Manutenção",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 180,00",
  },
  {
    id: "000077",
    competencia: "30/11/2025",
    vencimento: "12/11/2025",
    quitacao: "-",
    status: "Pendente",
    classificacao: "Transporte",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 320,00",
  },
  {
    id: "000078",
    competencia: "30/11/2025",
    vencimento: "14/11/2025",
    quitacao: "-",
    status: "Pendente",
    classificacao: "Seguro",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 450,00",
  },
  {
    id: "000079",
    competencia: "31/12/2025",
    vencimento: "20/12/2025",
    quitacao: "-",
    status: "Pendente",
    classificacao: "13º Salário",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 2,500,00",
  },
  {
    id: "000080",
    competencia: "31/12/2025",
    vencimento: "25/12/2025",
    quitacao: "-",
    status: "Pendente",
    classificacao: "Bonus Natal",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 1,200,00",
  },
  {
    id: "000081",
    competencia: "31/10/2025",
    vencimento: "05/10/2025",
    quitacao: "Pago em 01/10/2025",
    status: "Pago",
    classificacao: "Marketing",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 600,00",
  },
  {
    id: "000082",
    competencia: "31/10/2025",
    vencimento: "08/10/2025",
    quitacao: "Pago em 07/10/2025",
    status: "Pago",
    classificacao: "Consultoria",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 1,500,00",
  },
  {
    id: "000083",
    competencia: "30/11/2025",
    vencimento: "03/11/2025",
    quitacao: "8 dias vencidos",
    status: "Vencido",
    classificacao: "Fornecedor A",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 890,00",
  },
  {
    id: "000084",
    competencia: "30/11/2025",
    vencimento: "01/11/2025",
    quitacao: "10 dias vencidos",
    status: "Vencido",
    classificacao: "Fornecedor B",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 1,100,00",
  },
  {
    id: "000085",
    competencia: "31/12/2025",
    vencimento: "28/12/2025",
    quitacao: "-",
    status: "Pendente",
    classificacao: "IPTU",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 3,200,00",
  },
  {
    id: "000086",
    competencia: "31/12/2025",
    vencimento: "30/12/2025",
    quitacao: "-",
    status: "Pendente",
    classificacao: "IPVA",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 2,800,00",
  },
  {
    id: "000087",
    competencia: "31/10/2025",
    vencimento: "25/10/2025",
    quitacao: "Pago em 20/10/2025",
    status: "Pago",
    classificacao: "Treinamento",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 750,00",
  },
  {
    id: "000088",
    competencia: "30/11/2025",
    vencimento: "18/11/2025",
    quitacao: "-",
    status: "Pendente",
    classificacao: "Software",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 1,800,00",
  },
  {
    id: "000089",
    competencia: "30/11/2025",
    vencimento: "22/11/2025",
    quitacao: "-",
    status: "Pendente",
    classificacao: "Hardware",
    participantes: "Amorim Cortinas",
    parcela: "1/1",
    total: "R$ 3,500,00",
  },
];

// Get all accounts
export function getAllAccounts(): AccountPayable[] {
  return accountsData;
}

// Get account by ID
export function getAccountById(id: string): AccountPayable | undefined {
  return accountsData.find((account) => account.id === id);
}

// Get accounts with pagination
export function getAccountsPaginated(
  page: number = 1,
  pageSize: number = 10
): {
  data: AccountPayable[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = accountsData.slice(start, end);

  return {
    data: paginatedData,
    total: accountsData.length,
    page,
    pageSize,
    totalPages: Math.ceil(accountsData.length / pageSize),
  };
}

// Filter accounts
export function filterAccounts(
  searchTerm?: string,
  status?: string
): AccountPayable[] {
  let filtered = [...accountsData];

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (account) =>
        account.id.toLowerCase().includes(term) ||
        account.classificacao.toLowerCase().includes(term) ||
        account.participantes.toLowerCase().includes(term)
    );
  }

  if (status && status !== "all") {
    filtered = filtered.filter((account) => account.status === status);
  }

  return filtered;
}