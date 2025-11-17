"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronsUpDown, ArrowUp, ArrowDown, Edit, Trash2 } from "lucide-react";
import type { AccountPayable } from "@/lib/data/accounts";

// Componente reutilizável para headers com sorting
const SortableHeader = ({ column, title }: { column: any; title: string }) => {
  const isSorted = column.getIsSorted();
  
  return (
    <Button 
      variant="ghost" 
      className="w-full justify-start px-0 whitespace-nowrap h-6 text-xs gap-1 hover:bg-transparent" 
      onClick={() => column.toggleSorting(isSorted === "asc")}
    >
      <span>{title}</span>
      {isSorted ? (
        isSorted === "asc" ? (
          <ArrowUp className="h-3 w-3 ml-auto" />
        ) : (
          <ArrowDown className="h-3 w-3 ml-auto" />
        )
      ) : (
        <ChevronsUpDown className="h-3 w-3 ml-auto text-muted-foreground" />
      )}
    </Button>
  );
};

export const columns: ColumnDef<AccountPayable>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="h-3 w-3"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="h-3 w-3" 
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 28, 
  },
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} title="Cod." />,
    cell: ({ row }) => <div className="font-medium text-xs whitespace-nowrap">{row.getValue("id")}</div>,
    enableSorting: true,
  },
  { 
    accessorKey: "competencia", 
    header: ({ column }) => <SortableHeader column={column} title="Competência" />,
    cell: ({ row }) => <div className="whitespace-nowrap text-xs">{row.getValue("competencia")}</div>,
    enableSorting: true,
  },
  { 
    accessorKey: "vencimento", 
    header: ({ column }) => <SortableHeader column={column} title="Vencimento" />,
    cell: ({ row }) => <div className="whitespace-nowrap text-xs">{row.getValue("vencimento")}</div>,
    enableSorting: true,
  },
  { 
    accessorKey: "quitacao", 
    header: ({ column }) => <SortableHeader column={column} title="Quitação" />,
    cell: ({ row }) => <div className="whitespace-nowrap text-xs">{row.getValue("quitacao")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
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
    enableSorting: true,
  },
  { 
    accessorKey: "classificacao", 
    header: ({ column }) => <SortableHeader column={column} title="Classificação" />,
    cell: ({ row }) => <div className="whitespace-nowrap text-xs">{row.getValue("classificacao")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "participantes",
    header: ({ column }) => <SortableHeader column={column} title="Participantes" />,
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
    enableSorting: true,
  },
  { 
    accessorKey: "parcela", 
    header: ({ column }) => <SortableHeader column={column} title="Parcela" />,
    cell: ({ row }) => <div className="whitespace-nowrap text-xs">{row.getValue("parcela")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <Button 
        variant="ghost" 
        className="w-full justify-end px-0 whitespace-nowrap h-6 text-xs gap-1 hover:bg-transparent" 
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>Total</span>
        {column.getIsSorted() ? (
          column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-3 w-3 ml-1" />
          ) : (
            <ArrowDown className="h-3 w-3 ml-1" />
          )
        ) : (
          <ChevronsUpDown className="h-3 w-3 ml-1 text-muted-foreground" />
        )}
      </Button>
    ),
    cell: ({ row }) => <div className="text-right font-medium whitespace-nowrap text-xs">{row.getValue("total") as string}</div>,
    enableSorting: true,
  },
  {
    id: "actions",
    header: () => (
      <div className="flex items-center gap-1 whitespace-nowrap text-xs text-muted-foreground">
        <span>Ações</span>
      </div>
    ),
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-1 whitespace-nowrap" onClick={(e) => e.stopPropagation()}> 
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