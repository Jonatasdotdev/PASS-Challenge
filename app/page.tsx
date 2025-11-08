"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  RefreshCw,
  Download,
  Plus,
  Edit,
  Trash2,
  Sparkles,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import PaymentModal from "@/components/payment-modal";
import {
  getAllAccounts,
  filterAccounts,
  getAccountsPaginated,
  type AccountPayable,
} from "@/lib/data/accounts";

export default function Home() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filter and paginate data
  const filteredData = useMemo(() => {
    return filterAccounts(searchTerm, statusFilter);
  }, [searchTerm, statusFilter]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return {
      data: filteredData.slice(start, end),
      total: filteredData.length,
      totalPages: Math.ceil(filteredData.length / pageSize),
    };
  }, [filteredData, currentPage, pageSize]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(paginatedData.data.map((item) => item.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Pago":
        return "default";
      case "Vencido":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pago":
        return "bg-green-500";
      case "Vencido":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Sidebar />
      <Header />

      {/* Main Content */}
      <main className="ml-64 mt-16 p-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white">Contas a Pagar</h1>
        </div>

        {/* Action Bar */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            {/* Ask AI Button */}
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <Sparkles className="h-4 w-4" />
              Ask AI
            </Button>

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar contas a pagar..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-500 focus:border-blue-600"
              />
            </div>

            {/* Filters */}
            <Button
              variant="outline"
              className="bg-[#1a1a1a] border-[#2a2a2a] text-gray-300 hover:bg-[#2a2a2a] hover:text-white gap-2"
            >
              <Filter className="h-4 w-4" />
              Modo
            </Button>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[140px] bg-[#1a1a1a] border-[#2a2a2a] text-gray-300 hover:bg-[#2a2a2a] hover:text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
                  <SelectItem value="all" className="text-white hover:bg-[#3a3a3a]">
                    Todos
                  </SelectItem>
                  <SelectItem value="Pendente" className="text-white hover:bg-[#3a3a3a]">
                    Pendente
                  </SelectItem>
                  <SelectItem value="Pago" className="text-white hover:bg-[#3a3a3a]">
                    Pago
                  </SelectItem>
                  <SelectItem value="Vencido" className="text-white hover:bg-[#3a3a3a]">
                    Vencido
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="bg-[#1a1a1a] border-[#2a2a2a] text-gray-300 hover:bg-[#2a2a2a] hover:text-white gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Update
            </Button>
            <Button
              variant="outline"
              className="bg-[#1a1a1a] border-[#2a2a2a] text-gray-300 hover:bg-[#2a2a2a] hover:text-white gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
              onClick={() => setPaymentModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Adicionar
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-[#2a2a2a] hover:bg-[#1a1a1a]">
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    className="rounded border-[#3a3a3a] bg-[#1a1a1a]"
                    checked={selectedRows.size === paginatedData.data.length && paginatedData.data.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </TableHead>
                <TableHead className="text-gray-400 font-medium">
                  <button
                    onClick={() => handleSort("id")}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    Cod.
                    {sortColumn === "id" && (
                      sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    )}
                  </button>
                </TableHead>
                <TableHead className="text-gray-400 font-medium">
                  <button
                    onClick={() => handleSort("competencia")}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    Competência
                    {sortColumn === "competencia" && (
                      sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    )}
                  </button>
                </TableHead>
                <TableHead className="text-gray-400 font-medium">
                  <button
                    onClick={() => handleSort("vencimento")}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    Vencimento
                    {sortColumn === "vencimento" && (
                      sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    )}
                  </button>
                </TableHead>
                <TableHead className="text-gray-400 font-medium">Quitação</TableHead>
                <TableHead className="text-gray-400 font-medium">
                  <button
                    onClick={() => handleSort("status")}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    Status
                    {sortColumn === "status" && (
                      sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    )}
                  </button>
                </TableHead>
                <TableHead className="text-gray-400 font-medium">Classificação</TableHead>
                <TableHead className="text-gray-400 font-medium">Participantes</TableHead>
                <TableHead className="text-gray-400 font-medium">Parcela</TableHead>
                <TableHead className="text-gray-400 font-medium">
                  <button
                    onClick={() => handleSort("total")}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    Total
                    {sortColumn === "total" && (
                      sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    )}
                  </button>
                </TableHead>
                <TableHead className="w-20 text-gray-400 font-medium">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.data.length === 0 ? (
                <TableRow className="border-[#2a2a2a] hover:bg-[#1a1a1a]">
                  <TableCell colSpan={11} className="text-center py-8 text-gray-400">
                    Nenhum registro encontrado
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.data.map((account) => (
                  <TableRow
                    key={account.id}
                    className="border-[#2a2a2a] hover:bg-[#252525] cursor-pointer"
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        className="rounded border-[#3a3a3a] bg-[#1a1a1a]"
                        checked={selectedRows.has(account.id)}
                        onChange={(e) => handleSelectRow(account.id, e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-white">
                      <Link
                        href={`/conta/${account.id}`}
                        className="hover:text-blue-400 hover:underline"
                      >
                        {account.id}
                      </Link>
                    </TableCell>
                    <TableCell className="text-gray-300">{account.competencia}</TableCell>
                    <TableCell className="text-gray-300">{account.vencimento}</TableCell>
                    <TableCell className="text-gray-300">{account.quitacao}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${getStatusColor(account.status)}`}
                        />
                        <Badge
                          variant={getStatusBadgeVariant(account.status)}
                          className="bg-[#2a2a2a] text-gray-300 border-[#3a3a3a]"
                        >
                          {account.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{account.classificacao}</TableCell>
                    <TableCell className="text-gray-300">
                      <div className="whitespace-pre-line">{account.participantes}</div>
                    </TableCell>
                    <TableCell className="text-gray-300">{account.parcela}</TableCell>
                    <TableCell className="font-medium text-white">{account.total}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle edit
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-[#2a2a2a]"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle delete
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={paginatedData.totalPages}
            pageSize={pageSize}
            totalItems={paginatedData.total}
            selectedCount={selectedRows.size}
            onPageChange={setCurrentPage}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setCurrentPage(1);
            }}
          />
        </div>
      </main>

      {/* Payment Modal */}
      <PaymentModal open={paymentModalOpen} onOpenChange={setPaymentModalOpen} />
    </div>
  );
}
