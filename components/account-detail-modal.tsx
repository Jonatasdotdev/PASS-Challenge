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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  AlertCircle,
  FileText,
  X,
  Plus,
  DollarSign,
  Upload,
  Edit,
} from "lucide-react";

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
  const [keywords, setKeywords] = useState(["fornecedor", "cortinas", "prioridade"]);
  const [newKeyword, setNewKeyword] = useState("");
  const [isEditing, setIsEditing] = useState(!accountId); // Modo edição se for nova conta

  // Determina se é uma nova conta ou visualização/edição de conta existente
  const isNewAccount = !accountId;

  // Resetar estado quando modal abrir
  useEffect(() => {
    if (open) {
      setIsEditing(isNewAccount);
    }
  }, [open, isNewAccount]);

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter(keyword => keyword !== keywordToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  const handleSave = () => {
    
    if (isNewAccount) {
      console.log("Cadastrando nova conta...");
      
      onOpenChange(false);
    } else {
      console.log("Atualizando conta existente...");
      setIsEditing(false); 
    }
  };

  // renderizar campos baseado no modo
  const renderField = (value: string, isEditable: boolean = true) => {
    if (isEditing && isEditable) {
      return (
        <Input 
          defaultValue={value} 
          className="h-7 text-xs"
        />
      );
    }
    return (
      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
        {value}
      </div>
    );
  };

  const renderSelect = (value: string, options: {value: string, label: string}[], isEditable: boolean = true) => {
    if (isEditing && isEditable) {
      return (
        <Select defaultValue={value}>
          <SelectTrigger className="h-7 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    return (
      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
        {options.find(opt => opt.value === value)?.label || value}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-card border border-gray-200 dark:border-neutral-800 rounded-lg p-0 shadow-lg">
        {/* Header*/}
            <DialogHeader className="px-6 py-3 border-b border-gray-100 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  <DialogTitle className="text-base font-semibold">
                    {isNewAccount ? "Nova Conta a Pagar" : `Conta a Pagar - ${accountId}`}
                  </DialogTitle>
                  {!isNewAccount && !isEditing && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs gap-1"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-3 w-3" />
                      Editar
                    </Button>
                  )}
                </div>
              </div>
            </DialogHeader>

        {/* Tabs*/}
        <div className="px-6 pt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tabs reorganizadas */}
            <TabsList className="flex sm:grid sm:grid-cols-5 w-full mb-4 h-12 overflow-x-auto scrollbar-hide gap-1 sm:gap-0">
              <TabsTrigger value="dados-gerais" className="flex items-center gap-2 text-xs py-2 px-3">
                <AlertCircle className="h-3 w-3" />
                <span>Dados Gerais</span>
              </TabsTrigger>
              <TabsTrigger value="contabil" className="flex items-center gap-2 text-xs py-2 px-3">
                <CreditCard className="h-3 w-3" />
                <span>Contábil</span>
              </TabsTrigger>
              <TabsTrigger value="dados-financeiros" className="flex items-center gap-2 text-xs py-2 px-3">
                <DollarSign className="h-3 w-3" />
                <span>Financeiros</span>
              </TabsTrigger>
              <TabsTrigger value="pagamento" className="flex items-center gap-2 text-xs py-2 px-3">
                <FileText className="h-3 w-3" />
                <span>Pagamento</span>
              </TabsTrigger>
              <TabsTrigger value="notas" className="flex items-center gap-2 text-xs py-2 px-3">
                <Upload className="h-3 w-3" />
                <span>Notas</span>
              </TabsTrigger>
            </TabsList>

            {/* Dados Gerais*/}
            <TabsContent value="dados-gerais" className="animate-in fade-in-50 duration-200">
              <Card className="border-transparent shadow-none">
                <CardContent className="p-0">
                  {/* Grid 4 colunas para os campos principais */}
                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-4 mb-4">
                    {/* Linha 1 */}
                    <div className="space-y-2">
                      <Label className="text-xs">Conta</Label>
                      {renderField(accountId || "000070", false)} {/* Não editável */}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Lançamento</Label>
                      {renderField("05/11/2025 11:23:16")}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Quitação</Label>
                      {renderSelect("Indefinido", [
                        { value: "Indefinido", label: "Indefinido" },
                        { value: "Quitado", label: "Quitado" },
                        { value: "Parcial", label: "Parcial" }
                      ])}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Status (#180516)</Label>
                      {renderSelect("Pendente", [
                        { value: "Pendente", label: "Pendente" },
                        { value: "Pago", label: "Pago" },
                        { value: "Vencido", label: "Vencido" },
                        { value: "Cancelado", label: "Cancelado" }
                      ])}
                    </div>

                    {/* Linha 2 */}
                    <div className="space-y-2">
                      <Label className="text-xs">Documento/Contrato</Label>
                      {renderField("Indefinido")}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Fatura</Label>
                      {renderField("Indefinido")}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Conta/Grupo</Label>
                      {renderField("9")}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Referência</Label>
                      {renderField("-")}
                    </div>
                  </div>

                  {/* Credor e Devedor */}
                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Credor (#180515)</Label>
                      {renderField("Injetec")}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Devedor (#1204)</Label>
                      {renderField("Amorim Cortinas")}
                    </div>
                  </div>

                  {/* Palavras-chave */}
                  <div className="mt-4 space-y-2">
                    <Label className="text-xs text-gray-600 dark:text-gray-400">Palavra-chave</Label>
                    
                    <div className="flex flex-wrap gap-1 mb-1">
                      {keywords.map((keyword) => (
                        <div
                          key={keyword}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full 
                                     bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 
                                     text-xs border border-blue-200 dark:border-blue-700"
                        >
                          <span>{keyword}</span>
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-3 w-3 ml-0.5 p-0 hover:bg-blue-200 dark:hover:bg-blue-800"
                              onClick={() => removeKeyword(keyword)}
                            >
                              <X className="h-2 w-2" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          value={newKeyword}
                          onChange={(e) => setNewKeyword(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Digite uma palavra-chave"
                          className="flex-1 h-7 text-xs"
                        />
                        <Button 
                          onClick={addKeyword} 
                          size="sm" 
                          className="h-7 gap-1 text-xs"
                          disabled={!newKeyword.trim()}
                        >
                          <Plus className="h-3 w-3" />
                          Adicionar
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contábil  */}
            <TabsContent value="contabil" className="animate-in fade-in-50 duration-200">
              <Card className="border-transparent shadow-none">
                <CardContent className="p-0">
                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Classificação Contábil (#180525)</Label>
                      {renderField("111.01.001 - Caixa Fundo Fixo")}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Classificação Gerencial (#180518)</Label>
                      {renderField("Administrativo")}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Centro de Custo (#1341)</Label>
                      {renderField("Administrativo")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dados Financeiros */}
            <TabsContent value="dados-financeiros" className="animate-in fade-in-50 duration-200">
              <Card className="border-transparent shadow-none">
                <CardContent className="p-0">
                  {/* Primeira seção */}
                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Competência</Label>
                      {renderField("31/12/2025")}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Vencimento</Label>
                      {renderField("05/11/2025")}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Vencimento Alterado</Label>
                      {renderField("Indefinido")}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Nº da Parcela</Label>
                      {renderField("2")}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Qtd. Total de Parcelas</Label>
                      {renderField("12")}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Previsão</Label>
                      {renderSelect("Não", [
                        { value: "Sim", label: "Sim" },
                        { value: "Não", label: "Não" }
                      ])}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Transação</Label>
                      {renderField("Indefinido")}
                    </div>
                  </div>

                  {/* Totais*/}
                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Valor</Label>
                      {renderField("R$ 100,00")}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Desconto (-)</Label>
                      {renderField("R$ 0,00")}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Juros (+)</Label>
                      {renderField("R$ 0,00")}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Total</Label>
                      {renderField("R$ 100,00")}
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Valor Pago</Label>
                      {renderField("R$ 0,00")}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Saldo</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm font-medium">
                        -R$ 100,00
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pagamento */}
            <TabsContent value="pagamento" className="animate-in fade-in-50 duration-200">
              <Card className="border-transparent shadow-none">
                <CardContent className="p-0">
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        29/02/2012 - 17/07/2039
                      </div>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Buscar" 
                          className="h-7 text-xs"
                        />
                      
                        <Button 
                          size="sm" 
                          onClick={onOpenPaymentModal}
                          className="h-7 text-xs gap-1"
                          disabled={isNewAccount && !isEditing} // Desabilita se for nova conta e não estiver editando
                        >
                          <Plus className="h-3 w-3" />
                          Adicionar Pagamento
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-md text-xs">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b bg-gray-50 dark:bg-neutral-800">
                            <th className="text-left py-1.5 px-2 font-medium">ID</th>
                            <th className="text-left py-1.5 px-2 font-medium">Cheque N°</th>
                            <th className="text-left py-1.5 px-2 font-medium">Caixa</th>
                            <th className="text-left py-1.5 px-2 font-medium">Classificação</th>
                            <th className="text-left py-1.5 px-2 font-medium">Tipo</th>
                            <th className="text-right py-1.5 px-2 font-medium">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={6} className="py-4 text-center text-gray-500 dark:text-gray-400">
                              <div className="flex flex-col items-center gap-1">
                                <AlertCircle className="h-4 w-4" />
                                <div className="text-xs">
                                  {isNewAccount && !isEditing 
                                    ? "Salve a conta primeiro para adicionar pagamentos" 
                                    : "Nenhum registro"
                                  }
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="text-right text-xs">
                      Total <span className="font-medium">R$ 0,00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notas */}
            <TabsContent value="notas" className="animate-in fade-in-50 duration-200">
              <Card className="border-transparent shadow-none">
                <CardContent className="p-0">
                  <div className="space-y-3">
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <Upload className="h-6 w-6 mx-auto text-gray-400 mb-1" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Clique aqui para inserir anexos
                      </p>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs">Notas</Label>
                      <textarea
                        className="w-full min-h-[120px] p-3 border rounded-md resize-none text-sm
                                   border-gray-200 dark:border-neutral-700
                                   bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100
                                   placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        placeholder="Adicione suas notas aqui..."
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer*/}
        <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-gray-100 dark:border-neutral-800">
          <DialogClose asChild>
            <Button variant="ghost" className="h-7 text-xs">
              {isEditing ? "Cancelar" : "Fechar"}
            </Button>
          </DialogClose>
          {isEditing && (
            <Button 
              className="h-7 text-xs" 
              onClick={handleSave}
            >
              {isNewAccount ? "Cadastrar" : "Salvar"}
            </Button>
          )}
          {!isEditing && !isNewAccount && (
            <Button className="h-7 text-xs">Atualizar</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}