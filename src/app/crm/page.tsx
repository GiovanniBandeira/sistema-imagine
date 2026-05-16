'use client';
import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Users, Plus, X, Search, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';

// ── Types ──────────────────────────────────────────────────────
interface Cliente {
  nome: string;
  contato: string;
  email: string;
  pedidos: string;
  status: 'Ativo' | 'Inativo';
  statusColor: string;
}

// ── Initial Data ───────────────────────────────────────────────
const INITIAL_CLIENTES: Cliente[] = [
  { nome: 'João Silva',   contato: '(11) 99999-1111', email: 'joao@email.com',   pedidos: '12', status: 'Ativo',   statusColor: 'text-green-500' },
  { nome: 'Maria Santos', contato: '(11) 99999-2222', email: 'maria@email.com',  pedidos: '8',  status: 'Ativo',   statusColor: 'text-green-500' },
  { nome: 'Pedro Almeida',contato: '(11) 99999-3333', email: 'pedro@email.com',  pedidos: '5',  status: 'Ativo',   statusColor: 'text-green-500' },
  { nome: 'Ana Costa',    contato: '(11) 98999-4444', email: 'ana@email.com',    pedidos: '7',  status: 'Inativo',statusColor: 'text-gray-400' },
  { nome: 'Lucas Martins',contato: '(11) 99999-5555', email: 'lucas@email.com',  pedidos: '10', status: 'Ativo',   statusColor: 'text-green-500' },
];

export default function CRMPage() {
  const [clientes, setClientes] = useState<Cliente[]>(INITIAL_CLIENTES);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newCliente, setNewCliente] = useState<Partial<Cliente>>({});

  const filtered = useMemo(
    () => clientes.filter(c => c.nome.toLowerCase().includes(search.toLowerCase())),
    [search, clientes],
  );

  const addCliente = () => {
    if (!newCliente.nome) return;
    const cliente: Cliente = {
      nome: newCliente.nome,
      contato: newCliente.contato ?? '',
      email: newCliente.email ?? '',
      pedidos: newCliente.pedidos ?? '0',
      status: (newCliente.status as any) ?? 'Ativo',
      statusColor: (newCliente.status === 'Ativo') ? 'text-green-500' : 'text-gray-400',
    };
    setClientes(prev => [...prev, cliente]);
    setNewCliente({});
    setShowModal(false);
  };

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
          <Button onClick={() => setShowModal(true)} variant="primary">
            <Plus size={14} className="mr-1" /> Novo Cliente
          </Button>
        </div>

        {/* Table Area */}
        <div className="bg-card border border-border rounded-xl flex flex-col mt-4">
          {/* Search & Filter */}
          <div className="flex items-center gap-4 p-4 border-b border-border/20">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-[#0a0d1a] border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand"
              />
            </div>
            <select
              className="w-32 bg-[#0a0d1a] border border-white/10 rounded-lg px-2 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-brand"
              defaultValue=""
            >
              <option value="">Todos</option>
              <option value="ativo">Ativos</option>
              <option value="inativo">Inativos</option>
            </select>
          </div>

          {/* Header Row */}
          <div className="grid grid-cols-5 px-6 py-4 border-b border-border text-xs font-semibold text-gray-400 bg-[#0a0d1a]">
            <div>Cliente</div>
            <div>Contato</div>
            <div>E-mail</div>
            <div>Pedidos</div>
            <div className="text-right">Status</div>
          </div>

          {/* Data Rows */}
          <div className="flex flex-col">
            {filtered.map((row, i) => (
              <div key={i} className="grid grid-cols-5 px-6 py-4 border-b border-border/50 items-center hover:bg-white/5 transition-colors cursor-pointer">
                <div className="text-sm font-medium text-gray-200">{row.nome}</div>
                <div className="text-sm text-gray-400">{row.contato}</div>
                <div className="text-sm text-gray-400">{row.email}</div>
                <div className="text-sm text-gray-400">{row.pedidos}</div>
                <div className="flex justify-end">
                  <span className={`text-xs font-medium ${row.statusColor}`}>{row.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="py-4 text-center">
            <span className="text-sm text-gray-500 hover:text-white cursor-pointer transition-colors">Ver todos</span>
          </div>
        </div>

        {/* Modal for new client */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={() => setShowModal(false)}>
            <div className="bg-[#0B1023] border border-white/10 rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Novo Cliente</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><X size={18} /></button>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nome"
                  value={newCliente.nome ?? ''}
                  onChange={e => setNewCliente({ ...newCliente, nome: e.target.value })}
                  className="w-full bg-[#0a0d1a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand"
                />
                <input
                  type="text"
                  placeholder="Contato"
                  value={newCliente.contato ?? ''}
                  onChange={e => setNewCliente({ ...newCliente, contato: e.target.value })}
                  className="w-full bg-[#0a0d1a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand"
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={newCliente.email ?? ''}
                  onChange={e => setNewCliente({ ...newCliente, email: e.target.value })}
                  className="w-full bg-[#0a0d1a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand"
                />
                <select
                  value={newCliente.status ?? 'Ativo'}
                  onChange={e => setNewCliente({ ...newCliente, status: e.target.value as any })}
                  className="w-full bg-[#0a0d1a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-brand"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button onClick={() => setShowModal(false)} variant="ghost">Cancelar</Button>
                <Button onClick={addCliente} variant="primary">Salvar</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
