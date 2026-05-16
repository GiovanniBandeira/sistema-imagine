"use client";

import { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import { useErpStore } from "@/stores/useErpStore";
import { Calculator, FileText } from "lucide-react";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function PrecificacaoPage() {
  const addQuote = useErpStore((state) => state.addQuote);
  const [projectName, setProjectName] = useState("Personagem colecionável");
  const [clientName, setClientName] = useState("Cliente balcão");
  const [seller, setSeller] = useState("Admin Master");
  const [weight, setWeight] = useState(165);
  const [materialCostKg, setMaterialCostKg] = useState(96);
  const [printHours, setPrintHours] = useState(8.5);
  const [machineHourCost, setMachineHourCost] = useState(7.5);
  const [finishingCost, setFinishingCost] = useState(25);
  const [paintingCost, setPaintingCost] = useState(35);
  const [packagingCost, setPackagingCost] = useState(8);
  const [wastePct, setWastePct] = useState(8);
  const [commissionPct, setCommissionPct] = useState(7);
  const [investmentPct, setInvestmentPct] = useState(5);
  const [markup, setMarkup] = useState(2.8);
  const [saved, setSaved] = useState(false);

  const result = useMemo(() => {
    const materialCost = (weight / 1000) * materialCostKg;
    const machineCost = printHours * machineHourCost;
    const directCost = materialCost + machineCost + finishingCost + paintingCost + packagingCost;
    const waste = directCost * (wastePct / 100);
    const totalCost = directCost + waste;
    const sellingPrice = Math.ceil(totalCost * markup);
    const commission = sellingPrice * (commissionPct / 100);
    const investmentReserve = sellingPrice * (investmentPct / 100);
    const profit = sellingPrice - totalCost - commission - investmentReserve;
    const resellerPrice = Math.ceil(sellingPrice * 0.82);

    return { materialCost, machineCost, directCost, waste, totalCost, sellingPrice, commission, investmentReserve, profit, resellerPrice };
  }, [commissionPct, finishingCost, investmentPct, machineHourCost, markup, materialCostKg, packagingCost, paintingCost, printHours, wastePct, weight]);

  function saveQuote() {
    addQuote({
      clientName,
      seller,
      value: result.sellingPrice,
      status: "Rascunho",
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  return (
    <DashboardLayout>
      <div className="grid max-w-7xl gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="rounded-xl border border-white/10 bg-card p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">Precificação</h2>
              <p className="mt-1 text-sm text-gray-400">Cálculo local instantâneo para validar preço, margem e comissão.</p>
            </div>
            <StatusBadge tone="green">Sem requisição</StatusBadge>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <Input label="Projeto" value={projectName} onChange={setProjectName} />
            <Input label="Cliente" value={clientName} onChange={setClientName} />
            <Input label="Vendedor" value={seller} onChange={setSeller} />
            <NumberInput label="Peso impresso (g)" value={weight} onChange={setWeight} />
            <NumberInput label="Custo material / kg" value={materialCostKg} onChange={setMaterialCostKg} />
            <NumberInput label="Tempo de impressão (h)" value={printHours} onChange={setPrintHours} step="0.1" />
            <NumberInput label="Custo máquina / h" value={machineHourCost} onChange={setMachineHourCost} step="0.1" />
            <NumberInput label="Acabamento" value={finishingCost} onChange={setFinishingCost} />
            <NumberInput label="Pintura" value={paintingCost} onChange={setPaintingCost} />
            <NumberInput label="Embalagem" value={packagingCost} onChange={setPackagingCost} />
            <NumberInput label="Desperdício (%)" value={wastePct} onChange={setWastePct} />
            <NumberInput label="Comissão (%)" value={commissionPct} onChange={setCommissionPct} />
            <NumberInput label="Reserva investimento (%)" value={investmentPct} onChange={setInvestmentPct} />
            <NumberInput label="Markup" value={markup} onChange={setMarkup} step="0.1" />
          </div>
        </section>

        <aside className="flex flex-col gap-6">
          <section className="rounded-xl border border-white/10 bg-card p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Calculator size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Resumo do cálculo</h3>
                <p className="text-xs text-gray-500">{projectName}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <Row label="Material" value={currency.format(result.materialCost)} />
              <Row label="Máquina" value={currency.format(result.machineCost)} />
              <Row label="Acabamento + pintura" value={currency.format(finishingCost + paintingCost)} />
              <Row label="Embalagem" value={currency.format(packagingCost)} />
              <Row label="Desperdício" value={currency.format(result.waste)} />
              <Row label="Custo total" value={currency.format(result.totalCost)} strong />
              <Row label="Comissão" value={currency.format(result.commission)} />
              <Row label="Reserva" value={currency.format(result.investmentReserve)} />
            </div>

            <div className="mt-6 rounded-xl border border-brand/20 bg-brand/10 p-5">
              <span className="text-sm text-brand">Preço cliente final</span>
              <strong className="mt-2 block text-4xl text-white">{currency.format(result.sellingPrice)}</strong>
              <p className="mt-2 text-sm text-gray-400">Revendedor: {currency.format(result.resellerPrice)}</p>
              <p className="mt-1 text-sm text-gray-400">Lucro líquido: {currency.format(result.profit)}</p>
            </div>

            <Button onClick={saveQuote} className="mt-5 w-full">
              <FileText size={16} className="mr-2" />
              Gerar orçamento
            </Button>
            {saved && <p className="mt-3 text-center text-sm text-brand">Orçamento criado em rascunho.</p>}
          </section>
        </aside>
      </div>
    </DashboardLayout>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-gray-400">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" />
    </label>
  );
}

function NumberInput({ label, value, onChange, step = "1" }: { label: string; value: number; onChange: (value: number) => void; step?: string }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-gray-400">{label}</span>
      <input type="number" min="0" step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand" />
    </label>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3">
      <span className="text-gray-400">{label}</span>
      <span className={strong ? "font-semibold text-white" : "text-gray-200"}>{value}</span>
    </div>
  );
}
