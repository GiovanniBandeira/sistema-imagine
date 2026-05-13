'use client';
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ChevronRight, FileText, Settings, Users, Box, BadgeDollarSign } from 'lucide-react';

const reportsData = [
  { id: 1, title: 'Faturamento', desc: 'Análise detalhada do faturamento.', icon: FileText },
  { id: 2, title: 'Produção', desc: 'Relatório de produção e eficiência.', icon: Settings },
  { id: 3, title: 'Clientes', desc: 'Análise de clientes e pedidos.', icon: Users },
  { id: 4, title: 'Estoque', desc: 'Relatório de estoque e consumo.', icon: Box },
  { id: 5, title: 'Financeiro', desc: 'Fluxo de caixa e resultado.', icon: BadgeDollarSign },
];

export default function RelatoriosPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-3xl">
        
        {/* Header Bar */}
        <div className="flex items-center gap-3 bg-card border border-border p-4 rounded-xl">
          <h2 className="text-lg font-semibold text-white">Relatórios</h2>
        </div>

        {/* List Area */}
        <div className="flex flex-col gap-4">
          {reportsData.map((report) => (
            <div key={report.id} className="bg-card border border-border rounded-xl p-5 flex items-center justify-between hover:border-brand/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
                  <report.icon size={24} className="text-brand group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-base font-semibold text-white">{report.title}</span>
                  <span className="text-sm text-gray-400">{report.desc}</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-500 group-hover:text-brand transition-colors" />
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}
