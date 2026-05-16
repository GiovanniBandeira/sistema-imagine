'use client';
import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Search, ChevronDown, Plus, X } from 'lucide-react';
import Button from '@/components/ui/Button';

// ── Types ──────────────────────────────────────────────────────
interface EstoqueItem {
  item: string;
  tipo: 'Resina' | 'Filamento';
  estoque: string; // e.g. "2,50"
  unidade: string; // Kg, g, etc.
  status: 'Normal' | 'Baixo' | 'Crítico';
  statusColor: string; // Tailwind classes
}

// ── Initial Data ───────────────────────────────────────────────
const INITIAL_ITEMS: EstoqueItem[] = [
  {
    item: 'Resina Padrão Cinza',
    tipo: 'Resina',
    estoque: '2,50',
    unidade: 'Kg',
    status: 'Normal',
    statusColor: 'text-green-500 bg-green-500/10 border-green-500/20',
  },
  {
    item: 'Resina ABS Like',
    tipo: 'Resina',
    estoque: '1,20',
    unidade: 'Kg',
    status: 'Baixo',
    statusColor: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  },
  {
    item: 'Resina Flexível',
    tipo: 'Resina',
    estoque: '0,30',
    unidade: 'Kg',
    status: 'Crítico',
    statusColor: 'text-red-500 bg-red-500/10 border-red-500/20',
  },
  {
    item: 'Filamento PLA',
    tipo: 'Filamento',
    estoque: '5,00',
    unidade: 'Kg',
    status: 'Normal',
    statusColor: 'text-green-500 bg-green-500/10 border-green-500/20',
  },
  {
    item: 'Filamento PETG',
    tipo: 'Filamento',
    estoque: '2,10',
    unidade: 'Kg',
    status: 'Baixo',
    statusColor: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  },
];

export default function EstoquePage() {
  const [items, setItems] = useState<EstoqueItem[]>(INITIAL_ITEMS);
  const [search, setSearch] = useState('');
  const [filterTipo, setFilterTipo] = useState(''); // '' = all
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState<Partial<EstoqueItem>>({});

  const filtered = useMemo(() => {
    return items.filter(i => {
      const matchesSearch = i.item.toLowerCase().includes(search.toLowerCase());
      const matchesTipo = filterTipo ? i.tipo === filterTipo : true;
      return matchesSearch && matchesTipo;
    });
  }, [search, filterTipo, items]);

  const addItem = () => {
    if (!newItem.item || !newItem.tipo || !newItem.estoque || !newItem.unidade) return;
    const status = newItem.status ?? 'Normal';
    const statusColorMap: Record<typeof status, string> = {
      Normal: 'text-green-500 bg-green-500/10 border-green-500/20',
      Baixo:  'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
      Crítico: 'text-red-500 bg-red-500/10 border-red-500/20',
    };
    const item: EstoqueItem = {
      item: newItem.item,
      tipo: newItem.tipo as any,
      estoque: newItem.estoque,
      unidade: newItem.unidade,
      status,
      statusColor: statusColorMap[status],
    };
    setItems(prev => [...prev, item]);
    setNewItem({});
    setShowModal(false);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl">
          <h2 className="text-lg font-semibold text-white">Estoque</h2>
          <Button onClick={() => setShowModal(true)} variant="primary">
            <Plus size={14} className="mr-1" /> Novo Item
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar item..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#0a0d1a] border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>
          {/* Tipo Filter */}
          <div className="relative w-48">
            <select
              value={filterTipo}
              onChange={e => setFilterTipo(e.target.value)}
              className="w-full bg-[#0a0d1a] border border-white/10 rounded-lg pl-4 pr-8 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-brand appearance-none"
            >
              <option value="">Todos os tipos</option>
              <option value="Resina">Resina</option>
              <option value="Filamento">Filamento</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl flex flex-col">
          {/* Header Row */}
          <div className="grid grid-cols-5 px-6 py-4 border-b border-border text-xs font-semibold text-gray-400 bg-[#0a0d1a]">
            <div className="col-span-1">Item</div>
            <div>Tipo</div>
            <div>Estoque</div>
            <div>Unidade</div>
            <div className="text-right">Status</div>
          </div>
          {/* Data Rows */}
          <div className="flex flex-col">
            {filtered.map((row, i) => (
              <div key={i} className="grid grid-cols-5 px-6 py-4 border-b border-border/50 items-center hover:bg-white/5 transition-colors cursor-pointer">
                <div className="text-sm font-medium text-gray-200">{row.item}</div>
                <div className="text-sm text-gray-400">{row.tipo}</div>
                <div className="text-sm text-gray-400">{row.estoque}</div>
                <div className="text-sm text-gray-400">{row.unidade}</div>
                <div className="flex justify-end">
                  <span className={`px-3 py-1 rounded text-xs font-medium border ${row.statusColor}`}>{row.status}</span>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-center py-8 text-sm text-gray-500">Nenhum item encontrado</p>
            )}
          </div>
          <div className="py-4 text-center">
            <span className="text-sm text-gray-500 hover:text-white cursor-pointer transition-colors">Ver todos</span>
          </div>
        </div>

        {/* Modal for new stock item */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={() => setShowModal(false)}>
            <div className="bg-[#0B1023] border border-white/10 rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Novo Item de Estoque</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><X size={18} /></button>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nome do Item"
                  value={newItem.item ?? ''}
                  onChange={e => setNewItem({ ...newItem, item: e.target.value })}
                  className="w-full bg-[#0a0d1a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand"
                />
                <select
                  value={newItem.tipo ?? ''}
                  onChange={e => setNewItem({ ...newItem, tipo: e.target.value as any })}
                  className="w-full bg-[#0a0d1a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-brand"
                >
                  <option value="">Selecione o Tipo</option>
                  <option value="Resina">Resina</option>
                  <option value="Filamento">Filamento</option>
                </select>
                <input
                  type="text"
                  placeholder="Quantidade (ex.: 2,50)"
                  value={newItem.estoque ?? ''}
                  onChange={e => setNewItem({ ...newItem, estoque: e.target.value })}
                  className="w-full bg-[#0a0d1a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand"
                />
                <input
                  type="text"
                  placeholder="Unidade (Kg, g,…)"
                  value={newItem.unidade ?? ''}
                  onChange={e => setNewItem({ ...newItem, unidade: e.target.value })}
                  className="w-full bg-[#0a0d1a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand"
                />
                <select
                  value={newItem.status ?? 'Normal'}
                  onChange={e => setNewItem({ ...newItem, status: e.target.value as any })}
                  className="w-full bg-[#0a0d1a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-brand"
                >
                  <option value="Normal">Normal</option>
                  <option value="Baixo">Baixo</option>
                  <option value="Crítico">Crítico</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button onClick={() => setShowModal(false)} variant="ghost">Cancelar</Button>
                <Button onClick={addItem} variant="primary">Salvar</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
