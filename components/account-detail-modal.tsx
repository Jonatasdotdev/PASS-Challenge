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
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              <DialogTitle className="text-lg font-semibold">
                Conta a Pagar - {accountId || "000070"}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        {/* Tabs com animação */}
        <div className="px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-6">
              <TabsTrigger value="dados-gerais" className="flex items-center gap-2 text-xs">
                <AlertCircle className="h-3 w-3" />
                Dados Gerais
              </TabsTrigger>
              <TabsTrigger value="participantes" className="flex items-center gap-2 text-xs">
                <Users className="h-3 w-3" />
                Participantes
              </TabsTrigger>
              <TabsTrigger value="contabil" className="flex items-center gap-2 text-xs">
                <CreditCard className="h-3 w-3" />
                Contábil
              </TabsTrigger>
              <TabsTrigger value="dados-financeiros" className="flex items-center gap-2 text-xs">
                <DollarSign className="h-3 w-3" />
                Financeiros
              </TabsTrigger>
              <TabsTrigger value="pagamento" className="flex items-center gap-2 text-xs">
                <FileText className="h-3 w-3" />
                Pagamento
              </TabsTrigger>
              <TabsTrigger value="arquivos" className="flex items-center gap-2 text-xs">
                <Upload className="h-3 w-3" />
                Arquivos
              </TabsTrigger>
            </TabsList>

            {/* Dados Gerais */}
            <TabsContent value="dados-gerais" className="space-y-4 animate-in fade-in-50 duration-200">
              <Card className="border-transparent shadow-none">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Dados Gerais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Conta</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        000070
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Lançamento</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        05/11/2025 11:23:16
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Quitação</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        Indefinido
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Status (#180516)</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        Pendente
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Documento/Contrato</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        Indefinido
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Fatura</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        Indefinido
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Conta/Grupo</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        9
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Referência</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        -
                      </div>
                    </div>
                  </div>

                  {/* Palavras-chave */}
                  <div className="mt-4 space-y-3">
                    <Label className="text-sm text-gray-600 dark:text-gray-400">Palavra-chave</Label>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      {keywords.map((keyword) => (
                        <div
                          key={keyword}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full 
                                     bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 
                                     text-sm border border-blue-200 dark:border-blue-700"
                        >
                          <span>{keyword}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1 p-0 hover:bg-blue-200 dark:hover:bg-blue-800"
                            onClick={() => removeKeyword(keyword)}
                          >
                            <X className="h-3 w-3" />
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
                        className="flex-1 h-8 text-sm"
                      />
                      <Button 
                        onClick={addKeyword} 
                        size="sm" 
                        className="h-8 gap-1"
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
            <TabsContent value="participantes" className="space-y-4 animate-in fade-in-50 duration-200">
              <Card className="border-transparent shadow-none">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Participantes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Credor (#180515)</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        Injetec
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Devedor (#1204)</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        Amorim Cortinas
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contábil */}
            <TabsContent value="contabil" className="space-y-4 animate-in fade-in-50 duration-200">
              <Card className="border-transparent shadow-none">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Contábil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Classificação Contábil (#180525)</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        111.01.001 - Caixa Fundo Fixo
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Classificação Gerencial (#180518)</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        Administrativo
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Centro de Custo (#1341)</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        Administrativo
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dados Financeiros */}
            <TabsContent value="dados-financeiros" className="space-y-4 animate-in fade-in-50 duration-200">
              <Card className="border-transparent shadow-none">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Dados Financeiros
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Competência</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        31/12/2025
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Vencimento</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        05/11/2025
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Vencimento Alterado</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        Indefinido
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Nº da Parcela</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        2
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Qtd. Total de Parcelas</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        12
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Previsão</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        Não
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Transação</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        Indefinido
                      </div>
                    </div>
                  </div>

                  {/* Totais */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Valor</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 font-medium">
                        R$ 100,00
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Desconto (-)</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        R$ 0,00
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Juros (+)</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        R$ 0,00
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Total</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 font-medium">
                        R$ 100,00
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Valor Pago</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200">
                        R$ 0,00
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Saldo</Label>
                      <div className="h-8 px-3 flex items-center rounded-md bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 font-medium">
                        -R$ 100,00
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pagamento */}
            <TabsContent value="pagamento" className="space-y-4 animate-in fade-in-50 duration-200">
              <Card className="border-transparent shadow-none">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        29/02/2012 - 17/07/2039
                      </div>
                      <Input 
                        placeholder="Buscar" 
                        className="h-8 w-48"
                      />
                    </div>

                    <div className="border rounded-md">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-gray-50 dark:bg-neutral-800">
                            <th className="text-left py-2 px-3 font-medium">ID</th>
                            <th className="text-left py-2 px-3 font-medium">Cheque N°</th>
                            <th className="text-left py-2 px-3 font-medium">Caixa</th>
                            <th className="text-left py-2 px-3 font-medium">Classificação</th>
                            <th className="text-left py-2 px-3 font-medium">Tipo</th>
                            <th className="text-right py-2 px-3 font-medium">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={6} className="py-6 text-center text-gray-500 dark:text-gray-400">
                              <div className="flex flex-col items-center gap-2">
                                <AlertCircle className="h-5 w-5" />
                                <div>Nenhum registro</div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="text-right text-sm">
                      Total <span className="font-medium">R$ 0,00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Arquivos */}
            <TabsContent value="arquivos" className="space-y-4 animate-in fade-in-50 duration-200">
              <Card className="border-transparent shadow-none">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Arquivos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Clique aqui para inserir anexos
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Notas</Label>
                      <textarea
                        className="w-full min-h-[100px] p-3 border rounded-md resize-none
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

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-neutral-800">
          <DialogClose asChild>
            <Button variant="ghost" className="h-8">
              Fechar
            </Button>
          </DialogClose>
          <Button className="h-8">Atualizar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}