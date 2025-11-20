"use client";

import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import {
  CreditCard,
  AlertCircle,
  FileText,
  DollarSign,
  Upload,
  Edit,
  Plus,
} from "lucide-react";
import { KeywordPicker } from "./keyword-picker";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface AccountDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountId?: string | null;
  onOpenPaymentModal?: () => void;
}

export default function AccountDetailsModal({
  open,
  onOpenChange,
  accountId,
  onOpenPaymentModal,
}: AccountDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("dados-gerais");
  const [keywords, setKeywords] = useState([
    "fornecedor",
    "cortinas",
    "prioridade",
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const tabsOrder = [
    "dados-gerais",
    "contabil",
    "dados-financeiros",
    "pagamento",
    "notas",
  ];
  const [direction, setDirection] = useState(0);
  const [competencia, setCompetencia] = useState<Date | undefined>(
    new Date(2025, 11, 31)
  );
  const [vencimento, setVencimento] = useState<Date | undefined>(
    new Date(2025, 10, 5)
  );
  const formatDate = (date?: Date) => {
    if (!date) return "Selecione a data";
    return format(date, "dd/MM/yyyy");
  };

  // Resetar estado quando modal abrir
  useEffect(() => {
    if (open) {
      setIsEditing(false);
    }
  }, [open]);

  const handleSave = () => {
    console.log("Atualizando conta existente...");
    setIsEditing(false);
  };

  const handleTabChange = (next: string) => {
    const currentIndex = tabsOrder.indexOf(activeTab);
    const nextIndex = tabsOrder.indexOf(next);
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setActiveTab(next);
  };

  // Utilitários de classe com suporte a tema claro/escuro
  const baseBoxSmall =
    "h-7 px-2 flex items-center rounded-md border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-200 text-sm focus-within:border-gray-400 dark:focus-within:border-white/40 transition bg-transparent";

  const textLabel = "text-xs text-gray-600 dark:text-gray-300";

  const inputSmall =
    "h-7 bg-transparent border border-gray-300 dark:border-white/20 text-xs text-gray-900 dark:text-gray-100 rounded-md px-2 focus-visible:ring-0 focus-visible:border-gray-400 dark:focus-visible:border-white/40 placeholder:text-gray-500";

  const renderField = (value: string, isEditable: boolean = true) => {
    if (isEditing && isEditable) {
      return <Input defaultValue={value} className={inputSmall} />;
    }
    return <div className={baseBoxSmall}>{value}</div>;
  };

  const renderSelect = (
    value: string,
    options: { value: string; label: string }[],
    isEditable: boolean = true
  ) => {
    if (isEditing && isEditable) {
      return (
        <Select defaultValue={value}>
          <SelectTrigger className={inputSmall}>
            <SelectValue />
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
    }
    return (
      <div className={baseBoxSmall}>
        {options.find((opt) => opt.value === value)?.label || value}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#1f1f1f] rounded-lg p-0 shadow-2xl">
        {/* Header  */}
        <DialogHeader className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center bg-gray-50 dark:bg-[#161616]">
              <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex flex-col justify-center">
                  <DialogTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {`Conta a Pagar - ${accountId}`}
                  </DialogTitle>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Visualize ou edite as informações nos campos
                  </p>
                </div>
                {!isEditing && (
                  <Button
                    className="h-7 text-xs gap-2 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 mr-10"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-3 w-3" />
                    Editar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Tabs */}
        <div className="px-6 pt-4">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="flex sm:grid sm:grid-cols-5 w-full mb-4 h-12 overflow-x-auto scrollbar-hide gap-1 sm:gap-0 border-b border-gray-200 dark:border-[#1f1f1f] bg-transparent">
              <TabsTrigger
                value="dados-gerais"
                className="flex items-center gap-2 text-xs font-medium py-2 px-3 text-gray-600 dark:text-gray-200 relative transition-all duration-300
                  data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100
                  data-[state=active]:after:content-[''] data-[state=active]:after:absolute
                  data-[state=active]:after:-bottom-1 data-[state=active]:after:left-1/2 
                  data-[state=active]:after:-translate-x-1/2 data-[state=active]:after:w-[80%] 
                  data-[state=active]:after:h-[3px] data-[state=active]:after:rounded-full 
                  data-[state=active]:after:bg-gray-900 dark:data-[state=active]:after:bg-gray-100"
              >
                <AlertCircle className="h-4 w-4" />
                <span>Dados Gerais</span>
              </TabsTrigger>

              <TabsTrigger
                value="contabil"
                className="flex items-center gap-2 text-xs font-medium py-2 px-3 text-gray-600 dark:text-gray-200 relative transition-all duration-300
                  data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100
                  data-[state=active]:after:content-[''] data-[state=active]:after:absolute
                  data-[state=active]:after:-bottom-1 data-[state=active]:after:left-1/2 
                  data-[state=active]:after:-translate-x-1/2 data-[state=active]:after:w-[80%] 
                  data-[state=active]:after:h-[3px] data-[state=active]:after:rounded-full 
                  data-[state=active]:after:bg-gray-900 dark:data-[state=active]:after:bg-gray-100"
              >
                <CreditCard className="h-4 w-4" />
                <span>Contábil</span>
              </TabsTrigger>

              <TabsTrigger
                value="dados-financeiros"
                className="flex items-center gap-2 text-xs font-medium py-2 px-3 text-gray-600 dark:text-gray-200 relative transition-all duration-300
                  data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100
                  data-[state=active]:after:content-[''] data-[state=active]:after:absolute
                  data-[state=active]:after:-bottom-1 data-[state=active]:after:left-1/2 
                  data-[state=active]:after:-translate-x-1/2 data-[state=active]:after:w-[80%] 
                  data-[state=active]:after:h-[3px] data-[state=active]:after:rounded-full 
                  data-[state=active]:after:bg-gray-900 dark:data-[state=active]:after:bg-gray-100"
              >
                <DollarSign className="h-4 w-4" />
                <span>Financeiros</span>
              </TabsTrigger>

              <TabsTrigger
                value="pagamento"
                className="flex items-center gap-2 text-xs font-medium py-2 px-3 text-gray-600 dark:text-gray-200 relative transition-all duration-300
                  data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100
                  data-[state=active]:after:content-[''] data-[state=active]:after:absolute
                  data-[state=active]:after:-bottom-1 data-[state=active]:after:left-1/2 
                  data-[state=active]:after:-translate-x-1/2 data-[state=active]:after:w-[80%] 
                  data-[state=active]:after:h-[3px] data-[state=active]:after:rounded-full 
                  data-[state=active]:after:bg-gray-900 dark:data-[state=active]:after:bg-gray-100"
              >
                <FileText className="h-4 w-4" />
                <span>Pagamento</span>
              </TabsTrigger>

              <TabsTrigger
                value="notas"
                className="flex items-center gap-2 text-xs font-medium py-2 px-3 text-gray-600 dark:text-gray-200 relative transition-all duration-300
                  data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100
                  data-[state=active]:after:content-[''] data-[state=active]:after:absolute
                  data-[state=active]:after:-bottom-1 data-[state=active]:after:left-1/2 
                  data-[state=active]:after:-translate-x-1/2 data-[state=active]:after:w-[80%] 
                  data-[state=active]:after:h-[3px] data-[state=active]:after:rounded-full 
                  data-[state=active]:after:bg-gray-900 dark:data-[state=active]:after:bg-gray-100"
              >
                <Upload className="h-4 w-4" />
                <span>Notas</span>
              </TabsTrigger>
            </TabsList>

            {/* Animated content window */}
            <div className="relative min-h-[450px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeTab}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -30 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-full"
                >
                  {/* Dados Gerais */}
                  {activeTab === "dados-gerais" && (
                    <TabsContent value="dados-gerais" forceMount>
                      <Card className="border-transparent shadow-none bg-transparent">
                        <CardContent className="p-0 text-gray-900 dark:text-gray-200">
                          {/* Grid 4 colunas para os campos principais */}
                          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-4 mb-4">
                            {/* Linha 1 */}
                            <div className="space-y-2">
                              <Label className={textLabel}>Conta</Label>
                              {renderField(accountId || "000070", false)}
                            </div>

                            <div className="space-y-2">
                              <Label className={textLabel}>Lançamento</Label>
                              {renderField("05/11/2025 11:23:16")}
                            </div>

                            <div className="space-y-2">
                              <Label className={textLabel}>Quitação</Label>
                              {renderSelect("Indefinido", [
                                { value: "Indefinido", label: "Indefinido" },
                                { value: "Quitado", label: "Quitado" },
                                { value: "Parcial", label: "Parcial" },
                              ])}
                            </div>

                            <div className="space-y-2">
                              <Label className={textLabel}>
                                Status (#180516)
                              </Label>
                              {renderSelect("Pendente", [
                                { value: "Pendente", label: "Pendente" },
                                { value: "Pago", label: "Pago" },
                                { value: "Vencido", label: "Vencido" },
                                { value: "Cancelado", label: "Cancelado" },
                              ])}
                            </div>

                            {/* Linha 2 */}
                            <div className="space-y-2">
                              <Label className={textLabel}>
                                Documento/Contrato
                              </Label>
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

                          {/* Credor e Devedor */}
                          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 mb-4">
                            <div className="space-y-2">
                              <Label className={textLabel}>
                                Credor (#180515)
                              </Label>
                              {renderField("Injetec")}
                            </div>
                            <div className="space-y-2">
                              <Label className={textLabel}>
                                Devedor (#1204)
                              </Label>
                              {renderField("Amorim Cortinas")}
                            </div>
                          </div>

                          {/* Palavras-chave */}
                          <KeywordPicker
                            keywords={keywords}
                            setKeywords={setKeywords}
                            isEditing={isEditing}
                            textLabel={textLabel}
                            inputSmall={inputSmall}
                            baseBoxSmall={baseBoxSmall}
                          />
                        </CardContent>
                      </Card>
                    </TabsContent>
                  )}

                  {/* Contábil */}
                  {activeTab === "contabil" && (
                    <TabsContent value="contabil" forceMount>
                      <Card className="border-transparent shadow-none bg-transparent">
                        <CardContent className="p-0 text-gray-900 dark:text-gray-200">
                          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
                            <div className="space-y-2">
                              <Label className={textLabel}>
                                Classificação Contábil (#180525)
                              </Label>
                              {renderField("111.01.001 - Caixa Fundo Fixo")}
                            </div>

                            <div className="space-y-2">
                              <Label className={textLabel}>
                                Classificação Gerencial (#180518)
                              </Label>
                              {renderField("Administrativo")}
                            </div>

                            <div className="space-y-2">
                              <Label className={textLabel}>
                                Centro de Custo (#1341)
                              </Label>
                              {renderField("Administrativo")}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  )}

                  {/* Dados Financeiros */}
                  {activeTab === "dados-financeiros" && (
                    <TabsContent value="dados-financeiros" forceMount>
                      <Card className="border-transparent shadow-none bg-transparent">
                        <CardContent className="p-0 text-gray-900 dark:text-gray-200 pb-6">
                          {/* Primeira seção */}
                          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 mb-4">
                            {/* Competência */}
                            <div className="space-y-2">
                              <Label className={textLabel}>Competência</Label>
                              {isEditing ? (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="h-7 w-full justify-start px-2 text-xs text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-white/20"
                                      aria-label="Selecionar data de competência"
                                    >
                                      <CalendarIcon className="mr-2 h-3 w-3" />
                                      {formatDate(competencia)}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={competencia}
                                      onSelect={setCompetencia}
                                      locale={ptBR}
                                      className="bg-white dark:bg-[#0a0a0a] border-0"
                                    />
                                  </PopoverContent>
                                </Popover>
                              ) : (
                                <div className="h-7 px-2 flex items-center rounded-md border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-200 text-sm">
                                  {formatDate(competencia)}
                                </div>
                              )}
                            </div>

                            {/* Vencimento */}
                            <div className="space-y-2">
                              <Label className={textLabel}>Vencimento</Label>
                              {isEditing ? (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="h-7 w-full justify-start px-2 text-xs text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-white/20"
                                      aria-label="Selecionar data de vencimento"
                                    >
                                      <CalendarIcon className="mr-2 h-3 w-3" />
                                      {formatDate(vencimento)}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={vencimento}
                                      onSelect={setVencimento}
                                      locale={ptBR}
                                      className="bg-white dark:bg-[#0a0a0a] border-0"
                                    />
                                  </PopoverContent>
                                </Popover>
                              ) : (
                                <div className="h-7 px-2 flex items-center rounded-md border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-200 text-sm">
                                  {formatDate(vencimento)}
                                </div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label className={textLabel}>
                                Vencimento Alterado
                              </Label>
                              {renderField("Indefinido")}
                            </div>

                            <div className="space-y-2">
                              <Label className={textLabel}>Nº da Parcela</Label>
                              {renderField("2")}
                            </div>

                            <div className="space-y-2">
                              <Label className={textLabel}>
                                Qtd. Total de Parcelas
                              </Label>
                              {renderField("12")}
                            </div>

                            <div className="space-y-2">
                              <Label className={textLabel}>Previsão</Label>
                              {renderSelect("Não", [
                                { value: "Sim", label: "Sim" },
                                { value: "Não", label: "Não" },
                              ])}
                            </div>

                            <div className="space-y-2">
                              <Label className={textLabel}>Transação</Label>
                              {renderField("Indefinido")}
                            </div>
                          </div>

                          {/* Totais*/}
                          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-4 mb-4">
                            <div className="space-y-2">
                              <Label className={textLabel}>Valor</Label>
                              {renderField("R$ 100,00")}
                            </div>

                            <div className="space-y-2">
                              <Label className={textLabel}>Desconto (-)</Label>
                              {renderField("R$ 0,00")}
                            </div>

                            <div className="space-y-2">
                              <Label className={textLabel}>Juros (+)</Label>
                              {renderField("R$ 0,00")}
                            </div>

                            <div className="space-y-2">
                              <Label className={textLabel}>Total</Label>
                              {renderField("R$ 100,00")}
                            </div>
                          </div>

                          {/* Valor Pago e Saldo */}
                          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 mb-8">
                            <div className="space-y-2">
                              <Label className={textLabel}>Valor Pago</Label>
                              {renderField("R$ 0,00")}
                            </div>

                            <div className="space-y-2">
                              <Label className={textLabel}>Saldo</Label>
                              <div className="h-7 px-2 flex items-center rounded-md bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm font-medium">
                                -R$ 100,00
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  )}

                  {/* Pagamento */}
                  {activeTab === "pagamento" && (
                    <TabsContent value="pagamento" forceMount>
                      <Card className="border-transparent shadow-none bg-transparent">
                        <CardContent className="p-0 text-gray-900 dark:text-gray-200">
                          <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <div className="text-xs text-gray-600 dark:text-gray-200">
                                29/02/2012 - 17/07/2039
                              </div>
                              <div className="flex gap-2">
                                <Input
                                  placeholder="Buscar"
                                  className={inputSmall}
                                />

                                <Button
                                  size="sm"
                                  onClick={onOpenPaymentModal}
                                  className="h-8 text-xs"
                                  disabled={!isEditing}
                                >
                                  <Plus className="h-3 w-3" />
                                  Adicionar Pagamento
                                </Button>
                              </div>
                            </div>

                            <div className="border border-gray-200 dark:border-[#1f1f1f] rounded-md text-xs bg-transparent">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr className="border-b border-gray-200 dark:border-[#1f1f1f] bg-gray-50 dark:bg-[#161616]">
                                    <th className="text-left py-1.5 px-2 font-medium text-gray-700 dark:text-gray-200">
                                      ID
                                    </th>
                                    <th className="text-left py-1.5 px-2 font-medium text-gray-700 dark:text-gray-200">
                                      Cheque N°
                                    </th>
                                    <th className="text-left py-1.5 px-2 font-medium text-gray-700 dark:text-gray-200">
                                      Caixa
                                    </th>
                                    <th className="text-left py-1.5 px-2 font-medium text-gray-700 dark:text-gray-200">
                                      Classificação
                                    </th>
                                    <th className="text-left py-1.5 px-2 font-medium text-gray-700 dark:text-gray-200">
                                      Tipo
                                    </th>
                                    <th className="text-right py-1.5 px-2 font-medium text-gray-700 dark:text-gray-200">
                                      Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td
                                      colSpan={6}
                                      className="py-4 text-center text-gray-600 dark:text-gray-200"
                                    >
                                      <div className="flex flex-col items-center gap-1">
                                        <AlertCircle className="h-4 w-4 text-gray-600 dark:text-gray-200" />
                                        <div className="text-xs text-gray-600 dark:text-gray-200">
                                          {!isEditing
                                            ? "Edite a conta para adicionar pagamentos"
                                            : "Nenhum registro"}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <div className="text-right text-xs text-gray-600 dark:text-gray-200">
                              Total <span className="font-medium">R$ 0,00</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  )}

                  {/* Notas */}
                  {activeTab === "notas" && (
                    <TabsContent value="notas" forceMount>
                      <Card className="border-transparent shadow-none bg-transparent">
                        <CardContent className="p-0 text-gray-900 dark:text-gray-200">
                          <div className="space-y-3">
                            <div className="border-2 border-dashed rounded-md p-6 text-center border-gray-300 dark:border-[#1f1f1f] bg-gray-50 dark:bg-[#161616]">
                              <Upload className="h-6 w-6 mx-auto text-gray-600 dark:text-gray-200 mb-1" />
                              <p className="text-xs text-gray-600 dark:text-gray-200">
                                Clique aqui para inserir anexos
                              </p>
                            </div>

                            <div className="space-y-1">
                              <Label className="text-xs text-gray-600 dark:text-gray-200">
                                Notas
                              </Label>
                              <textarea
                                className="w-full min-h-[120px] p-3 border rounded-md resize-none text-sm
                                           border-gray-300 dark:border-[#1f1f1f]
                                           bg-white dark:bg-[#161616] text-gray-900 dark:text-gray-200
                                           placeholder:text-gray-500"
                                placeholder="Adicione suas notas aqui..."
                                readOnly={!isEditing}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-gray-200 dark:border-[#1f1f1f] bg-white dark:bg-[#0a0a0a]">
          <DialogClose asChild>
            <Button variant="ghost" className="h-8 text-xs">
              {isEditing ? "Cancelar" : "Fechar"}
            </Button>
          </DialogClose>
          {isEditing && (
            <Button className="h-8 text-xs bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200" onClick={handleSave}>
              Salvar
            </Button>
          )}
          {!isEditing && (
            <Button className="h-8 text-xs bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Atualizar
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}