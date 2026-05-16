"use client";

import { FormEvent, useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { useErpStore } from "@/stores/useErpStore";
import { Cuboid, Plus, Search } from "lucide-react";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function CatalogoPage() {
  const catalog = useErpStore((state) => state.catalog);
  const addCatalogModel = useErpStore((state) => state.addCatalogModel);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "Colecionável",
    material: "Resina",
    basePrice: 0,
    status: "Disponível" as const,
  });

  const categories = useMemo(() => ["Todas", ...Array.from(new Set(catalog.map((item) => item.category)))], [catalog]);
  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return catalog.filter((item) => {
      const matchesSearch = !needle || item.name.toLowerCase().includes(needle) || item.material.toLowerCase().includes(needle);
      const matchesCategory = category === "Todas" || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [catalog, category, search]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim()) return;
    addCatalogModel(form);
    setForm({ name: "", category: "Colecionável", material: "Resina", basePrice: 0, status: "Disponível" });
    setShowModal(false);
  }

  return (
    <DashboardLayout>
      <div className="flex max-w-7xl flex-col gap-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-2xl font-semibold text-white">Catálogo 3D</h2>
            <p className="mt-1 text-sm text-gray-400">Modelos sem imagens externas para carregar rápido e testar fluxo.</p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus size={16} className="mr-2" />
            Novo modelo
          </Button>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-card p-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar modelo..." className="w-full rounded-lg border border-white/10 bg-[#070B1D] py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-brand" />
          </div>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-lg border border-white/10 bg-[#070B1D] px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-brand">
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((model) => (
            <article key={model.id} className="rounded-xl border border-white/10 bg-card p-5 transition-colors hover:border-brand/40">
              <div className="mb-5 flex h-28 items-center justify-center rounded-lg border border-white/10 bg-[#070B1D] text-brand">
                <Cuboid size={42} />
              </div>
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">{model.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{model.category} · {model.material}</p>
                </div>
                <StatusBadge tone={model.status === "Disponível" ? "green" : model.status === "Revisão" ? "yellow" : "gray"}>{model.status}</StatusBadge>
              </div>
              <p className="text-2xl font-semibold text-white">{currency.format(model.basePrice)}</p>
            </article>
          ))}
        </div>
      </div>

      <Modal
        title="Novo modelo"
        open={showModal}
        onClose={() => setShowModal(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button type="submit" form="catalog-form">Salvar</Button>
          </>
        }
      >
        <form id="catalog-form" onSubmit={handleSubmit} className="grid gap-3">
          <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Nome do modelo" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Categoria" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} />
          <input className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Material" value={form.material} onChange={(event) => setForm({ ...form, material: event.target.value })} />
          <input type="number" min="0" step="0.01" className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" placeholder="Preço base" value={form.basePrice} onChange={(event) => setForm({ ...form, basePrice: Number(event.target.value) })} />
        </form>
      </Modal>
    </DashboardLayout>
  );
}
