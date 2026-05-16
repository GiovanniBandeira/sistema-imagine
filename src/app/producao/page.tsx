'use client';
import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Clock, Search, ChevronDown, Plus, X, MessageSquare,
  ListFilter, Users, Box, Hammer, Paintbrush, PackageCheck, Truck,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────
type ProjectStatus = 'Fila' | 'Impressão' | 'Acabamento' | 'Pintura' | 'Montagem' | 'Embalagem' | 'Finalizado';

interface Project {
  id: string;
  name: string;
  client: string;
  budget: string;
  created: string;
  deadline: string;
  responsible: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  totalParts: number;
  completedParts: number;
  timeSpent: string;
  image: string;
}

// ── Data ───────────────────────────────────────────────────────
const STEPS: { icon: any; label: ProjectStatus }[] = [
  { icon: ListFilter,  label: 'Fila'        },
  { icon: Box,         label: 'Impressão'   },
  { icon: Hammer,      label: 'Acabamento'  },
  { icon: Paintbrush,  label: 'Pintura'     },
  { icon: Users,       label: 'Montagem'    },
  { icon: Truck,       label: 'Embalagem'   },
  { icon: PackageCheck,label: 'Finalizado'  },
];

const STATUS_ORDER: ProjectStatus[] = ['Fila', 'Impressão', 'Acabamento', 'Pintura', 'Montagem', 'Embalagem', 'Finalizado'];

const INITIAL_PROJECTS: Project[] = [
  {
    id: '#P-2024-001', name: 'Personagem Anime', client: 'João Silva', budget: '#OR-2024-158',
    created: '10/05/2024', deadline: '23/05/2024', responsible: 'Lucas Ferreira',
    description: 'Estátua personagem anime em resina. Pintura manual com acabamento fosco. Base inclusa.',
    status: 'Pintura', progress: 68, totalParts: 12, completedParts: 8, timeSpent: '18h 32m',
    image: 'https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '#P-2024-002', name: 'Peça Industrial', client: 'Maria Santos', budget: '#OR-2024-160',
    created: '12/05/2024', deadline: '28/05/2024', responsible: 'Carlos Mendes',
    description: 'Peça funcional para protótipo industrial. Material PETG. Tolerância de 0.2mm.',
    status: 'Impressão', progress: 45, totalParts: 6, completedParts: 3, timeSpent: '8h 15m',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '#P-2024-003', name: 'Estátua Colecionável', client: 'Pedro Almeida', budget: '#OR-2024-162',
    created: '08/05/2024', deadline: '20/05/2024', responsible: 'Lucas Ferreira',
    description: 'Estátua colecionável 30cm. Resina detalhada. Pintura profissional com 8 cores.',
    status: 'Pintura', progress: 75, totalParts: 8, completedParts: 6, timeSpent: '22h 10m',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '#P-2024-004', name: 'Protótipo Funcional', client: 'Ana Costa', budget: '#OR-2024-165',
    created: '14/05/2024', deadline: '30/05/2024', responsible: 'Carlos Mendes',
    description: 'Protótipo funcional para validação de design. PLA reforçado.',
    status: 'Fila', progress: 10, totalParts: 4, completedParts: 0, timeSpent: '0h 45m',
    image: 'https://images.unsplash.com/photo-1631799950674-ba582e559e76?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '#P-2024-005', name: 'Engrenagem Personalizada', client: 'Lucas Martins', budget: '#OR-2024-168',
    created: '15/05/2024', deadline: '25/05/2024', responsible: 'Lucas Ferreira',
    description: 'Engrenagem personalizada em Nylon. Precisão mecânica.',
    status: 'Impressão', progress: 30, totalParts: 3, completedParts: 1, timeSpent: '5h 20m',
    image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?q=80&w=600&auto=format&fit=crop',
  },
];

const TABS = ['Informações', 'Peças', 'Arquivos', 'Histórico'];

const STATUS_COLORS: Record<ProjectStatus, string> = {
  'Fila': 'text-green-500',
  'Impressão': 'text-blue-500',
  'Acabamento': 'text-orange-500',
  'Pintura': 'text-yellow-500',
  'Montagem': 'text-purple-500',
  'Embalagem': 'text-cyan-500',
  'Finalizado': 'text-brand',
};

