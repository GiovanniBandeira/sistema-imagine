"use client";

import { FormEvent, useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { FinancialStatus, FinancialType, useErpStore } from "@/stores/useErpStore";
import { Calendar, Plus, Search } from "lucide-react";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function FinanceiroPage() {
  const entries = useErpStore((state) => state.financialEntries);
  const addFinancialEntry = useErpStore((state) => state.addFinancialEntry);
  const updateFinancialStatus = useErpStore((state) => state.updateFinancialStatus);
  const [typeFilter, setTypeFilter] = useState<FinancialType | "Todos">("Todos");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    type: "Receita" as FinancialType,
    description: "",
    category: "Vendas",
    date: new Date().toLocaleDateString("pt-BR"),
    amount: 0,
    status: "Pendente" as FinancialStatus,
  });

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesSearch = !needle || entry.description.toLowerCase().includes(needle) || entry.category.toLowerCase().includes(needle);
      const matchesType = typeFilter === "Todos" || entry.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [entries, search, typeFilter]);

  const revenue = entries.filter((entry) => entry.type === "Receita").reduce((sum, entry) => sum + entry.amount, 0);
  const expenses = entries.filter((entry) => entry.type === "Despesa").reduce((sum, entry) => sum + entry.amount, 0);
  const pending = entries.filter((entry) => entry.status === "Pendente").reduce((sum, entry) => sum + entry.amount, 0);
  const maxEntry = Math.max(...entries.map((entry) => entry.amount), 1);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.description.trim()) return;
    addFinancialEntry(form);
    setForm({ type: "Receita", description: "", category: "Vendas", date: new Date().toLocaleDateString("pt-BR"), amount: 0, status: "Pendente" });
    setShowModal(false);
  }

  return (
    <DashboardLayout>
      <div className="flex max-w-7xl flex-col gap-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-2xl font-semibold text-white">Financeiro</h2>
            <p className="mt-1 text-sm text-gray-400">Entradas, saídas, pendências e fluxo de caixa testáveis.</p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus size={16} className="mr-2" />
            Novo lançamento
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Metric label="Receitas" value={currency.format(revenue)} tone="green" />
          <Metric label="Despesas" value={currency.format(expenses)} tone="red" />
          <Metric label="Resultado" value={currency.format(revenue - expenses)} tone={revenue - expenses >= 0 ? "green" : "red"} />
          <Metric label="Pendente" value={currency.format(pending)} tone="yellow" />
        </div>

        <section className="rounded-xl border border-white/10 bg-card p-6">
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
            <Calendar size={16} />
            Maio de 2026
          </div>
          <div className="flex h-64 items-end gap-3">
            {entries.map((entry) => (
              <div key={entry.id} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={`w-full rounded-t-md ${entry.type === "Receita" ? "bg-brand/80" : "bg-red-500/80"}`}
                  style={{ height: `${Math.max(10, (entry.amount / maxEntry) * 100)}%` }}
                />
                <span className="text-[11px] text-gray-500">{entry.id.slice(-3)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-card">
          <div className="flex flex-col gap-3 border-b border-white/10 p-4 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar lançamento..." className="w-full rounded-lg border border-white/10 bg-[#070B1D] py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-brand" />
            </div>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as FinancialType | "Todos")} className="rounded-lg border border-white/10 bg-[#070B1D] px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-brand">
              <option value="Todos">Todos os tipos</option>
              <option value="Receita">Receitas</option>
              <option value="Despesa">Despesas</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[820px]">
              <div className="grid grid-cols-[1.3fr_0.9fr_0.8fr_0.8fr_0.8fr_0.8fr] border-b border-white/10 bg-[#070B1D] px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                <div>Descrição</div>
                <div>Categoria</div>
                <div>Data</div>
                <div>Tipo</div>
                <div>Valor</div>
                <div className="text-right">Status</div>
              </div>
              {filtered.map((entry) => (
                <div key={entry.id} className="grid grid-cols-[1.3fr_0.9fr_0.8fr_0.8fr_0.8fr_0.8fr] items-center border-b border-white/5 px-6 py-4 hover:bg-white/[0.03]">
                  <div className="text-sm font-medium text-white">{entry.description}</div>
                  <div className="text-sm text-gray-400">{entry.category}</div>
                  <div className="text-sm text-gray-400">{entry.date}</div>
                  <div><StatusBadge tone={entry.type === "Receita" ? "green" : "red"}>{entry.type}</StatusBadge></div>
                  <div className="text-sm font-semibold text-gray-200">{currency.format(entry.amount)}</div>
                  <div className="flex justify-end">
                    <select value={entry.status} onChange={(event) => updateFinancialStatus(entry.id, event.target.value as FinancialStatus)} className="rounded-lg border border-white/10 bg-[#070B1D] px-3 py-2 text-xs text-gray-200 outline-none focus:border-brand">
                      <option value="Pendente">Pendente</option>
                      <option value="Pago">Pago</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Modal
        title="Novo lançamento"
        open={showModal}
        onClose={() => setShowModal(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button type="submit" form="finance-form">Salvar</Button>
          </>
        }
      >
        <form id="finance-form" onSubmit={handleSubmit} className="grid gap-3">
          <select className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value as FinancialType })}>
            <option value="Receita">Receita</option>
            <option value="Despesa">Despesa</option>
          </select>
          <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Descrição" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Categoria" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Data" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
            <input type="number" min="0" step="0.01" className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Valor" value={form.amount} onChange={(event) => setForm({ ...form, amount: Number(event.target.value) })} />
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: "green" | "red" | "yellow" }) {
  const colors = {
    green: "text-brand",
    red: "text-red-400",
    yellow: "text-yellow-300",
  };

  return (
    <div className="rounded-xl border border-white/10 bg-card p-5">
      <span className="text-sm text-gray-400">{label}</span>
      <strong className={`mt-2 block text-2xl ${colors[tone]}`}>{value}</strong>
    </div>
  );
}
