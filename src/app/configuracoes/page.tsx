"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAppStore } from "@/stores/useAppStore";
import { Bell, Database, Save, Shield, User } from "lucide-react";

const tabs = [
  { id: "perfil", label: "Perfil", icon: User },
  { id: "notificacoes", label: "Notificações", icon: Bell },
  { id: "seguranca", label: "Segurança", icon: Shield },
  { id: "sistema", label: "Sistema", icon: Database },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function ConfiguracoesPage() {
  const setToast = useAppStore((state) => state.setToast);
  const [activeTab, setActiveTab] = useState<TabId>("perfil");
  const [profile, setProfile] = useState({
    name: "Admin Master",
    role: "Administrador",
    email: "admin@imagine3d.com",
    phone: "(11) 99999-0000",
    company: "Imagine Tools",
  });
  const [notifications, setNotifications] = useState({
    quoteEmail: true,
    productionEmail: true,
    stockEmail: false,
    financePush: true,
  });

  function save(message = "Configurações salvas") {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  }

  return (
    <DashboardLayout>
      <div className="flex max-w-6xl flex-col gap-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-2xl font-semibold text-white">Configurações</h2>
            <p className="mt-1 text-sm text-gray-400">Painel local para testar preferências, permissões e ajustes do ERP.</p>
          </div>
          <StatusBadge tone="green">Admin</StatusBadge>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-xl border border-white/10 bg-card p-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-brand/10 text-brand"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </aside>

          <section className="rounded-xl border border-white/10 bg-card p-6">
            {activeTab === "perfil" && (
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-white">Perfil do usuário</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Nome" value={profile.name} onChange={(value) => setProfile({ ...profile, name: value })} />
                  <Field label="Cargo" value={profile.role} onChange={(value) => setProfile({ ...profile, role: value })} />
                  <Field label="E-mail" value={profile.email} onChange={(value) => setProfile({ ...profile, email: value })} />
                  <Field label="Telefone" value={profile.phone} onChange={(value) => setProfile({ ...profile, phone: value })} />
                  <Field label="Empresa" value={profile.company} onChange={(value) => setProfile({ ...profile, company: value })} />
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => save("Perfil salvo")}>
                    <Save size={16} className="mr-2" />
                    Salvar alterações
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "notificacoes" && (
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-white">Notificações</h3>
                {Object.entries({
                  quoteEmail: "Novo orçamento por e-mail",
                  productionEmail: "Atualização de produção por e-mail",
                  stockEmail: "Alerta de estoque baixo",
                  financePush: "Alertas financeiros",
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between rounded-lg border border-white/10 bg-[#070B1D] p-4">
                    <span className="text-sm text-gray-300">{label}</span>
                    <button
                      type="button"
                      onClick={() => setNotifications((state) => ({ ...state, [key]: !state[key as keyof typeof state] }))}
                      className={`h-6 w-11 rounded-full p-1 transition-colors ${notifications[key as keyof typeof notifications] ? "bg-brand" : "bg-white/15"}`}
                    >
                      <span className={`block h-4 w-4 rounded-full bg-white transition-transform ${notifications[key as keyof typeof notifications] ? "translate-x-5" : ""}`} />
                    </button>
                  </div>
                ))}
                <div className="flex justify-end">
                  <Button onClick={() => save("Preferências salvas")}>Salvar preferências</Button>
                </div>
              </div>
            )}

            {activeTab === "seguranca" && (
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-white">Segurança</h3>
                <Field label="Senha atual" value="" onChange={() => undefined} type="password" />
                <Field label="Nova senha" value="" onChange={() => undefined} type="password" />
                <Field label="Confirmar senha" value="" onChange={() => undefined} type="password" />
                <div className="flex justify-end">
                  <Button onClick={() => save("Senha alterada localmente")}>Alterar senha</Button>
                </div>
              </div>
            )}

            {activeTab === "sistema" && (
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-white">Sistema & backup</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Nome público" value="Imagine Tools" onChange={() => undefined} />
                  <Field label="Fuso horário" value="America/Sao_Paulo" onChange={() => undefined} />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button variant="secondary" onClick={() => save("Backup exportado localmente")}>Exportar backup</Button>
                  <Button variant="secondary" onClick={() => save("Importação simulada")}>Importar backup</Button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-gray-400">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-white/10 bg-[#070B1D] px-4 py-2.5 text-sm text-white outline-none focus:border-brand"
      />
    </label>
  );
}
