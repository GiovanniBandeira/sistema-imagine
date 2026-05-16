"use client";

import { FormEvent, useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import {
  Priority,
  ProductionStatus,
  productionStatuses,
  useErpStore,
} from "@/stores/useErpStore";
import { ArrowRight, MessageSquare, Plus, Search } from "lucide-react";

const priorityTone: Record<Priority, "green" | "yellow" | "red"> = {
  Baixa: "green",
  Normal: "yellow",
  Alta: "red",
};

export default function ProducaoPage() {
  const productionOrders = useErpStore((state) => state.productionOrders);
  const addProductionOrder = useErpStore((state) => state.addProductionOrder);
  const moveProductionOrder = useErpStore((state) => state.moveProductionOrder);
  const advanceProductionOrder = useErpStore((state) => state.advanceProductionOrder);
  const addProductionNote = useErpStore((state) => state.addProductionNote);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProductionStatus | "Todos">("Todos");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "Todas">("Todas");
  const [selectedId, setSelectedId] = useState(productionOrders[0]?.id ?? "");
  const [showNewModal, setShowNewModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [note, setNote] = useState("");
  const [newOrder, setNewOrder] = useState({
    title: "",
    clientName: "",
    quoteId: "",
    seller: "Admin Master",
    deadline: "",
    priority: "Normal" as Priority,
    paymentStatus: "Pendente" as "Pendente" | "Confirmado",
    status: "Em negociação" as ProductionStatus,
  });

  const filteredOrders = useMemo(() => {
    const needle = search.trim().toLowerCase();

    return productionOrders.filter((order) => {
      const matchesSearch =
        !needle ||
        order.title.toLowerCase().includes(needle) ||
        order.clientName.toLowerCase().includes(needle) ||
        order.id.toLowerCase().includes(needle);
      const matchesStatus = statusFilter === "Todos" || order.status === statusFilter;
      const matchesPriority = priorityFilter === "Todas" || order.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [priorityFilter, productionOrders, search, statusFilter]);

  const selected =
    productionOrders.find((order) => order.id === selectedId) ??
    filteredOrders[0] ??
    productionOrders[0];

  const statusTotals = productionStatuses.map((status) => ({
    status,
    total: productionOrders.filter((order) => order.status === status).length,
  }));

  function createOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newOrder.title.trim() || !newOrder.clientName.trim()) return;

    addProductionOrder({
      ...newOrder,
      quoteId: newOrder.quoteId || "Sem orçamento",
      deadline: newOrder.deadline || new Date().toLocaleDateString("pt-BR"),
    });
    setNewOrder({
      title: "",
      clientName: "",
      quoteId: "",
      seller: "Admin Master",
      deadline: "",
      priority: "Normal",
      paymentStatus: "Pendente",
      status: "Em negociação",
    });
    setShowNewModal(false);
  }

  function saveNote() {
    if (!selected || !note.trim()) return;
    addProductionNote(selected.id, note.trim());
    setNote("");
    setShowNoteModal(false);
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div>
            <h2 className="text-2xl font-semibold text-white">Produção</h2>
            <p className="mt-1 text-sm text-gray-400">
              Kanban leve em memória, com filtros, avanço de etapa e observações.
            </p>
          </div>
          <Button onClick={() => setShowNewModal(true)}>
            <Plus size={16} className="mr-2" />
            Nova ordem
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-8">
          {statusTotals.map((item) => (
            <button
              key={item.status}
              type="button"
              onClick={() => setStatusFilter(item.status)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                statusFilter === item.status
                  ? "border-brand/50 bg-brand/10"
                  : "border-white/10 bg-card hover:border-white/20"
              }`}
            >
              <span className="block text-xs text-gray-400">{item.status}</span>
              <strong className="mt-2 block text-2xl text-white">{item.total}</strong>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-card p-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por projeto, cliente ou código..."
              className="w-full rounded-lg border border-white/10 bg-[#070B1D] py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-colors focus:border-brand"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as ProductionStatus | "Todos")}
            className="rounded-lg border border-white/10 bg-[#070B1D] px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-brand"
          >
            <option value="Todos">Todos os status</option>
            {productionStatuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value as Priority | "Todas")}
            className="rounded-lg border border-white/10 bg-[#070B1D] px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-brand"
          >
            <option value="Todas">Todas as prioridades</option>
            <option value="Alta">Alta</option>
            <option value="Normal">Normal</option>
            <option value="Baixa">Baixa</option>
          </select>
          <Button variant="ghost" onClick={() => { setSearch(""); setStatusFilter("Todos"); setPriorityFilter("Todas"); }}>
            Limpar filtros
          </Button>
        </div>

        <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="overflow-x-auto rounded-xl border border-white/10 bg-[#070B1D] p-4">
            <div className="grid min-w-[1560px] grid-cols-8 gap-4">
              {productionStatuses.map((status) => {
                const columnOrders = filteredOrders.filter((order) => order.status === status);

                return (
                  <div key={status} className="flex min-h-[540px] flex-col rounded-xl border border-white/10 bg-card">
                    <div className="flex items-center justify-between border-b border-white/10 p-4">
                      <h3 className="text-sm font-semibold text-white">{status}</h3>
                      <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-gray-400">{columnOrders.length}</span>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-3">
                      {columnOrders.map((order) => (
                        <article
                          key={order.id}
                          className={`rounded-lg border p-4 transition-colors ${
                            selected?.id === order.id
                              ? "border-brand/50 bg-brand/10"
                              : "border-white/10 bg-[#070B1D] hover:border-white/20"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedId(order.id)}
                            className="w-full text-left"
                          >
                            <div className="mb-3 flex items-start justify-between gap-3">
                              <span className="text-xs text-gray-500">{order.id}</span>
                              <StatusBadge tone={priorityTone[order.priority]}>{order.priority}</StatusBadge>
                            </div>
                            <h4 className="text-sm font-semibold leading-snug text-white">{order.title}</h4>
                            <p className="mt-2 text-xs text-gray-400">{order.clientName}</p>
                            <div className="mt-4 h-2 rounded-full bg-white/5">
                              <div className="h-full rounded-full bg-brand" style={{ width: `${order.progress}%` }} />
                            </div>
                            <p className="mt-2 text-xs text-gray-500">Prazo: {order.deadline}</p>
                          </button>

                          <div className="mt-4 flex gap-2">
                            <button
                              type="button"
                              onClick={() => advanceProductionOrder(order.id)}
                              className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                            >
                              Avançar <ArrowRight size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => { setSelectedId(order.id); setShowNoteModal(true); }}
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                              aria-label="Adicionar observação"
                            >
                              <MessageSquare size={14} />
                            </button>
                          </div>
                        </article>
                      ))}

                      {columnOrders.length === 0 && (
                        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-white/10 p-4 text-center text-xs text-gray-500">
                          Nenhum pedido nesta etapa.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <aside className="rounded-xl border border-white/10 bg-card p-6">
            {selected ? (
              <div className="flex h-full flex-col">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-gray-500">{selected.id}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{selected.title}</h3>
                  </div>
                  <StatusBadge tone={priorityTone[selected.priority]}>{selected.priority}</StatusBadge>
                </div>

                <div className="grid gap-3 text-sm">
                  <Info label="Cliente" value={selected.clientName} />
                  <Info label="Orçamento" value={selected.quoteId} />
                  <Info label="Vendedor" value={selected.seller} />
                  <Info label="Prazo" value={selected.deadline} />
                  <Info label="Pagamento" value={selected.paymentStatus} />
                  <Info label="Status" value={selected.status} />
                </div>

                <label className="mt-5 flex flex-col gap-2 text-sm">
                  <span className="text-gray-400">Mover para etapa</span>
                  <select
                    value={selected.status}
                    onChange={(event) => moveProductionOrder(selected.id, event.target.value as ProductionStatus)}
                    className="rounded-lg border border-white/10 bg-[#070B1D] px-3 py-2.5 text-gray-200 outline-none focus:border-brand"
                  >
                    {productionStatuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </label>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white">Observações</h4>
                    <button type="button" onClick={() => setShowNoteModal(true)} className="text-xs text-brand hover:text-brandHover">
                      Adicionar
                    </button>
                  </div>
                  <div className="max-h-56 space-y-2 overflow-auto">
                    {selected.notes.length === 0 && (
                      <p className="rounded-lg border border-white/10 bg-[#070B1D] p-4 text-sm text-gray-500">
                        Sem observações ainda.
                      </p>
                    )}
                    {selected.notes.map((item, index) => (
                      <p key={index} className="rounded-lg border border-white/10 bg-[#070B1D] p-3 text-sm text-gray-300">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Selecione um pedido.</p>
            )}
          </aside>
        </div>
      </div>

      <Modal
        title="Nova ordem de produção"
        open={showNewModal}
        onClose={() => setShowNewModal(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowNewModal(false)}>Cancelar</Button>
            <Button type="submit" form="new-production-form">Criar ordem</Button>
          </>
        }
      >
        <form id="new-production-form" onSubmit={createOrder} className="grid gap-3">
          <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Nome do projeto" value={newOrder.title} onChange={(event) => setNewOrder({ ...newOrder, title: event.target.value })} />
          <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Cliente" value={newOrder.clientName} onChange={(event) => setNewOrder({ ...newOrder, clientName: event.target.value })} />
          <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Orçamento" value={newOrder.quoteId} onChange={(event) => setNewOrder({ ...newOrder, quoteId: event.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Prazo" value={newOrder.deadline} onChange={(event) => setNewOrder({ ...newOrder, deadline: event.target.value })} />
            <select className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" value={newOrder.priority} onChange={(event) => setNewOrder({ ...newOrder, priority: event.target.value as Priority })}>
              <option value="Baixa">Baixa</option>
              <option value="Normal">Normal</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
        </form>
      </Modal>

      <Modal
        title="Adicionar observação"
        open={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowNoteModal(false)}>Cancelar</Button>
            <Button onClick={saveNote}>Salvar</Button>
          </>
        }
      >
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Descreva a atualização da produção..."
          className="h-32 w-full resize-none rounded-lg border border-white/10 bg-[#070B1D] p-3 text-sm text-white outline-none focus:border-brand"
          autoFocus
        />
      </Modal>
    </DashboardLayout>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#070B1D] px-3 py-2.5">
      <span className="text-gray-500">{label}</span>
      <strong className="text-right text-gray-200">{value}</strong>
    </div>
  );
}
