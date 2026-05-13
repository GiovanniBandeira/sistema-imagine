'use client';
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Users } from 'lucide-react';

const crmData = [
  { cliente: 'João Silva', contato: '(11) 99999-1111', email: 'joao@email.com', pedidos: '12', status: 'Ativo', statusColor: 'text-green-500' },
  { cliente: 'Maria Santos', contato: '(11) 99999-2222', email: 'maria@email.com', pedidos: '8', status: 'Ativo', statusColor: 'text-green-500' },
  { cliente: 'Pedro Almeida', contato: '(11) 99999-3333', email: 'pedro@email.com', pedidos: '5', status: 'Ativo', statusColor: 'text-green-500' },
  { cliente: 'Ana Costa', contato: '(11) 98999-4444', email: 'ana@email.com', pedidos: '7', status: 'Ativo', statusColor: 'text-green-500' },
  { cliente: 'Lucas Martins', contato: '(11) 99999-5555', email: 'lucas@email.com', pedidos: '10', status: 'Ativo', statusColor: 'text-green-500' },
];

export default function CRMPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-5xl">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-border flex items-center justify-center">
              <Users size={20} className="text-gray-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Clientes</h2>
          </div>
          <button className="bg-brand hover:bg-brandHover text-[#0f1015] font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
            Novo Cliente
          </button>
        </div>

        {/* Table Area */}
        <div className="bg-card border border-border rounded-xl flex flex-col mt-4">
          <div className="grid grid-cols-5 px-6 py-4 border-b border-border text-xs font-semibold text-gray-400">
            <div>Cliente</div>
            <div>Contato</div>
            <div>E-mail</div>
            <div>Pedidos</div>
            <div className="text-right">Status</div>
          </div>
          
          <div className="flex flex-col">
            {crmData.map((row, i) => (
              <div key={i} className="grid grid-cols-5 px-6 py-4 border-b border-border/50 items-center hover:bg-white/5 transition-colors cursor-pointer">
                <div className="text-sm font-medium text-gray-200">{row.cliente}</div>
                <div className="text-sm text-gray-400">{row.contato}</div>
                <div className="text-sm text-gray-400">{row.email}</div>
                <div className="text-sm text-gray-400">{row.pedidos}</div>
                <div className="flex justify-end">
                  <span className={`text-xs font-medium ${row.statusColor}`}>
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
