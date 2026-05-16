"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeDollarSign,
  BarChart2,
  Calculator,
  Cuboid,
  FileText,
  LayoutDashboard,
  Package,
  Printer,
  Settings,
  Users,
} from "lucide-react";

const links = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Precificação", href: "/precificacao", icon: Calculator },
  { label: "Orçamentos", href: "/orcamentos", icon: FileText },
  { label: "Produção", href: "/producao", icon: Printer },
  { label: "CRM", href: "/crm", icon: Users },
  { label: "Estoque", href: "/estoque", icon: Package },
  { label: "Catálogo 3D", href: "/catalogo", icon: Cuboid },
  { label: "Financeiro", href: "/financeiro", icon: BadgeDollarSign },
  { label: "Relatórios", href: "/relatorios", icon: BarChart2 },
  { label: "Configurações", href: "/configuracoes", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[260px] min-w-[260px] flex-col border-r border-white/10 bg-[#070B1D] md:flex">
      <div className="flex h-20 items-center justify-center border-b border-white/5 px-6">
        <img
          src="/Images/LogoVerde3.0.svg"
          alt="Imagine 3D"
          className="h-8 object-contain"
        />
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        {links.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname === "/" && item.href === "/dashboard");

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand text-black"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
