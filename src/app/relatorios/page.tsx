"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAppStore } from "@/stores/useAppStore";
import { useErpStore } from "@/stores/useErpStore";
import { BadgeDollarSign, Boxes, ChevronRight, Download, Factory, FileText, Users } from "lucide-react";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const reports = [
  { id: "financeiro", title: "Faturamento", desc: "Receitas, despesas e resultado.", icon: BadgeDollarSign },
  { id: "producao", title: "Produção", desc: "Pedidos por etapa e prioridade.", icon: Factory },
  { id: "crm", title: "Clientes", desc: "Clientes, fornecedores e afiliados.", icon: Users },
  { id: "estoque", title: "Estoque", desc: "Materiais, mínimos e valor parado.", icon: Boxes },
  { id: "orcamentos", title: "Orçamentos", desc: "Pipeline comercial por status.", icon: FileText },
];

export default function RelatoriosPage() {
  const setToast = useAppStore((state) => state.setToast);
  const quotes = useErpStore((state) => state.quotes);
  const productionOrders = useErpStore((state) => state.productionOrders);
  const clients = useErpStore((state) => state.clients);
  const inventory = useErpStore((state) => state.inventory);
  const financialEntries = useErpStore((state) => state.financialEntries);

  const revenue = financialEntries.filter((entry) => entry.type === "Receita").reduce((sum, entry) => sum + entry.amount, 0);
  const expenses = financialEntries.filter((entry) => entry.type === "Despesa").reduce((sum, entry) => sum + entry.amount, 0);

  function exportReport(title: string) {
    setToast(`${title} exportado localmente`);
    window.setTimeout(() => setToast(null), 2400);
  }

  return (
    <DashboardLayout>
      <div className="flex max-w-6xl flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Relatórios</h2>
          <p className="mt-1 text-sm text-gray-400">Resumo operacional pronto para plugar em CSV/PDF depois.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Metric label="Resultado" value={currency.format(revenue - expenses)} />
          <Metric label="Clientes" value={String(clients.length)} />
          <Metric label="Pedidos ativos" value={String(productionOrders.filter((order) => order.status !== "Entregue").length)} />
          <Metric label="Itens estoque" value={String(inventory.length)} />
        </div>

        <section className="grid gap-4">
          {reports.map((report) => (
            <article key={report.id} className="flex flex-col gap-4 rounded-xl border border-white/10 bg-card p-5 transition-colors hover:border-brand/40 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-brand/20 bg-brand/10 text-brand">
                  <report.icon size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-white">{report.title}</h3>
                    <StatusBadge tone="green">Pronto</StatusBadge>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">{report.desc}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => exportReport(report.title)}>
                  <Download size={15} className="mr-2" />
                  Exportar
                </Button>
                <Button variant="ghost">
                  Abrir <ChevronRight size={15} className="ml-1" />
                </Button>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-xl border border-white/10 bg-card p-6">
          <h3 className="mb-4 font-semibold text-white">Pipeline de orçamentos</h3>
          <div className="grid gap-3 sm:grid-cols-4">
            {(["Rascunho", "Enviado", "Aprovado", "Expirado"] as const).map((status) => (
              <div key={status} className="rounded-lg border border-white/10 bg-[#070B1D] p-4">
                <span className="text-sm text-gray-400">{status}</span>
                <strong className="mt-2 block text-2xl text-white">{quotes.filter((quote) => quote.status === status).length}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-card p-5">
      <span className="text-sm text-gray-400">{label}</span>
      <strong className="mt-2 block text-2xl text-white">{value}</strong>
    </div>
  );
}
