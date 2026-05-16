"use client";

import { FormEvent, useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { InventoryType, useErpStore } from "@/stores/useErpStore";
import { Plus, Search } from "lucide-react";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function EstoquePage() {
  const inventory = useErpStore((state) => state.inventory);
  const addInventoryItem = useErpStore((state) => state.addInventoryItem);
  const updateInventoryQuantity = useErpStore((state) => state.updateInventoryQuantity);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<InventoryType | "Todos">("Todos");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "Resina" as InventoryType,
    quantity: 0,
    unit: "kg",
    minQuantity: 1,
    cost: 0,
  });

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return inventory.filter((item) => {
      const matchesSearch = !needle || item.name.toLowerCase().includes(needle);
      const matchesType = typeFilter === "Todos" || item.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [inventory, search, typeFilter]);

  const stockValue = inventory.reduce((sum, item) => sum + item.quantity * item.cost, 0);
  const lowStock = inventory.filter((item) => item.quantity <= item.minQuantity);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim()) return;
    addInventoryItem(form);
    setForm({ name: "", type: "Resina", quantity: 0, unit: "kg", minQuantity: 1, cost: 0 });
    setShowModal(false);
  }

  return (
    <DashboardLayout>
      <div className="flex max-w-7xl flex-col gap-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-2xl font-semibold text-white">Estoque</h2>
            <p className="mt-1 text-sm text-gray-400">Controle leve de materiais, mínimos e custos.</p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus size={16} className="mr-2" />
            Novo item
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Metric label="Itens cadastrados" value={String(inventory.length)} />
          <Metric label="Alertas de mínimo" value={String(lowStock.length)} tone={lowStock.length ? "red" : "green"} />
          <Metric label="Valor em estoque" value={currency.format(stockValue)} />
        </div>

        <section className="rounded-xl border border-white/10 bg-card">
          <div className="flex flex-col gap-3 border-b border-white/10 p-4 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar material..." className="w-full rounded-lg border border-white/10 bg-[#070B1D] py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-brand" />
            </div>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as InventoryType | "Todos")} className="rounded-lg border border-white/10 bg-[#070B1D] px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-brand">
              <option value="Todos">Todos os tipos</option>
              <option value="Resina">Resina</option>
              <option value="Filamento">Filamento</option>
              <option value="Tinta">Tinta</option>
              <option value="Embalagem">Embalagem</option>
              <option value="Ferramenta">Ferramenta</option>
            </select>
            <Button variant="ghost" onClick={() => { setSearch(""); setTypeFilter("Todos"); }}>Limpar</Button>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[860px]">
              <div className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_0.8fr_0.7fr] border-b border-white/10 bg-[#070B1D] px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                <div>Item</div>
                <div>Tipo</div>
                <div>Estoque</div>
                <div>Mínimo</div>
                <div>Custo</div>
                <div className="text-right">Status</div>
              </div>
              {filtered.map((item) => {
                const isLow = item.quantity <= item.minQuantity;
                return (
                  <div key={item.id} className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_0.8fr_0.7fr] items-center border-b border-white/5 px-6 py-4 hover:bg-white/[0.03]">
                    <div>
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <p className="mt-1 text-xs text-gray-500">{item.id}</p>
                    </div>
                    <div className="text-sm text-gray-400">{item.type}</div>
                    <div>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={item.quantity}
                        onChange={(event) => updateInventoryQuantity(item.id, Number(event.target.value))}
                        className="w-24 rounded-lg border border-white/10 bg-[#070B1D] px-3 py-2 text-sm text-white outline-none focus:border-brand"
                      />
                      <span className="ml-2 text-sm text-gray-500">{item.unit}</span>
                    </div>
                    <div className="text-sm text-gray-400">{item.minQuantity} {item.unit}</div>
                    <div className="text-sm text-gray-400">{currency.format(item.cost)}</div>
                    <div className="text-right">
                      <StatusBadge tone={isLow ? "red" : "green"}>{isLow ? "Baixo" : "Normal"}</StatusBadge>
                    </div>
                  </div>
                );
              })}
              {filtered.length === 0 && <p className="p-8 text-center text-sm text-gray-500">Nenhum item encontrado.</p>}
            </div>
          </div>
        </section>
      </div>

      <Modal
        title="Novo item de estoque"
        open={showModal}
        onClose={() => setShowModal(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button type="submit" form="inventory-form">Salvar</Button>
          </>
        }
      >
        <form id="inventory-form" onSubmit={handleSubmit} className="grid gap-3">
          <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Nome do item" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <select className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value as InventoryType })}>
            <option value="Resina">Resina</option>
            <option value="Filamento">Filamento</option>
            <option value="Tinta">Tinta</option>
            <option value="Embalagem">Embalagem</option>
            <option value="Ferramenta">Ferramenta</option>
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input type="number" min="0" step="0.1" className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Quantidade" value={form.quantity} onChange={(event) => setForm({ ...form, quantity: Number(event.target.value) })} />
            <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Unidade" value={form.unit} onChange={(event) => setForm({ ...form, unit: event.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input type="number" min="0" step="0.1" className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Estoque mínimo" value={form.minQuantity} onChange={(event) => setForm({ ...form, minQuantity: Number(event.target.value) })} />
            <input type="number" min="0" step="0.01" className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Custo unitário" value={form.cost} onChange={(event) => setForm({ ...form, cost: Number(event.target.value) })} />
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

function Metric({ label, value, tone = "green" }: { label: string; value: string; tone?: "green" | "red" }) {
  return (
    <div className="rounded-xl border border-white/10 bg-card p-5">
      <span className="text-sm text-gray-400">{label}</span>
      <strong className={`mt-2 block text-3xl ${tone === "red" ? "text-red-400" : "text-white"}`}>{value}</strong>
    </div>
  );
}
