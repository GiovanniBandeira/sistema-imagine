'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Bell, Search, Box } from 'lucide-react';

const titleMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/producao': 'Produção',
  '/orcamentos': 'Orçamentos',
  '/precificacao': 'Calculadora de Precificação',
  '/estoque': 'Estoque',
  '/catalogo': 'Catálogo 3D',
  '/crm': 'Clientes (CRM)',
  '/financeiro': 'Financeiro',
  '/relatorios': 'Relatórios',
  '/configuracoes': 'Configurações',
};

export default function Header() {
  const pathname = usePathname();
  const title = titleMap[pathname] ?? pathname.replace('/', '').toUpperCase();

  return (
    <header className="h-20 border-b border-white/5 bg-[#070B1D] flex items-center justify-between px-8 shrink-0">
      <h1 className="text-2xl font-bebas tracking-widest text-white">
        {title}
      </h1>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-gray-400">
          <Box size={20} className="hover:text-white cursor-pointer transition-colors" />
          <Search size={20} className="hover:text-white cursor-pointer transition-colors" />
          <div className="relative">
            <Bell size={20} className="hover:text-white cursor-pointer transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
          </div>
        </div>

        <div className="h-8 w-px bg-white/10" />

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-bold">
            AM
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white leading-tight">Admin Master</span>
            <span className="text-xs text-gray-400">admin@imagine3d.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}