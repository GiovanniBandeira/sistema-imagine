"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, Menu, Plus, Search } from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { useAuth } from "@/providers/AuthProvider";

const titleMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/producao": "Produção",
  "/orcamentos": "Orçamentos",
  "/precificacao": "Precificação",
  "/estoque": "Estoque",
  "/catalogo": "Catálogo 3D",
  "/crm": "Clientes (CRM)",
  "/financeiro": "Financeiro",
  "/relatorios": "Relatórios",
  "/configuracoes": "Configurações",
  "/pricing": "Precificação",
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const toast = useAppStore((state) => state.toast);
  const title = titleMap[pathname] ?? pathname.replace("/", "").toUpperCase();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-white/5 bg-[#070B1D] px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Alternar menu lateral"
        >
          <Menu size={20} />
        </button>
        <h1 className="truncate font-bebas text-2xl text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        {toast && (
          <span className="hidden rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-xs font-medium text-brand lg:inline">
            {toast}
          </span>
        )}

        <div className="hidden items-center gap-3 text-gray-400 sm:flex">
          <Link
            href="/orcamentos"
            prefetch
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/5 hover:text-white"
            title="Novo orçamento"
          >
            <Plus size={19} />
          </Link>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/5 hover:text-white"
            title="Pesquisar"
          >
            <Search size={19} />
          </button>
          <div className="relative">
            <Bell size={19} className="cursor-pointer transition-colors hover:text-white" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-green-500" />
          </div>
        </div>

        <div className="hidden h-8 w-px bg-white/10 sm:block" />

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
            {user?.name?.slice(0, 2).toUpperCase() ?? "IM"}
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-medium leading-tight text-white">{user?.name ?? "Usuário"}</span>
            <span className="text-xs text-gray-400">{user?.email ?? "sem login"}</span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Sair"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
