"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  AlertCircle,
  FileText,
} from "lucide-react";

// calendar + popover
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function PaymentModal({ open, onOpenChange }: PaymentModalProps) {
  const [dataMovimento, setDataMovimento] = useState<Date | undefined>(new Date());

  const formatDate = (d?: Date) =>
    d ? d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Selecione";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-card border border-gray-200 dark:border-neutral-800 rounded-lg p-0 shadow-lg">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              <DialogTitle className="text-lg font-semibold">Pagamento</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        {/* Conteúdo */}
        <div className="px-6 py-4 space-y-6">
          {/* Dados Gerais  */}
          <Card className="border border-gray-200 dark:border-neutral-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                Dados Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Data do movimento */}
                <div className="space-y-2">
                  <Label htmlFor="dataMovimento">Data do Movimento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-8 w-full justify-start px-3 text-sm text-gray-700 dark:text-gray-200"
                        id="dataMovimento"
                        aria-label="Selecionar data do movimento"
                      >
                        {formatDate(dataMovimento)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700">
                      <Calendar
                        mode="single"
                        selected={dataMovimento}
                        onSelect={(date: Date | undefined) => setDataMovimento(date)}
                        required={false}
                        className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 
                                  [&_.rdp-day]:text-gray-900 dark:[&_.rdp-day]:text-gray-100
                                  [&_.rdp-day_selected]:bg-blue-100 [&_.rdp-day_selected]:text-blue-800
                                  [&_.rdp-day_selected]:font-medium
                                  dark:[&_.rdp-day_selected]:bg-blue-900/30 dark:[&_.rdp-day_selected]:text-blue-200
                                  [&_.rdp-day_selected:hover]:bg-blue-200 dark:[&_.rdp-day_selected:hover]:bg-blue-800/40
                                  [&_.rdp-day:hover]:bg-gray-100 dark:[&_.rdp-day:hover]:bg-neutral-800"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Caixa/Conta */}
                <div className="space-y-2">
                  <Label htmlFor="caixaConta">Caixa/Conta (#180511)</Label>
                  <Select>
                    <SelectTrigger id="caixaConta" className="h-8">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Opção 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Forma de pagamento */}
                <div className="space-y-2">
                  <Label htmlFor="formaPagamento">Forma de Pagamento (#180506)</Label>
                  <Select>
                    <SelectTrigger id="formaPagamento" className="h-8">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Opção 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Saldo a pagar (visual) */}
                <div className="space-y-2">
                  <Label>Saldo a Pagar</Label>
                  <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 text-gray-700 dark:bg-neutral-800 dark:text-gray-200">
                    -R$ 100,00
                  </div>
                </div>

                {/* Valor */}
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor</Label>
                  <Input id="valor" type="text" placeholder="0,00" className="h-8" />
                </div>

                {/* Classificação gerencial (visual) */}
                <div className="space-y-2">
                  <Label>Classificação Gerencial (#180518)</Label>
                  <div className="h-8 px-3 flex items-center rounded-md text-gray-700 dark:text-gray-200 bg-transparent">
                    1.1.1.01.001 - Caixa Fundo Fixo
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notas*/}
          <Card className="border border-gray-200 dark:border-neutral-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                Notas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <textarea
                className="w-full min-h-[120px] p-3 border rounded-md resize-none
                           border-gray-200 dark:border-neutral-700
                           bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100
                           placeholder:text-gray-400 dark:placeholder:text-gray-500"
                placeholder="Adicione suas notas aqui..."
              />
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-neutral-800">
          <DialogClose asChild>
            <Button variant="ghost" className="h-8">
              Cancelar
            </Button>
          </DialogClose>
          <Button className="h-8">Cadastrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}