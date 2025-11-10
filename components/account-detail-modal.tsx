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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  AlertCircle,
  FileText,
  X,
  Plus,
  Users,
  DollarSign,
  Upload,
} from "lucide-react";

interface AccountDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountId?: string | null;
}

export default function AccountDetailsModal({
  open,
  onOpenChange,
  accountId,
}: AccountDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("dados-gerais");
  const [keywords, setKeywords] = useState(["fornecedor", "cortinas", "prioridade"]);
  const [newKeyword, setNewKeyword] = useState("");

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-card border border-gray-200 dark:border-neutral-800 rounded-lg p-0 shadow-lg">
        {/* Header mais compacto */}
        <DialogHeader className="px-6 py-3 border-b border-gray-100 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <DialogTitle className="text-base font-semibold">
                Conta a Pagar - {accountId || "000070"}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        {/* Tabs responsivos */}
        <div className="px-6 pt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tabs scrolláveis para mobile, grid para desktop */}
            <TabsList className="flex sm:grid sm:grid-cols-6 w-full mb-4 h-12 overflow-x-auto scrollbar-hide gap-1 sm:gap-0">
              <TabsTrigger 
                value="dados-gerais" 
                className="flex items-center gap-2 text-xs py-2 px-3 min-w-[140px] sm:min-w-0 flex-shrink-0 sm:flex-shrink"
              >
                <AlertCircle className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">Dados Gerais</span>
              </TabsTrigger>
              <TabsTrigger 
                value="participantes" 
                className="flex items-center gap-2 text-xs py-2 px-3 min-w-[140px] sm:min-w-0 flex-shrink-0 sm:flex-shrink"
              >
                <Users className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">Participantes</span>
              </TabsTrigger>
              <TabsTrigger 
                value="contabil" 
                className="flex items-center gap-2 text-xs py-2 px-3 min-w-[140px] sm:min-w-0 flex-shrink-0 sm:flex-shrink"
              >
                <CreditCard className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">Contábil</span>
              </TabsTrigger>
              <TabsTrigger 
                value="dados-financeiros" 
                className="flex items-center gap-2 text-xs py-2 px-3 min-w-[140px] sm:min-w-0 flex-shrink-0 sm:flex-shrink"
              >
                <DollarSign className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">Financeiros</span>
              </TabsTrigger>
              <TabsTrigger 
                value="pagamento" 
                className="flex items-center gap-2 text-xs py-2 px-3 min-w-[140px] sm:min-w-0 flex-shrink-0 sm:flex-shrink"
              >
                <FileText className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">Pagamento</span>
              </TabsTrigger>
              <TabsTrigger 
                value="arquivos" 
                className="flex items-center gap-2 text-xs py-2 px-3 min-w-[140px] sm:min-w-0 flex-shrink-0 sm:flex-shrink"
              >
                <Upload className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">Arquivos</span>
              </TabsTrigger>
            </TabsList>

            {/* Conteúdo dos tabs - Container único para mobile */}
            <TabsContent value="dados-gerais" className="animate-in fade-in-50 duration-200">
              <Card className="border-transparent shadow-none">
                <CardContent className="p-0">
                  {/* Container único para mobile, grid para desktop */}
                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Conta</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        000070
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Lançamento</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        05/11/2025 11:23:16
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Quitação</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        Indefinido
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Status (#180516)</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        Pendente
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Documento/Contrato</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        Indefinido
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Fatura</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        Indefinido
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Conta/Grupo</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        9
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Referência</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        -
                      </div>
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-3 w-3 ml-0.5 p-0 hover:bg-blue-200 dark:hover:bg-blue-800"
                            onClick={() => removeKeyword(keyword)}
                          >
                            <X className="h-2 w-2" />
                          </Button>
                        </div>
                      ))}
                    </div>

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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Participantes */}
            <TabsContent value="participantes" className="animate-in fade-in-50 duration-200">
              <Card className="border-transparent shadow-none">
                <CardContent className="p-0">
                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Credor (#180515)</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        Injetec
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Devedor (#1204)</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        Amorim Cortinas
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contábil */}
            <TabsContent value="contabil" className="animate-in fade-in-50 duration-200">
              <Card className="border-transparent shadow-none">
                <CardContent className="p-0">
                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Classificação Contábil (#180525)</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        111.01.001 - Caixa Fundo Fixo
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Classificação Gerencial (#180518)</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        Administrativo
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Centro de Custo (#1341)</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        Administrativo
                      </div>
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
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        31/12/2025
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Vencimento</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        05/11/2025
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Vencimento Alterado</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        Indefinido
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Nº da Parcela</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        2
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Qtd. Total de Parcelas</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        12
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Previsão</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        Não
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Transação</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        Indefinido
                      </div>
                    </div>
                  </div>

                  {/* Totais*/}
                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Valor</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm font-medium">
                        R$ 100,00
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Desconto (-)</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        R$ 0,00
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Juros (+)</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        R$ 0,00
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Total</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm font-medium">
                        R$ 100,00
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Valor Pago</Label>
                      <div className="h-7 px-2 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm">
                        R$ 0,00
                      </div>
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
                      <Input 
                        placeholder="Buscar" 
                        className="h-7 text-xs"
                      />
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
                                <div className="text-xs">Nenhum registro</div>
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

            {/* Arquivos */}
            <TabsContent value="arquivos" className="animate-in fade-in-50 duration-200">
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
                        className="w-full min-h-[80px] p-2 border rounded-md resize-none text-xs
                                   border-gray-200 dark:border-neutral-700
                                   bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100
                                   placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        placeholder="Adicione suas notas aqui..."
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
              Fechar
            </Button>
          </DialogClose>
          <Button className="h-7 text-xs">Atualizar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}