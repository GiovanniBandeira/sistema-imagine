'use client';
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Settings, User, Bell, Shield, Database, Eye, EyeOff, Save, Trash2 } from 'lucide-react';

const tabs = [
  { id: 'perfil', label: 'Perfil do Usuário', icon: User },
  { id: 'notificacoes', label: 'Notificações', icon: Bell },
  { id: 'seguranca', label: 'Segurança', icon: Shield },
  { id: 'sistema', label: 'Sistema & Backup', icon: Database },
];

function TabPerfil() {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-bebas tracking-wider text-white">Perfil do Usuário</h3>
      <div className="flex items-center gap-6 mb-2">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand">
          <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div>
          <button className="bg-brand/10 border border-brand/30 text-brand px-4 py-2 rounded-lg text-sm hover:bg-brand/20 transition-colors">Alterar Foto</button>
          <p className="text-xs text-gray-500 mt-2">JPG, PNG ou GIF. Máximo 2MB.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-400">Nome</label>
          <input type="text" defaultValue="Admin Master" className="w-full bg-[#0f111a] border border-[#4E4E4E] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-400">Cargo</label>
          <input type="text" defaultValue="Administrador" className="w-full bg-[#0f111a] border border-[#4E4E4E] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand" />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-sm font-medium text-gray-400">E-mail</label>
          <input type="email" defaultValue="admin@imagine3d.com" className="w-full bg-[#0f111a] border border-[#4E4E4E] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-400">Telefone</label>
          <input type="text" defaultValue="(11) 99999-0000" className="w-full bg-[#0f111a] border border-[#4E4E4E] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-400">Nome da Empresa</label>
          <input type="text" defaultValue="IMAGINE 3D ERP" className="w-full bg-[#0f111a] border border-[#4E4E4E] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand" />
        </div>
      </div>
      <div className="mt-2 flex justify-end gap-4 pt-4 border-t border-[#4E4E4E]/30">
        <button className="px-6 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors">Cancelar</button>
        <button className="flex items-center gap-2 bg-brand hover:bg-brandHover text-[#0f1015] font-semibold px-6 py-2 rounded-lg text-sm transition-colors">
          <Save size={16} /> Salvar Alterações
        </button>
      </div>
    </div>
  );
}

