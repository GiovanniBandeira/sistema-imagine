"use client";

import { FormEvent, useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { QuoteStatus, useErpStore } from "@/stores/useErpStore";
import { FileText, Plus, Search } from "lucide-react";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const statusTone: Record<QuoteStatus, "green" | "yellow" | "blue" | "red"> = {
  Aprovado: "green",
  Enviado: "yellow",
  Rascunho: "blue",
  Expirado: "red",
};

export default function OrcamentosPage() {
  const quotes = useErpStore((state) => state.quotes);
  const addQuote = useErpStore((state) => state.addQuote);
  const updateQuoteStatus = useErpStore((state) => state.updateQuoteStatus);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | "Todos">("Todos");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    seller: "Admin Master",
    value: 0,
    status: "Rascunho" as QuoteStatus,
  });

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return quotes.filter((quote) => {
      const matchesSearch =
        !needle ||
        quote.id.toLowerCase().includes(needle) ||
        quote.clientName.toLowerCase().includes(needle) ||
        quote.seller.toLowerCase().includes(needle);
      const matchesStatus = statusFilter === "Todos" || quote.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [quotes, search, statusFilter]);

  const totalApproved = quotes
    .filter((quote) => quote.status === "Aprovado")
    .reduce((sum, quote) => sum + quote.value, 0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.clientName.trim()) return;
    addQuote(form);
    setForm({ clientName: "", seller: "Admin Master", value: 0, status: "Rascunho" });
    setShowModal(false);
  }

  return (
    <DashboardLayout>
      <div className="flex max-w-7xl flex-col gap-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-2xl font-semibold text-white">Orçamentos</h2>
            <p className="mt-1 text-sm text-gray-400">Crie, filtre e altere o status sem recarregar a página.</p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus size={16} className="mr-2" />
            Novo orçamento
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Metric label="Total aprovado" value={currency.format(totalApproved)} />
          <Metric label="Orçamentos abertos" value={String(quotes.filter((quote) => quote.status !== "Aprovado").length)} />
          <Metric label="Ticket médio" value={currency.format(quotes.reduce((sum, quote) => sum + quote.value, 0) / Math.max(quotes.length, 1))} />
        </div>

        <section className="rounded-xl border border-white/10 bg-card">
          <div className="flex flex-col gap-3 border-b border-white/10 p-4 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar orçamento..." className="w-full rounded-lg border border-white/10 bg-[#070B1D] py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-brand" />
            </div>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as QuoteStatus | "Todos")} className="rounded-lg border border-white/10 bg-[#070B1D] px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-brand">
              <option value="Todos">Todos os status</option>
              <option value="Rascunho">Rascunho</option>
              <option value="Enviado">Enviado</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Expirado">Expirado</option>
            </select>
            <Button variant="ghost" onClick={() => { setSearch(""); setStatusFilter("Todos"); }}>Limpar</Button>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[860px]">
              <div className="grid grid-cols-[0.9fr_1.2fr_1fr_0.8fr_0.8fr_0.9fr] border-b border-white/10 bg-[#070B1D] px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                <div>Número</div>
                <div>Cliente</div>
                <div>Vendedor</div>
                <div>Data</div>
                <div>Valor</div>
                <div className="text-right">Status</div>
              </div>
              {filtered.map((quote) => (
                <div key={quote.id} className="grid grid-cols-[0.9fr_1.2fr_1fr_0.8fr_0.8fr_0.9fr] items-center border-b border-white/5 px-6 py-4 hover:bg-white/[0.03]">
                  <div className="text-sm font-medium text-white">{quote.id}</div>
                  <div className="text-sm text-gray-300">{quote.clientName}</div>
                  <div className="text-sm text-gray-400">{quote.seller}</div>
                  <div className="text-sm text-gray-400">{quote.createdAt}</div>
                  <div className="text-sm font-semibold text-gray-200">{currency.format(quote.value)}</div>
                  <div className="flex justify-end">
                    <select value={quote.status} onChange={(event) => updateQuoteStatus(quote.id, event.target.value as QuoteStatus)} className="rounded-lg border border-white/10 bg-[#070B1D] px-3 py-2 text-xs text-gray-200 outline-none focus:border-brand">
                      <option value="Rascunho">Rascunho</option>
                      <option value="Enviado">Enviado</option>
                      <option value="Aprovado">Aprovado</option>
                      <option value="Expirado">Expirado</option>
                    </select>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <p className="p-8 text-center text-sm text-gray-500">Nenhum orçamento encontrado.</p>}
            </div>
          </div>
        </section>
      </div>

      <Modal
        title="Novo orçamento"
        open={showModal}
        onClose={() => setShowModal(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button type="submit" form="quote-form">Salvar</Button>
          </>
        }
      >
        <form id="quote-form" onSubmit={handleSubmit} className="grid gap-3">
          <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Cliente" value={form.clientName} onChange={(event) => setForm({ ...form, clientName: event.target.value })} />
          <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Vendedor" value={form.seller} onChange={(event) => setForm({ ...form, seller: event.target.value })} />
          <input type="number" min="0" step="0.01" className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Valor" value={form.value} onChange={(event) => setForm({ ...form, value: Number(event.target.value) })} />
          <select className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as QuoteStatus })}>
            <option value="Rascunho">Rascunho</option>
            <option value="Enviado">Enviado</option>
            <option value="Aprovado">Aprovado</option>
          </select>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-card p-5">
      <FileText className="mb-4 text-brand" size={22} />
      <span className="text-sm text-gray-400">{label}</span>
      <strong className="mt-2 block text-2xl text-white">{value}</strong>
    </div>
  );
}
