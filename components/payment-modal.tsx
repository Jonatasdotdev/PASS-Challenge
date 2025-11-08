"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, AlertCircle, FileText, ChevronUp, ChevronDown, X, Info } from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PaymentModal({ open, onOpenChange }: PaymentModalProps) {
  const [dadosGeraisOpen, setDadosGeraisOpen] = useState(true);
  const [notasOpen, setNotasOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-gray-600" />
              <DialogTitle className="text-xl font-semibold">Pagamento</DialogTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Dados Gerais Section */}
          <Collapsible open={dadosGeraisOpen} onOpenChange={setDadosGeraisOpen}>
            <Card>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="flex flex-row items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-gray-600" />
                    <CardTitle className="text-base font-semibold">Dados Gerais</CardTitle>
                  </div>
                  {dadosGeraisOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  )}
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dataMovimento">Data do Movimento</Label>
                      <Input id="dataMovimento" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="caixaConta">Caixa/Conta (#180511)</Label>
                      <Select>
                        <SelectTrigger id="caixaConta">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Opção 1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="formaPagamento">Forma de Pagamento (#180506)</Label>
                      <Select>
                        <SelectTrigger id="formaPagamento">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Opção 1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Saldo a Pagar</Label>
                      <div className="h-10 px-3 py-2 bg-gray-100 rounded-md flex items-center text-gray-700">
                        -R$ 100,00
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="valor">Valor</Label>
                      <Input id="valor" type="text" placeholder="0,00" />
                    </div>
                    <div className="space-y-2">
                      <Label>Classificação Gerencial (#180518)</Label>
                      <div className="h-10 px-3 py-2 rounded-md flex items-center text-gray-700">
                        1.1.1.01.001 - Caixa Fundo Fixo
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Notas Section */}
          <Collapsible open={notasOpen} onOpenChange={setNotasOpen}>
            <Card>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="flex flex-row items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-600" />
                    <CardTitle className="text-base font-semibold">Notas</CardTitle>
                  </div>
                  {notasOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  )}
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <textarea
                    className="w-full min-h-[100px] p-3 border rounded-md resize-none"
                    placeholder="Adicione suas notas aqui..."
                  />
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Fechar
          </Button>
          <Button>
            Cadastrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

