'use client';
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ChevronDown, Tag } from 'lucide-react';

export default function PrecificacaoPage() {
  return (
    <DashboardLayout>
      <div className="flex gap-8 max-w-5xl">
        
        {/* Left Column: Parâmetros */}
        <div className="flex-1 flex flex-col gap-6">
          <h3 className="text-sm font-semibold text-white">Parâmetros do Projeto</h3>
          
          <div className="flex flex-col gap-4 bg-card border border-border rounded-xl p-6">
            
            {/* Input Rows */}
            <div className="grid grid-cols-5 items-center gap-4">
              <label className="col-span-2 text-sm text-gray-400">Tecnologia</label>
              <div className="col-span-3 relative">
                <select className="w-full bg-[#0f111a] border border-border rounded-lg pl-4 pr-10 py-2.5 text-sm text-gray-300 appearance-none focus:outline-none focus:border-brand">
                  <option>Resina LCD</option>
                  <option>FDM</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-5 items-center gap-4">
              <label className="col-span-2 text-sm text-gray-400">Tipo de Resina</label>
              <div className="col-span-3 relative">
                <select className="w-full bg-[#0f111a] border border-border rounded-lg pl-4 pr-10 py-2.5 text-sm text-gray-300 appearance-none focus:outline-none focus:border-brand">
                  <option>Padrão</option>
                  <option>Tough</option>
                  <option>Lavável em água</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-5 items-center gap-4">
              <label className="col-span-2 text-sm text-gray-400">Altura (cm)</label>
              <div className="col-span-3">
                <input type="text" defaultValue="20" className="w-full bg-[#0f111a] border border-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand" />
              </div>
            </div>

            <div className="grid grid-cols-5 items-center gap-4">
              <label className="col-span-2 text-sm text-gray-400">Volume (cm³)</label>
              <div className="col-span-3">
                <input type="text" defaultValue="150" className="w-full bg-[#0f111a] border border-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand" />
              </div>
            </div>

            <div className="grid grid-cols-5 items-center gap-4">
              <label className="col-span-2 text-sm text-gray-400">Peso (g)</label>
              <div className="col-span-3">
                <input type="text" defaultValue="165" className="w-full bg-[#0f111a] border border-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand" />
              </div>
            </div>

            <div className="grid grid-cols-5 items-center gap-4">
              <label className="col-span-2 text-sm text-gray-400">Tempo de Impressão</label>
              <div className="col-span-3">
                <input type="text" defaultValue="8h 30m" className="w-full bg-[#0f111a] border border-border rounded-lg px-4 py-2.5 text-sm text-gray-400 focus:outline-none focus:border-brand" />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-sm text-gray-400">Acabamentos</label>
              <div className="flex gap-3">
                {['Lixamento', 'Pintura', 'Montagem'].map(acabamento => (
                  <div key={acabamento} className="relative flex-1">
                    <select className="w-full bg-[#0f111a] border border-border rounded-lg pl-3 pr-8 py-2 text-xs text-gray-300 appearance-none focus:outline-none focus:border-brand">
                      <option>{acabamento}</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full mt-4 bg-brand hover:bg-brandHover text-[#0f1015] font-semibold py-3 rounded-lg text-sm transition-colors">
              Calcular Preço
            </button>
          </div>
        </div>

        {/* Right Column: Resumo */}
        <div className="w-96 flex flex-col gap-6">
          <h3 className="text-sm font-semibold text-white">Resumo do Cálculo</h3>
          
          <div className="flex flex-col bg-card border border-border rounded-xl p-6">
            <div className="flex flex-col gap-4 mb-6">
              {[
                { label: 'Custo de Material', value: 'R$ 12,45' },
                { label: 'Custo de Impressão', value: 'R$ 18,70' },
                { label: 'Custo de Acabamento', value: 'R$ 25,00' },
                { label: 'Custo Operacional', value: 'R$ 15,30' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-gray-200">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border/50 pt-4 pb-4 flex flex-col gap-4">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300 font-medium">Custo Total</span>
                  <span className="text-gray-200">R$ 71,45</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Markup Aplicado</span>
                  <span className="text-gray-400">2.80x</span>
               </div>
            </div>

            <div className="border-t border-border pt-6 pb-2 flex flex-col">
               <div className="flex justify-between items-end mb-4">
                 <span className="text-sm font-medium text-white mb-1">Preço de Venda</span>
                 <span className="text-3xl font-bold text-brand">R$ 199,00</span>
               </div>
               <div className="flex items-center gap-2 text-xs text-green-500 font-medium mt-1">
                 <Tag size={12} />
                 <span>Margem de lucro: 63.7%</span>
               </div>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}