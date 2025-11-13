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
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="h-3 w-3"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="h-3 w-3" 
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 28, 
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button variant="ghost" className="px-0 whitespace-nowrap h-6 text-xs" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Cod.
        <ArrowUpDown className="ml-1 h-3 w-3" /> 
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium text-xs whitespace-nowrap">{row.getValue("id")}</div>,
  },
  { 
    accessorKey: "competencia", 
    header: "Competência",
    cell: ({ row }) => <div className="whitespace-nowrap text-xs">{row.getValue("competencia")}</div>,
  },
  { 
    accessorKey: "vencimento", 
    header: "Vencimento",
    cell: ({ row }) => <div className="whitespace-nowrap text-xs">{row.getValue("vencimento")}</div>,
  },
  { 
    accessorKey: "quitacao", 
    header: "Quitação",
    cell: ({ row }) => <div className="whitespace-nowrap text-xs">{row.getValue("quitacao")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      const map: Record<string, string> = {
        Pago: "text-green-500 border-0 ",
        Vencido: "text-red-500 border-0",
        Pendente: "text-yellow-500 border-0",
      };
      const dot = status === "Pago" ? "bg-green-500" : status === "Vencido" ? "bg-red-500" : "bg-yellow-500";
      return (
        <Badge variant="outline" className={`rounded-full px-2 py-0 text-xs whitespace-nowrap ${map[status] || ""}`}>
          <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${dot}`} /> 
          {status}
        </Badge>
      );
    },
  },
  { 
    accessorKey: "classificacao", 
    header: "Classificação",
    cell: ({ row }) => <div className="whitespace-nowrap text-xs">{row.getValue("classificacao")}</div>,
  },
  {
    accessorKey: "participantes",
    header: "Participantes",
    cell: ({ row }) => {
      const participantes = row.getValue("participantes") as string;
      return (
        <div 
          className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] text-xs" 
          title={participantes}
        >
          {participantes}
        </div>
      );
    },
  },
  { 
    accessorKey: "parcela", 
    header: "Parcela",
    cell: ({ row }) => <div className="whitespace-nowrap text-xs">{row.getValue("parcela")}</div>,
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right whitespace-nowrap text-xs">Total</div>,
    cell: ({ row }) => <div className="text-right font-medium whitespace-nowrap text-xs">{row.getValue("total") as string}</div>,
  },
  {
    id: "actions",
    header: "Ações",
    enableHiding: false,
    cell: () => (
      <div className="flex items-center gap-1 whitespace-nowrap"> 
        <Button variant="ghost" size="icon" className="h-6 w-6"> 
          <Edit className="h-3 w-3" /> 
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    ),
  },
];