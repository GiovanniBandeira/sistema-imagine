'use client';
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PricingForm from '@/modules/pricing/components/PricingForm';
import ProfitPreview from '@/modules/pricing/components/ProfitPreview';
import PricingHistoryTable from '@/modules/pricing/components/PricingHistoryTable';
import { usePricing } from '@/modules/pricing/hooks/usePricing';

export default function PricingPage() {
  const {
    pricingInput,
    setPricingInput,
    result,
    calculate,
    savePricing,
    loading,
    error,
    history,
  } = usePricing();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-5xl mx-auto p-4">
        <h2 className="text-2xl font-semibold text-white">Precificação</h2>

        {/* Form */}
        <PricingForm
          input={pricingInput}
          setInput={setPricingInput}
          onSubmit={calculate}
          loading={loading}
        />

        {/* Result preview */}
        {result && (
          <ProfitPreview result={result} />
        )}

        {/* Save button */}
        {result && (
          <button
            onClick={savePricing}
            disabled={loading}
            className="mt-4 px-6 py-2 bg-brand hover:bg-brandHover text-[#0f1015] font-semibold rounded-lg transition-colors"
          >
            Salvar Orçamento
          </button>
        )}

        {/* History */}
        <section className="mt-8">
          <h3 className="text-xl font-medium text-white mb-4">Histórico de Precificações</h3>
          {error && <p className="text-red-400">{error}</p>}
          <PricingHistoryTable data={history} loading={loading} />
        </section>
      </div>
    </DashboardLayout>
  );
}
