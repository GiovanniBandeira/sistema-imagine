'use client';
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Search, ChevronDown, FileText } from 'lucide-react';

const orcamentosData = [
  { id: '#OR-2024-158', cliente: 'João Silva', data: '10/05/2024', valor: 'R$ 1.250,00', status: 'Aprovado', statusColor: 'text-green-500 bg-green-500/10 border-green-500/20' },
  { id: '#OR-2024-157', cliente: 'Maria Santos', data: '09/05/2024', valor: 'R$ 980,50', status: 'Enviado', statusColor: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' },
  { id: '#OR-2024-156', cliente: 'Pedro Almeida', data: '08/05/2024', valor: 'R$ 2.350,00', status: 'Rascunho', statusColor: 'text-brand bg-brand/10 border-brand/20' },
  { id: '#OR-2024-155', cliente: 'Ana Costa', data: '07/05/2024', valor: 'R$ 450,00', status: 'Expirado', statusColor: 'text-red-500 bg-red-500/10 border-red-500/20' },
  { id: '#OR-2024-154', cliente: 'Lucas Martins', data: '06/05/2024', valor: 'R$ 1.780,00', status: 'Aprovado', statusColor: 'text-green-500 bg-green-500/10 border-green-500/20' },
];

export default function OrcamentosPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-5xl">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-border flex items-center justify-center">
              <FileText size={20} className="text-gray-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Orçamentos</h2>
          </div>
          <button className="bg-brand hover:bg-brandHover text-[#0f1015] font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
            Novo Orçamento
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Buscar orçamento..." 
              className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand"
            />
          </div>
          <div className="relative w-48">
            <select className="w-full bg-card border border-border rounded-lg pl-4 pr-10 py-2.5 text-sm text-gray-300 appearance-none focus:outline-none focus:border-brand">
              <option>Todos os status</option>
              <option>Aprovado</option>
              <option>Enviado</option>
              <option>Rascunho</option>
              <option>Expirado</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Table Area */}
        <div className="bg-card border border-border rounded-xl flex flex-col">
          <div className="grid grid-cols-5 px-6 py-4 border-b border-border text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div>Número</div>
            <div>Cliente</div>
            <div>Data</div>
            <div>Valor</div>
            <div className="text-right">Status</div>
          </div>
          
          <div className="flex flex-col">
            {orcamentosData.map((orcamento, i) => (
              <div key={i} className="grid grid-cols-5 px-6 py-4 border-b border-border/50 items-center hover:bg-white/5 transition-colors cursor-pointer">
                <div className="text-sm font-medium text-gray-200">{orcamento.id}</div>
                <div className="text-sm text-gray-400">{orcamento.cliente}</div>
                <div className="text-sm text-gray-400">{orcamento.data}</div>
                <div className="text-sm font-medium text-gray-300">{orcamento.valor}</div>
                <div className="flex justify-end">
                  <span className={`px-3 py-1 rounded text-xs font-medium border ${orcamento.statusColor}`}>
                    {orcamento.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="py-4 text-center">
            <span className="text-sm text-gray-500 hover:text-white cursor-pointer transition-colors">Ver todos</span>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
