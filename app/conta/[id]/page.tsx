"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle, ShoppingBag, Grid3x3, X, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { ChevronUp, ChevronDown } from "lucide-react";
import FinancialDataView from "@/components/financial-data-view";
import PaymentModal from "@/components/payment-modal";

interface PageProps {
  params: {
    id: string;
  };
}

export default function AccountDetailPage({ params }: PageProps) {
  const [dadosGeraisOpen, setDadosGeraisOpen] = useState(true);
  const [participantesOpen, setParticipantesOpen] = useState(true);
  const [contabilOpen, setContabilOpen] = useState(true);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-lg font-semibold">+</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Conta a Pagar - {params.id}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <AlertCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        <div className="space-y-6">
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
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Conta</Label>
                      <div className="text-2xl font-bold text-gray-900">{params.id}</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Lançamento</Label>
                      <div className="text-gray-700">05/11/2025 11:23:16</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Quitação</Label>
                      <div className="text-gray-700">Indefinido</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Status (#180516)</Label>
                      <Badge variant="secondary">Pendente</Badge>
                    </div>
                    <div className="space-y-2">
                      <Label>Documento/Contrato</Label>
                      <div className="text-gray-700">Indefinido</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Fatura</Label>
                      <div className="text-gray-700">Indefinido</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Conta/Grupo</Label>
                      <div className="text-gray-700">9</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Referência</Label>
                      <Input placeholder="" />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label>Palavra-chave</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Input placeholder="" />
                        <Input placeholder="" />
                        <Input placeholder="" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Participantes Section */}
          <Collapsible open={participantesOpen} onOpenChange={setParticipantesOpen}>
            <Card>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="flex flex-row items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-gray-600" />
                    <CardTitle className="text-base font-semibold">Participantes</CardTitle>
                  </div>
                  {participantesOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  )}
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Credor</Label>
                      <Select defaultValue="injetec">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="injetec">Injetec</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Devedor</Label>
                      <Select defaultValue="amorim">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="amorim">Amorim Cortinas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Contábil Section */}
          <Collapsible open={contabilOpen} onOpenChange={setContabilOpen}>
            <Card>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="flex flex-row items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <Grid3x3 className="h-4 w-4 text-gray-600" />
                    <CardTitle className="text-base font-semibold">Contábil</CardTitle>
                  </div>
                  {contabilOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  )}
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Classificação Contábil</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Opção 1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Classificação Gerencial</Label>
                      <Select defaultValue="caixa">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="caixa">1.1.1.01.001 - Caixa Fundo Fixo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Centro de Custo</Label>
                      <Select defaultValue="admin">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Financial Data View */}
          <FinancialDataView onPaymentClick={() => setPaymentModalOpen(true)} />
        </div>
      </main>

      {/* Payment Modal */}
      <PaymentModal open={paymentModalOpen} onOpenChange={setPaymentModalOpen} />
    </div>
  );
}

