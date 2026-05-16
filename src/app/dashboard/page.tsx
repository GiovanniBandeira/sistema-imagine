"use client";

import Link from "next/link";
import { useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatusBadge from "@/components/ui/StatusBadge";
import { useErpStore } from "@/stores/useErpStore";
import { ArrowUpRight, BadgeDollarSign, Boxes, Factory, FileText } from "lucide-react";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function DashboardPage() {
  const quotes = useErpStore((state) => state.quotes);
  const productionOrders = useErpStore((state) => state.productionOrders);
  const inventory = useErpStore((state) => state.inventory);
  const financialEntries = useErpStore((state) => state.financialEntries);

  const metrics = useMemo(() => {
    const revenue = financialEntries
      .filter((entry) => entry.type === "Receita")
      .reduce((sum, entry) => sum + entry.amount, 0);
    const expenses = financialEntries
      .filter((entry) => entry.type === "Despesa")
      .reduce((sum, entry) => sum + entry.amount, 0);
    const lowStock = inventory.filter((item) => item.quantity <= item.minQuantity).length;
    const activeProduction = productionOrders.filter((order) => order.status !== "Entregue").length;

    return [
      { label: "Faturamento", value: currency.format(revenue), icon: BadgeDollarSign, href: "/financeiro" },
      { label: "Lucro previsto", value: currency.format(revenue - expenses), icon: ArrowUpRight, href: "/financeiro" },
      { label: "Orçamentos", value: String(quotes.length), icon: FileText, href: "/orcamentos" },
      { label: "Produção ativa", value: String(activeProduction), icon: Factory, href: "/producao" },
      { label: "Alertas de estoque", value: String(lowStock), icon: Boxes, href: "/estoque" },
    ];
  }, [financialEntries, inventory, productionOrders, quotes]);

  const maxEntry = Math.max(...financialEntries.map((entry) => entry.amount), 1);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-2xl font-semibold text-white">Visão geral</h2>
            <p className="mt-1 text-sm text-gray-400">
              Dados ficam em memória para navegação instantânea. Firebase entra depois como sincronização.
            </p>
          </div>
          <Link
            href="/producao"
            prefetch
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand/15"
          >
            Abrir produção <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {metrics.map((metric) => (
            <Link
              key={metric.label}
              href={metric.href}
              prefetch
              className="rounded-xl border border-white/10 bg-card p-5 transition-colors hover:border-brand/40"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-brand">
                <metric.icon size={20} />
              </div>
              <span className="text-sm text-gray-400">{metric.label}</span>
              <strong className="mt-2 block text-2xl text-white">{metric.value}</strong>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(360px,0.8fr)]">
          <section className="rounded-xl border border-white/10 bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">Fluxo financeiro</h3>
              <StatusBadge tone="green">Atualizado localmente</StatusBadge>
            </div>
            <div className="flex h-64 items-end gap-3">
              {financialEntries.map((entry) => (
                <div key={entry.id} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className={`w-full rounded-t-md ${entry.type === "Receita" ? "bg-brand/80" : "bg-red-500/80"}`}
                    style={{ height: `${Math.max(12, (entry.amount / maxEntry) * 100)}%` }}
                    title={`${entry.description}: ${currency.format(entry.amount)}`}
                  />
                  <span className="text-[11px] text-gray-500">{entry.id.slice(-3)}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">Pedidos em produção</h3>
              <Link href="/producao" prefetch className="text-sm text-brand hover:text-brandHover">
                Ver todos
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {productionOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="rounded-lg border border-white/10 bg-[#070B1D] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{order.title}</p>
                      <p className="mt-1 text-xs text-gray-500">{order.clientName} · {order.deadline}</p>
                    </div>
                    <StatusBadge tone={order.priority === "Alta" ? "red" : order.priority === "Normal" ? "yellow" : "gray"}>
                      {order.priority}
                    </StatusBadge>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${order.progress}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-gray-400">{order.status} · {order.progress}%</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
