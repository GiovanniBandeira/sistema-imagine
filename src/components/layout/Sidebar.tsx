"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Printer,
  Package,
  Cuboid,
  BadgeDollarSign,
  BarChart2,
  Settings,
} from "lucide-react";

const links = [
  { label: "Dashboard",      href: "/dashboard",      icon: LayoutDashboard },
  { label: "CRM",            href: "/crm",            icon: Users },
  { label: "Orçamentos",     href: "/orcamentos",     icon: FileText },
  { label: "Produção",       href: "/producao",        icon: Printer },
  { label: "Estoque",        href: "/estoque",         icon: Package },
  { label: "Catálogo 3D",    href: "/catalogo",        icon: Cuboid },
  { label: "Financeiro",     href: "/financeiro",      icon: BadgeDollarSign },
  { label: "Relatórios",     href: "/relatorios",      icon: BarChart2 },
  { label: "Configurações",  href: "/configuracoes",   icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] min-w-[260px] border-r border-white/10 bg-[#070B1D] flex flex-col">
      <div className="flex items-center justify-center px-6 h-20 border-b border-white/5">
        <img
          src="/Images/LogoVerde3.0.svg"
          alt="Imagine 3D"
          className="h-8 object-contain"
        />
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        {links.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname === "/" && item.href === "/dashboard");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-green-500 text-black"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}