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
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  AlertCircle,
  FileText,
  DollarSign,
  Upload,
  CalendarIcon,
} from "lucide-react";
import { KeywordPicker } from "./keyword-picker";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface AddAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddAccountModal({
  open,
  onOpenChange,
}: AddAccountModalProps) {
  const [keywords, setKeywords] = useState(["fornecedor", "cortinas", "prioridade"]);
  const [competencia, setCompetencia] = useState<Date | undefined>(new Date(2025, 11, 31));
  const [vencimento, setVencimento] = useState<Date | undefined>(new Date(2025, 10, 5));

  const formatDate = (date?: Date) => {
    if (!date) return "Selecione a data";
    return format(date, "dd/MM/yyyy");
  };

  // Utilitários de classe 
  const textLabel = "text-xs text-gray-600 dark:text-gray-300";
  const inputSmall = "h-7 bg-transparent border border-gray-300 dark:border-white/20 text-xs text-gray-900 dark:text-gray-100 rounded-md px-2 focus-visible:ring-0 focus-visible:border-gray-400 dark:focus-visible:border-white/40 placeholder:text-gray-500";
  const baseBoxSmall = "h-7 px-2 flex items-center rounded-md border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-200 text-sm focus-within:border-gray-400 dark:focus-within:border-white/40 transition bg-transparent";

  const renderField = (placeholder: string) => (
    <Input placeholder={placeholder} className={inputSmall} />
  );

  const renderSelect = (placeholder: string, options: { value: string; label: string }[]) => (
    <Select>
      <SelectTrigger className={inputSmall}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-[#161616] border border-gray-200 dark:border-[#1f1f1f] text-gray-900 dark:text-gray-200">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const handleSave = () => {
    console.log("Cadastrando nova conta...");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full max-h-[98vh] overflow-y-auto bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#1f1f1f] rounded-lg p-0 shadow-2xl">
        {/* Header*/}
        <DialogHeader className="px-6 py-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center bg-gray-50 dark:bg-[#161616]">
              <CreditCard className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Nova Conta a Pagar
              </DialogTitle>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Preencha todos os campos para cadastrar uma nova conta
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Conteúdo */}
        <div className="px-6 py-4 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Seção 1: Dados Gerais */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Dados Gerais</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={textLabel}>Documento/Contrato</Label>
                {renderField("Indefinido")}
              </div>
              <div className="space-y-2">
                <Label className={textLabel}>Fatura</Label>
                {renderField("Indefinido")}
              </div>
              <div className="space-y-2">
                <Label className={textLabel}>Conta/Grupo</Label>
                {renderField("9")}
              </div>
              <div className="space-y-2">
                <Label className={textLabel}>Referência</Label>
                {renderField("-")}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={textLabel}>Credor</Label>
                {renderField("Injetec")}
              </div>
              <div className="space-y-2">
                <Label className={textLabel}>Devedor</Label>
                {renderField("Amorim Cortinas")}
              </div>
            </div>

            <KeywordPicker
              keywords={keywords}
              setKeywords={setKeywords}
              isEditing={true}
              textLabel={textLabel}
              inputSmall={inputSmall}
              baseBoxSmall={baseBoxSmall}
            />
          </div>

          <Separator />

          {/* Seção 2: Contábil */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Contábil</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label className={textLabel}>Classificação Contábil</Label>
                {renderField("111.01.001 - Caixa Fundo Fixo")}
              </div>
              <div className="space-y-2">
                <Label className={textLabel}>Classificação Gerencial</Label>
                {renderField("Administrativo")}
              </div>
              <div className="space-y-2">
                <Label className={textLabel}>Centro de Custo</Label>
                {renderField("Administrativo")}
              </div>
            </div>
          </div>

          <Separator />

          {/* Seção 3: Dados Financeiros */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Dados Financeiros</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={textLabel}>Competência</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-7 w-full justify-start px-2 text-xs text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-white/20">
                      <CalendarIcon className="mr-2 h-3 w-3" />
                      {formatDate(competencia)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={competencia}
                      onSelect={setCompetencia}
                      locale={ptBR}
                      className="bg-white dark:bg-[#0a0a0a] border-0"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className={textLabel}>Vencimento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-7 w-full justify-start px-2 text-xs text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-white/20">
                      <CalendarIcon className="mr-2 h-3 w-3" />
                      {formatDate(vencimento)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={vencimento}
                      onSelect={setVencimento}
                      locale={ptBR}
                      className="bg-white dark:bg-[#0a0a0a] border-0"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className={textLabel}>Nº da Parcela</Label>
                {renderField("2")}
              </div>

              <div className="space-y-2">
                <Label className={textLabel}>Qtd. Total de Parcelas</Label>
                {renderField("12")}
              </div>

              <div className="space-y-2">
                <Label className={textLabel}>Valor</Label>
                {renderField("R$ 100,00")}
              </div>
            </div>
          </div>

          <Separator />

          {/* Seção 4: Notas */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Notas</h3>
            </div>
            
            <div className="space-y-3">
              <div className="border-2 border-dashed rounded-md p-4 text-center border-gray-300 dark:border-[#1f1f1f] bg-gray-50 dark:bg-[#161616]">
                <Upload className="h-5 w-5 mx-auto text-gray-600 dark:text-gray-200 mb-1" />
                <p className="text-xs text-gray-600 dark:text-gray-200">
                  Clique aqui para inserir anexos
                </p>
              </div>

              <div className="space-y-1">
                <Label className={textLabel}>Notas</Label>
                <textarea
                  className="w-full min-h-[80px] p-3 border rounded-md resize-none text-sm border-gray-300 dark:border-[#1f1f1f] bg-white dark:bg-[#161616] text-gray-900 dark:text-gray-200 placeholder:text-gray-500"
                  placeholder="Adicione suas notas aqui..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-gray-200 dark:border-[#1f1f1f]">
          <DialogClose asChild>
            <Button variant="ghost" className="h-8 text-xs">
              Cancelar
            </Button>
          </DialogClose>
          <Button className="h-8 text-xs bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200" onClick={handleSave}>
            Cadastrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}