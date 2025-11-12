"use client";

import { useState, useMemo } from "react";
import {
  Search,
  RefreshCw,
  Download,
  Plus,
  Bot,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/header";

import PaymentModal from "@/components/payment-modal";
import AccountDetailsModal from "@/components/account-detail-modal";

import { StatusFilter } from "@/components/status-filter";
import { filterAccounts } from "@/lib/data/accounts";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { SectionCards } from "@/components/section-cards";
import { ChartsSection } from "@/components/charts-section";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Home() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  // Quando cadastrar um pagamento → abrir detalhes
  const handlePaymentSuccess = () => {
    setPaymentModalOpen(false);
    setDetailsModalOpen(true);
    setSelectedAccount("000070");
  };

  // Quando clicar em linha da tabela → abrir detalhes
  const handleRowClick = (account: any) => {
    setSelectedAccount(account.id);
    setDetailsModalOpen(true);
  };

  // Status filter options com contagens
  const statusOptions = useMemo(() => {
    const all = filterAccounts("");
    const counts = all.reduce((acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return [
      { value: "Pendente", label: "Pendente", count: counts["Pendente"] || 0 },
      { value: "Pago", label: "Pago", count: counts["Pago"] || 0 },
      { value: "Vencido", label: "Vencido", count: counts["Vencido"] || 0 },
    ];
  }, []);

  // Totais para os cards
  const cardData = useMemo(() => {
    const all = filterAccounts("");
    return all.reduce(
      (acc, account) => {
        const amount = parseFloat(account.total.replace("R$ ", "").replace(",", "."));
        acc.total += amount;
        if (account.status === "Pago") acc.paid += amount;
        if (account.status === "Pendente") acc.pending += amount;
        if (account.status === "Vencido") acc.overdue += amount;
        return acc;
      },
      { total: 0, paid: 0, pending: 0, overdue: 0 }
    );
  }, []);

  // Filtrados
  const filteredData = useMemo(() => {
    const statusValue = statusFilter.length > 0 ? statusFilter.join(",") : "all";
    return filterAccounts(searchTerm, statusValue);
  }, [searchTerm, statusFilter]);

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Header />

        <div className="flex flex-1 flex-col gap-3 p-3 pt-3">
          {/* Cards métricos */}
          <SectionCards data={cardData} />

          {/* Gráficos - Ocultar em mobile ou ajustar altura */}
          <div className="hidden sm:block">
            <ChartsSection data={filteredData} />
          </div>

          <div className="bg-card rounded-lg border shadow-sm">
            {/* Toolbar  */}
            <div className="p-3 border-b">
              {/* Layout mobile - Empilhado */}
              <div className="flex flex-col gap-3 sm:hidden">
                {/* Linha 1: AI Button + Search */}
                <div className="flex items-center gap-2">
                  <Sheet>
                    
                  </Sheet>

                  <Button 
                    variant="default" 
                    size="icon" 
                    className="h-9 w-9" 
                    title="Ask AI"
                  >
                    <Bot className="h-4 w-4" />
                  </Button>

                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4  text-muted-foreground" />
                    <Input
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 h-9 text-sm"
                    />
                  </div>
                </div>

                {/* Linha 2: Filter + Botões de ação */}
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex-1 min-w-0">
                    <StatusFilter value={statusFilter} onChange={setStatusFilter} options={statusOptions} />
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9" title="Atualizar">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9" title="Mais opções">
                          <Download className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="bottom" className="h-40">
                        <div className="flex flex-col gap-2 pt-6">
                          <Button variant="outline" className="justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Exportar CSV
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Exportar PDF
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>

                {/* Linha 3: Botão Adicionar CONTA */}
                <Button 
                  className="gap-1.5 h-9 text-sm w-full" 
                  onClick={() => {
                    setSelectedAccount(null); 
                    setDetailsModalOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4" /> Adicionar Conta
                </Button>
              </div>

              {/* Layout desktop */}
              <div className="hidden sm:flex items-center justify-between gap-3">
                {/* Esquerda */}
                <div className="flex items-center gap-2 flex-1">
                  <Button 
                    variant="default" 
                    size="icon" 
                    className="h-9 w-9" 
                    title="Ask AI"
                  >
                    <Bot className="h-4 w-4" />
                  </Button>

                  {/* Search */}
                  <div className="relative w-56">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 h-8 text-sm"
                    />
                  </div>

                  {/* Filter */}
                  <StatusFilter value={statusFilter} onChange={setStatusFilter} options={statusOptions} />
                </div>

                {/* Centro vazio */}
                <div className="flex-1" />

                {/* Botões direita */}
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" title="Atualizar">
                    <RefreshCw className="h-3.5 w-3.5" />
                  </Button>

                  <Button variant="ghost" size="icon" className="h-8 w-8" title="Exportar">
                    <Download className="h-3.5 w-3.5" />
                  </Button>

                  <Button 
                    className="gap-1.5 h-8 text-sm px-3" 
                    onClick={() => {
                      setSelectedAccount(null); // Modo criação
                      setDetailsModalOpen(true);
                    }}
                  >
                    <Plus className="h-3.5 w-3.5" /> Adicionar Conta
                  </Button>
                </div>
              </div>
            </div>

            {/* DataTable */}
            <div className="p-3">
              <div className="overflow-x-auto">
                <DataTable columns={columns} data={filteredData} onRowClick={handleRowClick} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Modais */}
      <PaymentModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        onSuccess={handlePaymentSuccess}
      />

      <AccountDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        accountId={selectedAccount}
        onOpenPaymentModal={() => setPaymentModalOpen(true)}
      />
    </SidebarProvider>
  );
}