// ── Component ──────────────────────────────────────────────────
export default function ProducaoPage() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedId, setSelectedId] = useState(INITIAL_PROJECTS[0].id);
  const [activeTab, setActiveTab] = useState('informações');
  const [search, setSearch] = useState('');
  const [showObsModal, setShowObsModal] = useState(false);
  const [obsText, setObsText] = useState('');
  const [observations, setObservations] = useState<{ text: string; date: string }[]>([]);

  const selected = useMemo(() => projects.find(p => p.id === selectedId)!, [projects, selectedId]);

  const filteredProjects = useMemo(
    () => projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
    [search, projects],
  );

  // Determine step progress from selected project
  const currentStepIndex = STATUS_ORDER.indexOf(selected.status);
  const stepsWithProgress = STEPS.map((step, i) => ({
    ...step,
    done: i <= currentStepIndex,
    current: i === currentStepIndex,
    pct: i < currentStepIndex ? '100%' : i === currentStepIndex ? `${selected.progress}%` : '0%',
  }));
  const trackWidth = `${((currentStepIndex) / (STEPS.length - 1)) * 100}%`;

  // Advance project to next step
  const advanceStep = useCallback(() => {
    if (currentStepIndex >= STATUS_ORDER.length - 1) return;
    setProjects(prev => prev.map(p =>
      p.id === selectedId
        ? { ...p, status: STATUS_ORDER[currentStepIndex + 1], progress: currentStepIndex + 2 >= STATUS_ORDER.length ? 100 : Math.min(p.progress + 15, 95) }
        : p
    ));
  }, [selectedId, currentStepIndex]);

  // Add observation
  const addObservation = useCallback(() => {
    if (!obsText.trim()) return;
    setObservations(prev => [{ text: obsText, date: new Date().toLocaleString('pt-BR') }, ...prev]);
    setObsText('');
    setShowObsModal(false);
  }, [obsText]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">

        {/* ── Top: Timeline + Progress ─────────────────────── */}
        <div className="flex gap-6">
          <div className="flex-1 bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-semibold text-white">Produção</h3>
              <button
                onClick={advanceStep}
                disabled={currentStepIndex >= STATUS_ORDER.length - 1}
                className="px-4 py-2 bg-brand hover:bg-brandHover text-black text-sm font-semibold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Avançar Etapa →
              </button>
            </div>
            <div className="flex items-center justify-between relative px-4">
              <div className="absolute top-6 left-12 right-12 h-1 bg-white/5 -z-10">
                <div className="h-full bg-green-500 transition-all duration-500" style={{ width: trackWidth }} />
              </div>
              {stepsWithProgress.map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-3 bg-card relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors ${
                    step.done ? 'bg-green-500 border-green-500/20' : 'bg-card border-white/10 text-gray-500'
                  }`}>
                    <step.icon size={20} className={step.done ? 'text-white' : ''} />
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{step.label}</span>
                  <span className={`text-xs font-bold ${step.current ? 'text-green-500' : 'text-gray-500'}`}>
                    {step.pct}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Circular progress */}
          <div className="w-64 bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center relative">
            <span className="text-xs text-gray-400 absolute top-4 left-4">Total do Pedido</span>
            <svg className="w-32 h-32 mt-4" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="42" fill="none" stroke="#08F868" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - selected.progress / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                className="transition-all duration-500"
              />
              <text x="50" y="55" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
                {selected.progress}%
              </text>
            </svg>
            <span className="text-sm text-gray-400 mt-4">Concluído</span>
          </div>
        </div>

        {/* ── Bottom: Project List + Details ────────────────── */}
        <div className="flex gap-6 h-[600px]">

          {/* Sidebar list */}
          <div className="w-80 bg-card border border-border rounded-xl p-4 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white">Projetos</h3>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar projeto..."
                className="w-full bg-[#0a0d1a] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-2">
              {filteredProjects.length === 0 && (
                <p className="text-xs text-gray-500 text-center py-8">Nenhum projeto encontrado</p>
              )}
              {filteredProjects.map(proj => (
                <button
                  key={proj.id}
                  onClick={() => setSelectedId(proj.id)}
                  className={`w-full text-left p-3 rounded-lg border cursor-pointer flex justify-between items-center transition-colors ${
                    proj.id === selectedId ? 'bg-brand/20 border-brand/50' : 'bg-transparent border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className="flex gap-3 items-center">
                    <div className={`w-8 h-8 rounded bg-white/5 flex items-center justify-center ${STATUS_COLORS[proj.status]}`}>
                      <Box size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-200">{proj.id}</div>
                      <div className="text-xs text-gray-400">{proj.name}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs font-bold ${STATUS_COLORS[proj.status]}`}>{proj.status}</span>
                    <span className="text-xs text-gray-500">{proj.progress}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Details panel */}
          <div className="flex-1 bg-card border border-border rounded-xl p-6 flex flex-col">
            <h3 className="text-sm font-semibold text-white mb-2">Detalhes do Projeto</h3>
            <p className="text-xs text-gray-400 mb-6">{selected.id} — {selected.name}</p>

            {/* Tabs */}
            <div className="flex border-b border-white/5 mb-6">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.toLowerCase()
                      ? 'border-brand text-brand'
                      : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 flex gap-6 min-h-0">
              {/* Image */}
              <div className="w-1/3 bg-[#0a0d1a] rounded-xl border border-white/5 overflow-hidden relative">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-cover opacity-80 mix-blend-luminosity"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Tab content */}
              <div className="flex-1 overflow-y-auto">
                {activeTab === 'informações' && (
                  <div className="grid grid-cols-2 gap-y-6 content-start">
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">Cliente</span>
                      <span className="text-sm text-gray-200">{selected.client}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">Orçamento</span>
                      <span className="text-sm text-brand font-medium">{selected.budget}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">Data de Criação</span>
                      <span className="text-sm text-gray-200">{selected.created}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">Previsão de Entrega</span>
                      <span className="text-sm text-gray-200">{selected.deadline}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">Responsável</span>
                      <span className="text-sm text-gray-200">{selected.responsible}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">Status</span>
                      <span className="inline-block px-2 py-1 bg-brand/20 text-brand text-xs rounded border border-brand/30">
                        {selected.status}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs text-gray-500 block mb-1">Descrição</span>
                      <span className="text-sm text-gray-300 leading-relaxed">{selected.description}</span>
                    </div>
                  </div>
                )}
                {activeTab === 'peças' && (
                  <div className="space-y-3">
                    {Array.from({ length: selected.totalParts }, (_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-sm text-gray-200">Peça #{i + 1}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          i < selected.completedParts
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-white/5 text-gray-400'
                        }`}>
                          {i < selected.completedParts ? 'Concluída' : 'Pendente'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'arquivos' && (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <Plus size={32} className="mb-3 text-gray-600" />
                    <p className="text-sm">Nenhum arquivo anexado</p>
                    <button className="mt-4 px-4 py-2 bg-white/5 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition">
                      Upload de Arquivo
                    </button>
                  </div>
                )}
                {activeTab === 'histórico' && (
                  <div className="space-y-3">
                    {observations.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-8">Nenhuma observação registrada</p>
                    )}
                    {observations.map((obs, i) => (
                      <div key={i} className="p-3 bg-white/5 rounded-lg">
                        <span className="text-xs text-gray-500">{obs.date}</span>
                        <p className="text-sm text-gray-300 mt-1">{obs.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Stats card */}
              <div className="w-64 bg-[#0a0d1a] rounded-xl border border-white/5 p-4 flex flex-col">
                <h4 className="text-xs font-semibold text-white mb-4">Estatísticas</h4>
                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Peças',        value: String(selected.totalParts)     },
                    { label: 'Concluídas',   value: String(selected.completedParts) },
                    { label: 'Em produção',  value: String(selected.totalParts - selected.completedParts) },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-gray-400">{label}</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto bg-card rounded-lg p-3 border border-white/5">
                  <span className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                    <Clock size={12} /> Tempo decorrido
                  </span>
                  <span className="text-lg font-bold text-brand">{selected.timeSpent}</span>
                </div>

                <button
                  onClick={() => setShowObsModal(true)}
                  className="w-full mt-4 bg-brand hover:bg-brandHover text-black font-semibold py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare size={14} /> Adicionar Observação
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal: Observation ─────────────────────────────── */}
      {showObsModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={() => setShowObsModal(false)}>
          <div className="bg-[#0B1023] border border-white/10 rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Nova Observação</h3>
              <button onClick={() => setShowObsModal(false)} className="text-gray-400 hover:text-white"><X size={18} /></button>
            </div>
            <textarea
              value={obsText}
              onChange={e => setObsText(e.target.value)}
              placeholder="Descreva a observação..."
              className="w-full h-32 bg-[#0a0d1a] border border-white/10 rounded-lg p-3 text-sm text-white resize-none focus:outline-none focus:border-brand"
              autoFocus
            />
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowObsModal(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition">Cancelar</button>
              <button onClick={addObservation} className="px-6 py-2 bg-brand hover:bg-brandHover text-black text-sm font-semibold rounded-lg transition">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}