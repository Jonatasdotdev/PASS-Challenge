"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Calculator, DollarSign, Search, Info, MoreVertical, AlertCircle } from "lucide-react";

interface FinancialDataViewProps {
  onPaymentClick: () => void;
}

export default function FinancialDataView({ onPaymentClick }: FinancialDataViewProps) {
  return (
    <div className="space-y-6">
      {/* Dados Financeiros Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-600" />
            <CardTitle className="text-base font-semibold">Dados Financeiros</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Competência</Label>
              <Input value="31/12/2025" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Vencimento</Label>
              <Input value="05/11/2025" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Vencimento Alterado</Label>
              <Input value="Indefinido" readOnly />
            </div>
            <div className="space-y-2">
              <Label>N° da Parcela</Label>
              <Input value="2" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Qtd. Total de Parcelas</Label>
              <Input value="12" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Previsão</Label>
              <Select defaultValue="nao">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nao">Não</SelectItem>
                  <SelectItem value="sim">Sim</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Transação</Label>
              <Select defaultValue="indefinido">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indefinido">Indefinido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Totais Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-gray-600" />
            <CardTitle className="text-base font-semibold">Totais</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-gray-500">Valor</Label>
              <div className="text-lg font-bold border-b pb-1">R$ 100,00</div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-gray-500">Desconto (-)</Label>
              <div className="text-lg font-bold border-b pb-1">R$ 0,00</div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-gray-500">Juros (+)</Label>
              <div className="text-lg font-bold border-b pb-1">R$ 0,00</div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-gray-500">Total</Label>
              <div className="text-lg font-bold border-b pb-1">R$ 100,00</div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-gray-500">Valor Pago</Label>
              <div className="text-lg font-bold border-b pb-1">R$ 0,00</div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-gray-500">Saldo</Label>
              <div className="text-lg font-bold border-b pb-1 text-red-600">-R$ 100,00</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pagamento Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-600" />
              <CardTitle className="text-base font-semibold">Pagamento</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-600">29/02/2012 - 17/07/2039</div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar"
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cheque N°</TableHead>
                <TableHead>Caixa</TableHead>
                <TableHead>Classificação</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-500">Nenhum registro</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>R$ 0,00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end">
            <Button onClick={onPaymentClick}>
              Adicionar Pagamento
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

