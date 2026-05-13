'use client';
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Search, ChevronDown } from 'lucide-react';

const estoqueData = [
  { item: 'Resina Padrão Cinza', tipo: 'Resina', estoque: '2,50', unidade: 'Kg', status: 'Normal', statusColor: 'text-green-500 bg-green-500/10 border-green-500/20' },
  { item: 'Resina ABS Like', tipo: 'Resina', estoque: '1,20', unidade: 'Kg', status: 'Baixo', statusColor: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' },
  { item: 'Resina Flexível', tipo: 'Resina', estoque: '0,30', unidade: 'Kg', status: 'Crítico', statusColor: 'text-red-500 bg-red-500/10 border-red-500/20' },
  { item: 'Filamento PLA', tipo: 'Filamento', estoque: '5,00', unidade: 'Kg', status: 'Normal', statusColor: 'text-green-500 bg-green-500/10 border-green-500/20' },
  { item: 'Filamento PETG', tipo: 'Filamento', estoque: '2,10', unidade: 'Kg', status: 'Baixo', statusColor: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' },
];

export default function EstoquePage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-5xl">
        
        {/* Filters and Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Buscar item..." 
              className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand"
            />
          </div>
          <div className="relative w-48">
            <select className="w-full bg-card border border-border rounded-lg pl-4 pr-10 py-2.5 text-sm text-gray-300 appearance-none focus:outline-none focus:border-brand">
              <option>Todos os tipos</option>
              <option>Resina</option>
              <option>Filamento</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Table Area */}
        <div className="bg-card border border-border rounded-xl flex flex-col">
          <div className="grid grid-cols-5 px-6 py-4 border-b border-border text-xs font-semibold text-gray-400">
            <div className="col-span-1">Item</div>
            <div>Tipo</div>
            <div>Estoque</div>
            <div>Unidade</div>
            <div className="text-right">Status</div>
          </div>
          
          <div className="flex flex-col">
            {estoqueData.map((row, i) => (
              <div key={i} className="grid grid-cols-5 px-6 py-4 border-b border-border/50 items-center hover:bg-white/5 transition-colors cursor-pointer">
                <div className="text-sm font-medium text-gray-200">{row.item}</div>
                <div className="text-sm text-gray-400">{row.tipo}</div>
                <div className="text-sm text-gray-400">{row.estoque}</div>
                <div className="text-sm text-gray-400">{row.unidade}</div>
                <div className="flex justify-end">
                  <span className={`px-3 py-1 rounded text-xs font-medium border ${row.statusColor}`}>
                    {row.status}
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
