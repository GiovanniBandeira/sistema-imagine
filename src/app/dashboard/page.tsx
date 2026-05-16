'use client';
import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Calendar, Filter, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────
type Period = '7d' | '15d' | '30d' | '90d';

interface MetricCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

// ── Data by Period ─────────────────────────────────────────────
const METRICS_BY_PERIOD: Record<Period, MetricCard[]> = {
  '7d': [
    { label: 'Faturamento', value: 'R$ 32.150,00',  change: '+8.2%',  positive: true },
    { label: 'Orçamentos',  value: '12',             change: '+5.0%',  positive: true },
    { label: 'Produções',   value: '8',              change: '-2.1%',  positive: false },
    { label: 'Ticket Médio',value: 'R$ 410,50',      change: '+12.3%', positive: true },
  ],
  '15d': [
    { label: 'Faturamento', value: 'R$ 64.320,25',  change: '+10.1%', positive: true },
    { label: 'Orçamentos',  value: '23',             change: '+6.8%',  positive: true },
    { label: 'Produções',   value: '16',             change: '+9.5%',  positive: true },
    { label: 'Ticket Médio',value: 'R$ 378,20',      change: '+4.7%',  positive: true },
  ],
  '30d': [
    { label: 'Faturamento', value: 'R$ 128.430,50', change: '+12.5%', positive: true },
    { label: 'Orçamentos',  value: '48',             change: '+8.3%',  positive: true },
    { label: 'Produções',   value: '32',             change: '+15.3%', positive: true },
    { label: 'Ticket Médio',value: 'R$ 342,50',      change: '+7.1%',  positive: true },
  ],
  '90d': [
    { label: 'Faturamento', value: 'R$ 385.290,00', change: '+22.4%', positive: true },
    { label: 'Orçamentos',  value: '142',            change: '+18.2%', positive: true },
    { label: 'Produções',   value: '98',             change: '+25.7%', positive: true },
    { label: 'Ticket Médio',value: 'R$ 356,80',      change: '+9.9%',  positive: true },
  ],
};

const CHART_BY_PERIOD: Record<Period, number[]> = {
  '7d':  [45, 60, 55, 80, 70, 90, 85],
  '15d': [30, 45, 40, 60, 55, 70, 50, 80, 75, 85, 60, 90, 70, 95, 80],
  '30d': [30, 50, 40, 70, 55, 85, 60, 90, 75, 100],
  '90d': [20, 35, 45, 40, 55, 50, 70, 65, 80, 75, 90, 85, 100],
};

const PERIOD_LABELS: Record<Period, string> = {
  '7d':  'Últimos 7 dias',
  '15d': 'Últimos 15 dias',
  '30d': 'Últimos 30 dias',
  '90d': 'Últimos 90 dias',
};

const STATUS_DATA = [
  { label: 'Concluídas',   color: 'bg-brand',       count: 18, pct: '56%' },
  { label: 'Em produção',  color: 'bg-blue-500',    count: 8,  pct: '25%' },
  { label: 'Pintura',      color: 'bg-yellow-500',  count: 3,  pct: '9%'  },
  { label: 'Acabamento',   color: 'bg-red-500',     count: 2,  pct: '6%'  },
  { label: 'Fila',         color: 'bg-green-500',   count: 1,  pct: '3%'  },
];

// ── Component ──────────────────────────────────────────────────
export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>('30d');
  const [showDropdown, setShowDropdown] = useState(false);

  const metrics = METRICS_BY_PERIOD[period];
  const chartData = CHART_BY_PERIOD[period];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white tracking-wide">Dashboard</h2>
          <div className="flex items-center gap-3">
            {/* Period Selector */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 bg-card border border-white/10 px-4 py-2 rounded-lg text-sm text-gray-300 hover:border-white/20 transition"
              >
                <Calendar size={16} />
                <span>{PERIOD_LABELS[period]}</span>
                <ChevronDown size={14} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showDropdown && (
                <div className="absolute right-0 top-full mt-1 bg-[#0B1023] border border-white/10 rounded-lg overflow-hidden z-50 shadow-xl w-48">
                  {(Object.keys(PERIOD_LABELS) as Period[]).map(key => (
                    <button
                      key={key}
                      onClick={() => { setPeriod(key); setShowDropdown(false); }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition ${
                        period === key ? 'bg-brand/20 text-brand' : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      {PERIOD_LABELS[key]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-4 gap-6">
          {metrics.map((stat, i) => (
            <div key={i} className="bg-card border border-white/5 rounded-xl p-6 flex flex-col gap-2 hover:border-white/10 transition">
              <span className="text-sm text-gray-400">{stat.label}</span>
              <span className="text-2xl font-bold text-white tracking-wide">{stat.value}</span>
              <div className={`flex items-center gap-1 text-xs mt-2 ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{stat.change}</span>
                <span className="text-gray-500 ml-1">vs período anterior</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6 h-96">
          {/* Bar Chart */}
          <div className="col-span-2 bg-card border border-white/5 rounded-xl p-6 flex flex-col">
            <span className="text-sm font-medium text-white mb-6">Faturamento — {PERIOD_LABELS[period]}</span>
            <div className="flex-1 relative w-full flex items-end justify-between px-2 gap-1">
              <div className="absolute inset-0 bg-gradient-to-t from-brand/10 to-transparent rounded-t-lg" />
              {chartData.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-brand/80 rounded-t-sm z-10 transition-all duration-500 hover:bg-brand"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Donut Chart */}
          <div className="col-span-1 bg-card border border-white/5 rounded-xl p-6 flex flex-col">
            <span className="text-sm font-medium text-white mb-6">Produções por Status</span>
            <div className="flex-1 flex items-center justify-center relative">
              <svg className="w-48 h-48" viewBox="0 0 100 100">
                {(() => {
                  const total = STATUS_DATA.reduce((sum, d) => sum + d.count, 0);
                  const colors = ['#08F868', '#3b82f6', '#eab308', '#ef4444', '#22c55e'];
                  let cumulative = 0;
                  return STATUS_DATA.map((d, i) => {
                    const pct = d.count / total;
                    const start = cumulative;
                    cumulative += pct;
                    const r = 40;
                    const circumference = 2 * Math.PI * r;
                    return (
                      <circle
                        key={i}
                        cx="50" cy="50" r={r} fill="none"
                        stroke={colors[i]} strokeWidth="10"
                        strokeDasharray={`${pct * circumference} ${circumference}`}
                        strokeDashoffset={`${-start * circumference}`}
                        transform="rotate(-90 50 50)"
                      />
                    );
                  });
                })()}
                <text x="50" y="50" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">32</text>
                <text x="50" y="62" textAnchor="middle" fill="#9ca3af" fontSize="8">Total</text>
              </svg>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {STATUS_DATA.map(item => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-sm ${item.color}`} />
                    <span className="text-gray-300">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white">{item.count}</span>
                    <span className="text-gray-500">({item.pct})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
