"use client";

import { FormEvent, useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { ClientStatus, ClientType, useErpStore } from "@/stores/useErpStore";
import { Plus, Search, Users } from "lucide-react";

export default function CRMPage() {
  const clients = useErpStore((state) => state.clients);
  const addClient = useErpStore((state) => state.addClient);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<ClientType | "Todos">("Todos");
  const [statusFilter, setStatusFilter] = useState<ClientStatus | "Todos">("Todos");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "Cliente" as ClientType,
    phone: "",
    email: "",
    city: "",
    commission: 0,
    status: "Ativo" as ClientStatus,
  });

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return clients.filter((client) => {
      const matchesSearch =
        !needle ||
        client.name.toLowerCase().includes(needle) ||
        client.email.toLowerCase().includes(needle) ||
        client.phone.includes(needle);
      const matchesType = typeFilter === "Todos" || client.type === typeFilter;
      const matchesStatus = statusFilter === "Todos" || client.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [clients, search, statusFilter, typeFilter]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim()) return;
    addClient(form);
    setForm({ name: "", type: "Cliente", phone: "", email: "", city: "", commission: 0, status: "Ativo" });
    setShowModal(false);
  }

  return (
    <DashboardLayout>
      <div className="flex max-w-7xl flex-col gap-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-2xl font-semibold text-white">CRM</h2>
            <p className="mt-1 text-sm text-gray-400">Clientes, fornecedores e afiliados no mesmo fluxo.</p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus size={16} className="mr-2" />
            Novo contato
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {(["Cliente", "Fornecedor", "Afiliado"] as ClientType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className="rounded-xl border border-white/10 bg-card p-5 text-left transition-colors hover:border-brand/40"
            >
              <Users className="mb-4 text-brand" size={22} />
              <span className="text-sm text-gray-400">{type}s</span>
              <strong className="mt-2 block text-3xl text-white">{clients.filter((client) => client.type === type).length}</strong>
            </button>
          ))}
        </div>

        <section className="rounded-xl border border-white/10 bg-card">
          <div className="flex flex-col gap-3 border-b border-white/10 p-4 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar contato..."
                className="w-full rounded-lg border border-white/10 bg-[#070B1D] py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-brand"
              />
            </div>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as ClientType | "Todos")} className="rounded-lg border border-white/10 bg-[#070B1D] px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-brand">
              <option value="Todos">Todos os tipos</option>
              <option value="Cliente">Clientes</option>
              <option value="Fornecedor">Fornecedores</option>
              <option value="Afiliado">Afiliados</option>
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as ClientStatus | "Todos")} className="rounded-lg border border-white/10 bg-[#070B1D] px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-brand">
              <option value="Todos">Todos os status</option>
              <option value="Ativo">Ativos</option>
              <option value="Inativo">Inativos</option>
            </select>
            <Button variant="ghost" onClick={() => { setSearch(""); setTypeFilter("Todos"); setStatusFilter("Todos"); }}>
              Limpar
            </Button>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[820px]">
              <div className="grid grid-cols-[1.3fr_1fr_1fr_0.8fr_0.7fr_0.7fr] border-b border-white/10 bg-[#070B1D] px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                <div>Nome</div>
                <div>Contato</div>
                <div>Cidade</div>
                <div>Tipo</div>
                <div>Pedidos</div>
                <div className="text-right">Status</div>
              </div>
              {filtered.map((client) => (
                <div key={client.id} className="grid grid-cols-[1.3fr_1fr_1fr_0.8fr_0.7fr_0.7fr] items-center border-b border-white/5 px-6 py-4 hover:bg-white/[0.03]">
                  <div>
                    <p className="text-sm font-medium text-white">{client.name}</p>
                    <p className="mt-1 text-xs text-gray-500">{client.email}</p>
                  </div>
                  <div className="text-sm text-gray-400">{client.phone}</div>
                  <div className="text-sm text-gray-400">{client.city || "-"}</div>
                  <div><StatusBadge tone={client.type === "Afiliado" ? "purple" : client.type === "Fornecedor" ? "blue" : "gray"}>{client.type}</StatusBadge></div>
                  <div className="text-sm text-gray-300">{client.orders}</div>
                  <div className="text-right"><StatusBadge tone={client.status === "Ativo" ? "green" : "gray"}>{client.status}</StatusBadge></div>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="p-8 text-center text-sm text-gray-500">Nenhum contato encontrado.</p>
              )}
            </div>
          </div>
        </section>
      </div>

      <Modal
        title="Novo contato"
        open={showModal}
        onClose={() => setShowModal(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button type="submit" form="crm-form">Salvar</Button>
          </>
        }
      >
        <form id="crm-form" onSubmit={handleSubmit} className="grid gap-3">
          <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Nome" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <select className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value as ClientType })}>
              <option value="Cliente">Cliente</option>
              <option value="Fornecedor">Fornecedor</option>
              <option value="Afiliado">Afiliado</option>
            </select>
            <select className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as ClientStatus })}>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
          <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Telefone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
          <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="E-mail" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Cidade" value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} />
          <input type="number" min="0" className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Comissão (%)" value={form.commission} onChange={(event) => setForm({ ...form, commission: Number(event.target.value) })} />
        </form>
      </Modal>
    </DashboardLayout>
  );
}