function TabNotificacoes() {
  const [settings, setSettings] = useState({
    emailOrçamento: true,
    emailProducao: true,
    emailEstoque: false,
    pushNovoPedido: true,
    pushStatus: false,
    pushFinanceiro: true,
  });
  const toggle = (key: keyof typeof settings) => setSettings(s => ({ ...s, [key]: !s[key] }));

  const Toggle = ({ id }: { id: keyof typeof settings }) => (
    <button onClick={() => toggle(id)} className={`relative w-12 h-6 rounded-full transition-colors ${settings[id] ? 'bg-brand' : 'bg-[#4E4E4E]'}`}>
      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${settings[id] ? 'left-7' : 'left-1'}`}></span>
    </button>
  );

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-bebas tracking-wider text-white">Notificações</h3>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-gray-300 mb-3">E-mail</p>
        {[
          { id: 'emailOrçamento', label: 'Novo orçamento criado', desc: 'Receba um e-mail ao criar um orçamento.' },
          { id: 'emailProducao', label: 'Atualização de produção', desc: 'Receba alertas de mudança de status.' },
          { id: 'emailEstoque', label: 'Estoque crítico', desc: 'Alerta quando item atingir nível mínimo.' },
        ].map(item => (
          <div key={item.id} className="flex items-center justify-between py-4 border-b border-[#4E4E4E]/30">
            <div><p className="text-sm text-gray-200">{item.label}</p><p className="text-xs text-gray-500 mt-0.5">{item.desc}</p></div>
            <Toggle id={item.id as keyof typeof settings} />
          </div>
        ))}
        <p className="text-sm font-medium text-gray-300 mt-5 mb-3">Push</p>
        {[
          { id: 'pushNovoPedido', label: 'Novo pedido recebido', desc: 'Notificação em tempo real.' },
          { id: 'pushStatus', label: 'Mudança de status', desc: 'Quando um projeto mudar de etapa.' },
          { id: 'pushFinanceiro', label: 'Alertas financeiros', desc: 'Pagamentos e receitas.' },
        ].map(item => (
          <div key={item.id} className="flex items-center justify-between py-4 border-b border-[#4E4E4E]/30">
            <div><p className="text-sm text-gray-200">{item.label}</p><p className="text-xs text-gray-500 mt-0.5">{item.desc}</p></div>
            <Toggle id={item.id as keyof typeof settings} />
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-2">
        <button className="flex items-center gap-2 bg-brand hover:bg-brandHover text-[#0f1015] font-semibold px-6 py-2 rounded-lg text-sm transition-colors">
          <Save size={16} /> Salvar Preferências
        </button>
      </div>
    </div>
  );
}

function TabSeguranca() {
  const [show, setShow] = useState({ atual: false, nova: false, conf: false });
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-bebas tracking-wider text-white">Segurança</h3>
      <div className="flex flex-col gap-4">
        {[
          { id: 'atual', label: 'Senha Atual' },
          { id: 'nova', label: 'Nova Senha' },
          { id: 'conf', label: 'Confirmar Nova Senha' },
        ].map(f => (
          <div key={f.id} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400">{f.label}</label>
            <div className="relative">
              <input type={show[f.id as keyof typeof show] ? 'text' : 'password'} placeholder="••••••••" className="w-full bg-[#0f111a] border border-[#4E4E4E] rounded-lg pl-4 pr-12 py-2.5 text-sm text-white focus:outline-none focus:border-brand" />
              <button onClick={() => setShow(s => ({ ...s, [f.id]: !s[f.id as keyof typeof show] }))} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                {show[f.id as keyof typeof show] ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center pt-4 border-t border-[#4E4E4E]/30 mt-2">
          <button className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition-colors">
            <Trash2 size={16} /> Encerrar todas as sessões
          </button>
          <button className="flex items-center gap-2 bg-brand hover:bg-brandHover text-[#0f1015] font-semibold px-6 py-2 rounded-lg text-sm transition-colors">
            <Save size={16} /> Alterar Senha
          </button>
        </div>
      </div>
    </div>
  );
}

function TabSistema() {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-bebas tracking-wider text-white">Sistema & Backup</h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-400">Nome da Empresa</label>
          <input type="text" defaultValue="IMAGINE 3D ERP" className="w-full bg-[#0f111a] border border-[#4E4E4E] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-400">E-mail de Contato</label>
          <input type="email" defaultValue="admin@imagine3d.com" className="w-full bg-[#0f111a] border border-[#4E4E4E] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-400">Fuso Horário</label>
          <select className="w-full bg-[#0f111a] border border-[#4E4E4E] rounded-lg px-4 py-2.5 text-sm text-gray-300 appearance-none focus:outline-none focus:border-brand">
            <option>Horário de Brasília (BRT)</option>
            <option>PST</option>
            <option>EST</option>
          </select>
        </div>
        <div className="pt-4 border-t border-[#4E4E4E]/30">
          <p className="text-sm font-medium text-gray-300 mb-3">Backup dos Dados</p>
          <div className="flex gap-3">
            <button className="flex-1 bg-[#0f111a] border border-[#4E4E4E] hover:border-brand text-gray-300 hover:text-white py-2.5 rounded-lg text-sm transition-colors">Exportar Backup</button>
            <button className="flex-1 bg-[#0f111a] border border-[#4E4E4E] hover:border-brand text-gray-300 hover:text-white py-2.5 rounded-lg text-sm transition-colors">Importar Backup</button>
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-2">
          <button className="px-6 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors">Cancelar</button>
          <button className="flex items-center gap-2 bg-brand hover:bg-brandHover text-[#0f1015] font-semibold px-6 py-2 rounded-lg text-sm transition-colors">
            <Save size={16} /> Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState('perfil');

  const contentMap: Record<string, React.ReactNode> = {
    perfil: <TabPerfil />,
    notificacoes: <TabNotificacoes />,
    seguranca: <TabSeguranca />,
    sistema: <TabSistema />,
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-5xl">

        <div className="flex gap-8">
          {/* Sidebar Menu */}
          <div className="w-64 bg-card border border-[#4E4E4E]/40 rounded-xl p-4 flex flex-col gap-2 h-fit shrink-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-brand/10 text-brand border border-brand/20'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Settings Content */}
          <div className="flex-1 bg-card border border-[#4E4E4E]/40 rounded-xl p-8 min-h-[480px]">
            {contentMap[activeTab]}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
