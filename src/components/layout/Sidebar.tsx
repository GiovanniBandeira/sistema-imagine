'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Printer, 
  Package, 
  Cuboid, 
  BadgeDollarSign, 
  BarChart2, 
  Settings 
} from 'lucide-react';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/crm', label: 'CRM', icon: Users },
  { href: '/orcamentos', label: 'Orçamentos', icon: FileText },
  { href: '/producao', label: 'Produção', icon: Printer },
  { href: '/estoque', label: 'Estoque', icon: Package },
  { href: '/catalogo', label: 'Catálogo 3D', icon: Cuboid },
  { href: '/financeiro', label: 'Financeiro', icon: BadgeDollarSign },
  { href: '/relatorios', label: 'Relatórios', icon: BarChart2 },
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[#161720] border-r border-[#272733] flex flex-col">
      <div className="flex items-center justify-center px-6 h-20 border-b border-[#272733]/50">
        <img src="/Images/LogoVerde3.0.svg" alt="Imagine 3D ERP Logo" className="h-8 object-contain" />
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (pathname === '/' && item.href === '/dashboard');
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-brand text-[#0f1015]' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`font-medium ${isActive ? 'text-white' : ''}`}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}