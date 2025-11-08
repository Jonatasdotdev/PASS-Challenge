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
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import PaymentModal from "@/components/payment-modal";
import { StatusFilter } from "@/components/status-filter";
import { filterAccounts } from "@/lib/data/accounts";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function Home() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  // Filter data (DataTable will handle pagination & selection)
  const filteredData = useMemo(() => {
    const statusFilterValue = statusFilter.length > 0 ? statusFilter.join(",") : "all";
    return filterAccounts(searchTerm, statusFilterValue);
  }, [searchTerm, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] text-gray-900 dark:text-white transition-colors">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header 
        sidebarOpen={sidebarOpen} 
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Main Content */}
      <main 
        className="mt-16 p-6 transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? '16rem' : '0' }}
      >
        {/* Main Container - All content inside */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-[#2a2a2a] overflow-hidden shadow-sm transition-[background-color,border-color] duration-300">
          <ResizablePanelGroup direction="vertical" className="min-h-[500px]">
            <ResizablePanel defaultSize={20} minSize={15}>
              {/* Toolbar */}
              <div className="p-4 border-b border-gray-200 dark:border-[#2a2a2a] flex items-center gap-3">
                <Button variant="outline" className="gap-2 h-10">
                  <Sparkles className="h-4 w-4" />
                  Ask AI
                </Button>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
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
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={80} minSize={50}>
              <div className="p-4">
                <DataTable columns={columns} data={filteredData} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </main>

      {/* Payment Modal */}
      <PaymentModal open={paymentModalOpen} onOpenChange={setPaymentModalOpen} />
    </div>
  );
}