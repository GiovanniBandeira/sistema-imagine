'use client';
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CheckCircle2, CircleDashed, ChevronDown, Clock, Search, ListFilter, Users, Box, Hammer, Paintbrush, PackageCheck, Truck } from 'lucide-react';

export default function ProducaoPage() {
  const [activeTab, setActiveTab] = useState('informacoes');

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Top Section: Timeline & Total Progress */}
        <div className="flex gap-6">
          <div className="flex-1 bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-8">Produção</h3>
            <div className="flex items-center justify-between relative px-4">
              <div className="absolute top-6 left-12 right-12 h-1 bg-border -z-10">
                <div className="h-full bg-green-500 w-[60%]"></div>
              </div>
              
              {[
                { icon: ListFilter, label: 'Fila', pct: '100%', done: true },
                { icon: Box, label: 'Impressão', pct: '100%', done: true },
                { icon: Hammer, label: 'Acabamento', pct: '100%', done: true },
                { icon: Paintbrush, label: 'Pintura', pct: '75%', done: true, current: true },
                { icon: Users, label: 'Montagem', pct: '0%', done: false },
                { icon: Truck, label: 'Embalagem', pct: '0%', done: false },
                { icon: PackageCheck, label: 'Finalizado', pct: '0%', done: false },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-3 bg-card relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
                    step.done ? 'bg-green-500 border-green-500/20' : 'bg-card border-border text-gray-500'
                  }`}>
                    {step.done ? (
                      <step.icon size={20} className="text-white" />
                    ) : (
                      <step.icon size={20} />
                    )}
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{step.label}</span>
                  <span className={`text-xs font-bold ${step.current ? 'text-green-500' : 'text-gray-500'}`}>{step.pct}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-64 bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center relative">
             <span className="text-xs text-gray-400 absolute top-4 left-4">Total do Pedido</span>
             <div className="w-32 h-32 rounded-full border-8 border-border relative flex items-center justify-center mt-4">
               {/* Mock CSS circular progress */}
               <div className="absolute inset-[-8px] rounded-full border-8 border-green-500" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 60%)' }}></div>
               <span className="text-3xl font-bold text-white">68%</span>
             </div>
             <span className="text-sm text-gray-400 mt-4">Concluído</span>
          </div>
        </div>

        {/* Bottom Section: Project List & Details */}
        <div className="flex gap-6 h-[600px]">
          {/* Projects Sidebar */}
          <div className="w-80 bg-card border border-border rounded-xl p-4 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white">Projetos</h3>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Buscar projeto..." 
                className="w-full bg-[#0f111a] border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand"
              />
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
            
            <div className="flex-1 overflow-y-auto flex flex-col gap-2">
              {[
                { id: '#P-2024-001', name: 'Personagem Anime', pct: '68%', active: true, color: 'text-brand', status: 'Pintura' },
                { id: '#P-2024-002', name: 'Peça Industrial', pct: '45%', active: false, color: 'text-blue-500', status: 'Impressão' },
                { id: '#P-2024-003', name: 'Estátua Colecionável', pct: '75%', active: false, color: 'text-yellow-500', status: 'Pintura' },
                { id: '#P-2024-004', name: 'Protótipo Funcional', pct: '10%', active: false, color: 'text-green-500', status: 'Fila' },
                { id: '#P-2024-005', name: 'Engrenagem Personalizada', pct: '30%', active: false, color: 'text-gray-400', status: 'Impressão' },
              ].map(proj => (
                <div key={proj.id} className={`p-3 rounded-lg border cursor-pointer flex justify-between items-center transition-colors ${
                  proj.active ? 'bg-brand/20 border-brand/50' : 'bg-transparent border-transparent hover:bg-white/5'
                }`}>
                  <div className="flex gap-3 items-center">
                    <div className={`w-8 h-8 rounded bg-white/5 flex items-center justify-center ${proj.color}`}>
                      <Box size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-200">{proj.id}</div>
                      <div className="text-xs text-gray-400">{proj.name}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                     <span className={`text-xs font-bold ${proj.color}`}>{proj.status}</span>
                     <span className="text-xs text-gray-500">{proj.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="flex-1 bg-card border border-border rounded-xl p-6 flex flex-col">
            <h3 className="text-sm font-semibold text-white mb-2">Detalhes do Projeto</h3>
            <p className="text-xs text-gray-400 mb-6">#P-2024-001 - Personagem Anime</p>
            
            <div className="flex border-b border-border mb-6">
              {['Informações', 'Peças', 'Arquivos', 'Histórico'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.toLowerCase() ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 flex gap-6">
              {/* Image box */}
              <div className="w-1/3 bg-[#0f111a] rounded-xl border border-border flex items-center justify-center overflow-hidden">
                 {/* Placeholder for 3D model image */}
                 <img src="https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?q=80&w=600&auto=format&fit=crop" alt="3D Model" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
              </div>
              
              {/* Info Grid */}
              <div className="flex-1 grid grid-cols-2 gap-y-6 content-start">
                 <div>
                   <span className="text-xs text-gray-500 block mb-1">Cliente</span>
                   <span className="text-sm text-gray-200">João Silva</span>
                 </div>
                 <div>
                   <span className="text-xs text-gray-500 block mb-1">Orçamento</span>
                   <span className="text-sm text-brand font-medium">#OR-2024-158</span>
                 </div>
                 <div>
                   <span className="text-xs text-gray-500 block mb-1">Data de Criação</span>
                   <span className="text-sm text-gray-200">10/05/2024</span>
                 </div>
                 <div>
                   <span className="text-xs text-gray-500 block mb-1">Previsão de</span>
                   <span className="text-sm text-gray-200">23/05/2024</span>
                 </div>
                 <div>
                   <span className="text-xs text-gray-500 block mb-1">Responsável</span>
                   <span className="text-sm text-gray-200">Lucas Ferreira</span>
                 </div>
                 <div>
                   <span className="text-xs text-gray-500 block mb-1">Status</span>
                   <span className="inline-block px-2 py-1 bg-brand/20 text-brand text-xs rounded border border-brand/30">Em produção</span>
                 </div>
                 <div className="col-span-2">
                   <span className="text-xs text-gray-500 block mb-1">Descrição</span>
                   <span className="text-sm text-gray-300 leading-relaxed">Estátua personagem anime em resina. Pintura manual com acabamento fosco. Base inclusa.</span>
                 </div>
              </div>
              
              {/* Statistics Card */}
              <div className="w-64 bg-[#0f111a] rounded-xl border border-border p-4 flex flex-col">
                 <h4 className="text-xs font-semibold text-white mb-4">Estatísticas</h4>
                 <div className="space-y-3 mb-6">
                   <div className="flex justify-between text-sm">
                     <span className="text-gray-400">Peças</span>
                     <span className="text-white font-medium">12</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-gray-400">Concluídas</span>
                     <span className="text-white font-medium">8</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-gray-400">Em produção</span>
                     <span className="text-white font-medium">4</span>
                   </div>
                 </div>
                 
                 <div className="mt-auto bg-card rounded-lg p-3 border border-border">
                   <span className="text-xs text-gray-500 flex items-center gap-1 mb-1"><Clock size={12}/> Tempo decorrido</span>
                   <span className="text-lg font-bold text-brand">18h 32m</span>
                 </div>
                 
                 <button className="w-full mt-4 bg-brand hover:bg-brandHover text-[#0f1015] font-semibold py-2 rounded-lg text-sm transition-colors">
                   Adicionar Observação
                 </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}