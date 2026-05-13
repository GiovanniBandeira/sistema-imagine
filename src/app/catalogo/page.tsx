'use client';
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Search, ChevronDown, Cuboid } from 'lucide-react';

const catalogoData = [
  { id: 1, title: 'Engrenagem', category: 'Mecânica', img: 'https://images.unsplash.com/photo-1537495329792-41ae41ad3bf0?q=80&w=400&auto=format&fit=crop' },
  { id: 2, title: 'Estátua Dragão', category: 'Colecionável', img: 'https://images.unsplash.com/photo-1590845947376-2638caa89309?q=80&w=400&auto=format&fit=crop' },
  { id: 3, title: 'Copo Texturizado', category: 'Utilitário', img: 'https://images.unsplash.com/photo-1556997685-309989c1aa82?q=80&w=400&auto=format&fit=crop' },
  { id: 4, title: 'Vaso Decorativo', category: 'Decoração', img: 'https://images.unsplash.com/photo-1578500494198-246f61cb2f04?q=80&w=400&auto=format&fit=crop' },
  { id: 5, title: 'Busto Guerreiro', category: 'Colecionável', img: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=400&auto=format&fit=crop' },
  { id: 6, title: 'Peça Motor', category: 'Mecânica', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop' },
  { id: 7, title: 'Capacete Sci-Fi', category: 'Cosplay', img: 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?q=80&w=400&auto=format&fit=crop' },
  { id: 8, title: 'Ornamento Parede', category: 'Decoração', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400&auto=format&fit=crop' },
];

export default function CatalogoPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-6xl">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-border flex items-center justify-center">
              <Cuboid size={20} className="text-gray-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Catálogo 3D</h2>
          </div>
          <button className="bg-brand hover:bg-brandHover text-[#0f1015] font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
            Novo Modelo
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Buscar modelo..." 
              className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand"
            />
          </div>
          <div className="relative w-48">
            <select className="w-full bg-card border border-border rounded-lg pl-4 pr-10 py-2.5 text-sm text-gray-300 appearance-none focus:outline-none focus:border-brand">
              <option>Todos os tipos</option>
              <option>Mecânica</option>
              <option>Colecionável</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Grid Area */}
        <div className="grid grid-cols-4 gap-6">
          {catalogoData.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-xl overflow-hidden hover:border-brand/50 transition-colors cursor-pointer group flex flex-col">
              <div className="h-48 w-full bg-[#0f1015] relative overflow-hidden flex items-center justify-center">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 mix-blend-luminosity grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="p-4 flex flex-col gap-1">
                <span className="text-sm font-semibold text-white">{item.title}</span>
                <span className="text-xs text-gray-400">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}
