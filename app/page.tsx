// app/page.tsx
"use client";
import { useState, useMemo } from "react";
import {
  Search,
  RefreshCw,
  Download,
  Plus,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import PaymentModal from "@/components/payment-modal";
import { StatusFilter } from "@/components/status-filter";
import { filterAccounts } from "@/lib/data/accounts";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { SectionCards } from "@/components/section-cards";

export default function Home() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  // Status filter options with counts
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

  // Calculate totals for cards
  const cardData = useMemo(() => {
    const all = filterAccounts("");
    return all.reduce((acc, account) => {
      const amount = parseFloat(account.total.replace('R$ ', '').replace(',', '.'));
      acc.total += amount;
      if (account.status === "Pago") acc.paid += amount;
      if (account.status === "Pendente") acc.pending += amount;
      if (account.status === "Vencido") acc.overdue += amount;
      return acc;
    }, { total: 0, paid: 0, pending: 0, overdue: 0 });
  }, []);

  // Filtered data
  const filteredData = useMemo(() => {
    const statusFilterValue = statusFilter.length > 0 ? statusFilter.join(",") : "all";
    return filterAccounts(searchTerm, statusFilterValue);
  }, [searchTerm, statusFilter]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Contas a Pagar</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Metrics Cards */}
          <div className="mt-4">
            <SectionCards data={cardData} />
          </div>
          
          <div className="bg-card rounded-lg border shadow-sm">
            {/* Toolbar */}
            <div className="p-4 border-b flex items-center gap-3">
              <Button variant="outline" className="gap-2 h-10">
                <Sparkles className="h-4 w-4" />
                Ask AI
              </Button>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-10"
                />
              </div>
              <StatusFilter value={statusFilter} onChange={setStatusFilter} options={statusOptions} />
              <Button variant="ghost" className="gap-2 h-10">
                <RefreshCw className="h-4 w-4" />
                Atualizar
              </Button>
              <Button variant="ghost" className="gap-2 h-10">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button className="gap-2 h-10" onClick={() => setPaymentModalOpen(true)}>
                <Plus className="h-4 w-4" />
                Adicionar
              </Button>
            </div>
            {/* Data table */}
            <div className="p-4">
              <DataTable columns={columns} data={filteredData} />
            </div>
          </div>
        </div>
      </SidebarInset>
      
      {/* Payment Modal */}
      <PaymentModal open={paymentModalOpen} onOpenChange={setPaymentModalOpen} />
    </SidebarProvider>
  );
}