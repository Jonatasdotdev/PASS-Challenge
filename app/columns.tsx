"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import type { AccountPayable } from "@/lib/data/accounts";

export const columns: ColumnDef<AccountPayable>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.currentTarget.checked)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.currentTarget.checked)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 36,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button variant="ghost" className="px-0" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}> 
        Cod.
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  { accessorKey: "competencia", header: "Competência" },
  { accessorKey: "vencimento", header: "Vencimento" },
  { accessorKey: "quitacao", header: "Quitação" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      const map: Record<string, string> = {
        Pago: "text-green-500 border-green-500/30 bg-green-500/10",
        Vencido: "text-red-500 border-red-500/30 bg-red-500/10",
        Pendente: "text-yellow-500 border-yellow-500/30 bg-yellow-500/10",
      };
      const dot = status === "Pago" ? "bg-green-500" : status === "Vencido" ? "bg-red-500" : "bg-yellow-500";
      return (
        <Badge variant="outline" className={`rounded-full px-2.5 py-0.5 ${map[status] || ""}`}>
          <span className={`mr-2 inline-block h-2 w-2 rounded-full ${dot}`} />
          {status}
        </Badge>
      );
    },
  },
  { accessorKey: "classificacao", header: "Classificação" },
  {
    accessorKey: "participantes",
    header: "Participantes",
    cell: ({ row }) => <div className="whitespace-pre-line">{row.getValue("participantes") as string}</div>,
  },
  { accessorKey: "parcela", header: "Parcela" },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => <div className="text-right font-medium">{row.getValue("total") as string}</div>,
  },
  {
    id: "actions",
    header: "Ações",
    enableHiding: false,
    cell: () => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
