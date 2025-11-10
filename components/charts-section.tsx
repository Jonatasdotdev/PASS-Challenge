"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3 } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartsSectionProps {
  data: any[];
}

const chartConfig = {
  desktop: {
    label: "Evolução",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Distribuição", 
    color: "hsl(var(--chart-2))",
  }
} as const;

export function ChartsSection({ data }: ChartsSectionProps) {
  // Dados para o Area Chart 
  const processAreaData = (data: any[]) => {
    // Agrupar por mês baseado na competência
    const monthlyData: { [key: string]: number } = {};
    
    data.forEach(item => {
      const competenceDate = item.competencia || item.dueDate || new Date().toLocaleDateString('pt-BR');
      const [day, month, year] = competenceDate.split('/');
      const monthKey = `${month}/${year}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = 0;
      }
      
      const amount = parseFloat(item.total.replace('R$ ', '').replace(',', '.'));
      monthlyData[monthKey] += amount;
    });

    // Ordenar por data e formatar para o gráfico
    const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
      const [monthA, yearA] = a.split('/').map(Number);
      const [monthB, yearB] = b.split('/').map(Number);
      return new Date(yearA, monthA - 1).getTime() - new Date(yearB, monthB - 1).getTime();
    });

    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    return sortedMonths.map((monthKey) => {
      const [month, year] = monthKey.split('/').map(Number);
      return {
        month: `${monthNames[month - 1]}`,
        value: Math.round(monthlyData[monthKey]),
        fullDate: monthKey
      };
    });
  };

  const areaData = processAreaData(data);

  // Dados para o Bar Chart - Distribuição por status
  const barData = data.reduce((acc: any[], item) => {
    const existing = acc.find(d => d.status === item.status);
    if (existing) {
      existing.total += 1;
    } else {
      acc.push({ status: item.status, total: 1 });
    }
    return acc;
  }, []);

  if (data.length === 0) {
    return null;
  }

  // Customizar o tooltip com cores diferentes para dark/light mode
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{`${label}`}</p>
          <p className="text-sm text-muted-foreground">
            {`Valor: R$ ${payload[0].value.toLocaleString('pt-BR')}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const BarCustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{`${label}`}</p>
          <p className="text-sm text-muted-foreground">
            {`Quantidade: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Area Chart  */}
      <Card className="border border-gray-200 dark:border-neutral-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-medium">Evolução por Competência</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-[200px]"> 
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={areaData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} className="opacity-30" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  tickMargin={8}
                  tickFormatter={(value) => `R$ ${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  dataKey="value"
                  type="natural"
                  fill={chartConfig.desktop.color}
                  fillOpacity={0.4}
                  stroke={chartConfig.desktop.color}
                  stackId="a"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card className="border border-gray-200 dark:border-neutral-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-medium">Contas por Status</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-[200px]"> 
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid horizontal={false} className="opacity-30" />
                <XAxis 
                  type="number" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  dataKey="status" 
                  type="category" 
                  fontSize={11}
                  tickLine={false} 
                  axisLine={false}
                  width={80}
                />
                <Tooltip 
                  content={<BarCustomTooltip />}
                  cursor={{
                    fill: 'rgba(0, 0, 0, 0.1)',
                    className: 'dark:fill-neutral-800 dark:opacity-50'
                  }}
                />
                <Bar 
                  dataKey="total" 
                  fill={chartConfig.mobile.color}
                  radius={[0, 4, 4, 0]}
                  className="transition-opacity duration-200 hover:opacity-80"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}