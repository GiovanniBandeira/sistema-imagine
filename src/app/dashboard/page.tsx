'use client';
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Calendar, Filter, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white tracking-wide">Dashboard</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-lg text-sm text-gray-300">
              <Calendar size={16} />
              <span>01/05/2024 - 31/05/2024</span>
              <Filter size={16} className="ml-2 cursor-pointer hover:text-white" />
            </div>
            <button className="bg-brand hover:bg-brandHover text-[#0f1015] font-semibold px-6 py-2 rounded-lg text-sm transition-colors">
              Filtrar
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-4 gap-6">
          {[
            { label: 'Faturamento', value: 'R$ 128.430,50', change: '+12.5%' },
            { label: 'Orçamentos', value: '48', change: '+8.3%' },
            { label: 'Produções', value: '32', change: '+15.3%' },
            { label: 'Ticket Médio', value: 'R$ 342,50', change: '+7.1%' },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2">
              <span className="text-sm text-gray-400">{stat.label}</span>
              <span className="text-2xl font-bold text-white tracking-wide">{stat.value}</span>
              <div className="flex items-center gap-1 text-xs text-green-500 mt-2">
                <TrendingUp size={12} />
                <span>{stat.change}</span>
                <span className="text-gray-500 ml-1">vs período anterior</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6 h-96">
          {/* Line Chart Placeholder */}
          <div className="col-span-2 bg-card border border-border rounded-xl p-6 flex flex-col">
            <span className="text-sm font-medium text-white mb-6">Faturamento</span>
            <div className="flex-1 relative w-full flex items-end justify-between px-2">
               {/* Extremely simple CSS visual mock of a chart area */}
               <div className="absolute inset-0 bg-gradient-to-t from-brand/20 to-transparent border-t border-brand/50 rounded-t-lg"></div>
               {[30, 50, 40, 70, 55, 85, 60, 90, 75, 100].map((h, i) => (
                 <div key={i} className="w-2 bg-brand/80 rounded-t-sm z-10" style={{ height: `${h}%` }}></div>
               ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-500 px-2">
              <span>01/05</span><span>06/05</span><span>11/05</span><span>16/05</span><span>21/05</span><span>26/05</span><span>31/05</span>
            </div>
          </div>

          {/* Donut Chart Placeholder */}
          <div className="col-span-1 bg-card border border-border rounded-xl p-6 flex flex-col">
            <span className="text-sm font-medium text-white mb-6">Produções por Status</span>
            <div className="flex-1 flex items-center justify-center relative">
              {/* CSS Donut Mock */}
              <div className="w-48 h-48 rounded-full border-[16px] border-border relative flex items-center justify-center">
                 {/* This would be an SVG chart in real life, putting absolute colored borders for mock */}
                 <div className="absolute inset-0 rounded-full border-[16px] border-brand" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 50%)' }}></div>
                 <div className="absolute inset-0 rounded-full border-[16px] border-blue-500" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 0, 50% 0)' }}></div>
                 <div className="absolute inset-0 rounded-full border-[16px] border-yellow-500" style={{ clipPath: 'polygon(50% 50%, 50% 0, 75% 0)' }}></div>
                 <div className="absolute inset-0 rounded-full border-[16px] border-red-500" style={{ clipPath: 'polygon(50% 50%, 75% 0, 100% 0, 100% 25%)' }}></div>
                 <div className="absolute inset-0 rounded-full border-[16px] border-green-500" style={{ clipPath: 'polygon(50% 50%, 100% 25%, 100% 50%)' }}></div>
                 <div className="flex flex-col items-center justify-center">
                   <span className="text-3xl font-bold text-white">32</span>
                   <span className="text-xs text-gray-400">Total</span>
                 </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-2">
               {[
                 { label: 'Concluídas', color: 'bg-brand', count: 18, pct: '56%' },
                 { label: 'Em produção', color: 'bg-blue-500', count: 8, pct: '25%' },
                 { label: 'Pintura', color: 'bg-yellow-500', count: 3, pct: '9%' },
                 { label: 'Acabamento', color: 'bg-red-500', count: 2, pct: '6%' },
                 { label: 'Fila', color: 'bg-green-500', count: 1, pct: '3%' },
               ].map(item => (
                 <div key={item.label} className="flex items-center justify-between text-xs">
                   <div className="flex items-center gap-2">
                     <span className={`w-3 h-3 rounded-sm ${item.color}`}></span>
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
