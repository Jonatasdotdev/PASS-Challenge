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
import { Card, CardContent } from "@/components/ui/card";
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

  // Utilitários de classe com suporte a tema claro/escuro (mesmo padrão do AccountDetailsModal)
  const textLabel = "text-xs text-gray-600 dark:text-gray-300";
  const inputSmall =
    "h-7 bg-transparent border border-gray-300 dark:border-white/20 text-xs text-gray-900 dark:text-gray-100 rounded-md px-2 focus-visible:ring-0 focus-visible:border-gray-400 dark:focus-visible:border-white/40 placeholder:text-gray-500";
  const baseBoxSmall =
    "h-7 px-2 flex items-center rounded-md border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-200 text-sm bg-transparent";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#1f1f1f] rounded-lg p-0 shadow-2xl">
        {/* Header - mesmo estilo do AccountDetailsModal */}
        <DialogHeader className="px-6 py-3 border-b border-gray-200 dark:border-[#1f1f1f]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <DialogTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Pagamento
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        {/* Conteúdo */}
        <div className="px-6 py-4 space-y-6">
          {/* Dados Gerais - mesmo estilo do AccountDetailsModal */}
          <Card className="border-transparent shadow-none bg-transparent">
            <CardContent className="p-0 text-gray-900 dark:text-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Dados Gerais</h3>
              </div>
              
              <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                {/* Data do movimento */}
                <div className="space-y-2">
                  <Label className={textLabel}>Data do Movimento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-7 w-full justify-start px-2 text-xs text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-white/20"
                        id="dataMovimento"
                        aria-label="Selecionar data do movimento"
                      >
                        {formatDate(dataMovimento)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white dark:bg-[#161616] border border-gray-200 dark:border-[#1f1f1f]">
                      <Calendar
                        mode="single"
                        selected={dataMovimento}
                        onSelect={(date: Date | undefined) => setDataMovimento(date)}
                        required={false}
                        className="bg-white dark:bg-[#161616] text-gray-900 dark:text-gray-100 
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
                  <Label className={textLabel}>Caixa/Conta (#180511)</Label>
                  <Select>
                    <SelectTrigger className={inputSmall}>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#161616] border border-gray-200 dark:border-[#1f1f1f] text-gray-900 dark:text-gray-200">
                      <SelectItem value="1">Opção 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Forma de pagamento */}
                <div className="space-y-2">
                  <Label className={textLabel}>Forma de Pagamento (#180506)</Label>
                  <Select>
                    <SelectTrigger className={inputSmall}>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#161616] border border-gray-200 dark:border-[#1f1f1f] text-gray-900 dark:text-gray-200">
                      <SelectItem value="1">Opção 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Saldo a pagar (visual) */}
                <div className="space-y-2">
                  <Label className={textLabel}>Saldo a Pagar</Label>
                  <div className="h-7 px-2 flex items-center rounded-md bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm font-medium">
                    -R$ 100,00
                  </div>
                </div>

                {/* Valor */}
                <div className="space-y-2">
                  <Label className={textLabel}>Valor</Label>
                  <Input 
                    type="text" 
                    placeholder="0,00" 
                    className={inputSmall}
                  />
                </div>

                {/* Classificação gerencial (visual) */}
                <div className="space-y-2">
                  <Label className={textLabel}>Classificação Gerencial (#180518)</Label>
                  <div className={baseBoxSmall}>
                    1.1.1.01.001 - Caixa Fundo Fixo
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notas - mesmo estilo do AccountDetailsModal */}
          <Card className="border-transparent shadow-none bg-transparent">
            <CardContent className="p-0 text-gray-900 dark:text-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notas</h3>
              </div>
              
              <textarea
                className="w-full min-h-[120px] p-3 border rounded-md resize-none text-sm
                           border-gray-300 dark:border-[#1f1f1f]
                           bg-white dark:bg-[#161616] text-gray-900 dark:text-gray-200
                           placeholder:text-gray-500"
                placeholder="Adicione suas notas aqui..."
              />
            </CardContent>
          </Card>
        </div>

        {/* Footer - mesmo estilo do AccountDetailsModal */}
        <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-gray-200 dark:border-[#1f1f1f] bg-white dark:bg-[#0a0a0a]">
          <DialogClose asChild>
            <Button variant="ghost" className="h-8 text-xs">
              Cancelar
            </Button>
          </DialogClose>
          <Button className="h-8 text-xs">
            Cadastrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}