'use client';
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Calendar, Filter } from 'lucide-react';

export default function FinanceiroPage() {
  const [activeTab, setActiveTab] = useState('resumo');

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-6xl">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex gap-6">
            {['Resumo', 'Fluxo de Caixa', 'Contas', 'Despesas', 'Receitas'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`text-sm font-medium pb-4 -mb-4 transition-colors relative ${
                  activeTab === tab.toLowerCase() ? 'text-brand' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab}
                {activeTab === tab.toLowerCase() && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand"></div>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-lg text-sm text-gray-300">
            <Calendar size={16} />
            <span>01/05/2024 - 31/05/2024</span>
            <Filter size={16} className="ml-2 cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2">
            <span className="text-sm text-gray-400">Receitas</span>
            <span className="text-3xl font-bold text-green-500 tracking-wide">R$ 128.430,50</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2">
            <span className="text-sm text-gray-400">Despesas</span>
            <span className="text-3xl font-bold text-red-500 tracking-wide">R$ 45.230,00</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2">
            <span className="text-sm text-gray-400">Lucro Líquido</span>
            <span className="text-3xl font-bold text-green-500 tracking-wide">R$ 83.200,50</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2">
            <span className="text-sm text-gray-400">Margem</span>
            <span className="text-3xl font-bold text-white tracking-wide">64.8%</span>
          </div>
        </div>

        {/* Chart Row */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col h-96">
          <span className="text-sm font-medium text-white mb-8">Fluxo de Caixa</span>
          <div className="flex-1 relative w-full flex items-end justify-between px-2">
             {/* CSS line chart mock */}
             <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent border-t border-green-500/50 rounded-t-lg" style={{ clipPath: 'polygon(0 80%, 10% 85%, 20% 70%, 30% 80%, 40% 50%, 50% 60%, 60% 30%, 70% 40%, 80% 20%, 90% 30%, 100% 10%, 100% 100%, 0 100%)' }}></div>
             <div className="absolute top-0 bottom-0 left-0 border-l border-border flex flex-col justify-between -ml-8 text-xs text-gray-500 items-end pr-2 py-4">
               <span>100K</span>
               <span>50K</span>
               <span>0</span>
               <span>-50K</span>
             </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
