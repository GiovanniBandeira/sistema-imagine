"use client";

import { create } from "zustand";

export type ClientType = "Cliente" | "Fornecedor" | "Afiliado";
export type ClientStatus = "Ativo" | "Inativo";
export type QuoteStatus = "Rascunho" | "Enviado" | "Aprovado" | "Expirado";
export type ProductionStatus =
  | "Em negociação"
  | "Pagamento confirmado"
  | "Em impressão"
  | "Em fabricação"
  | "Pintura / Acabamento"
  | "Finalizado"
  | "Aguardando cliente"
  | "Entregue";
export type Priority = "Baixa" | "Normal" | "Alta";
export type InventoryType = "Resina" | "Filamento" | "Tinta" | "Embalagem" | "Ferramenta";
export type FinancialType = "Receita" | "Despesa";
export type FinancialStatus = "Pago" | "Pendente";

export const productionStatuses: ProductionStatus[] = [
  "Em negociação",
  "Pagamento confirmado",
  "Em impressão",
  "Em fabricação",
  "Pintura / Acabamento",
  "Finalizado",
  "Aguardando cliente",
  "Entregue",
];

export type Client = {
  id: string;
  name: string;
  type: ClientType;
  phone: string;
  email: string;
  city: string;
  orders: number;
  commission: number;
  status: ClientStatus;
};

export type Quote = {
  id: string;
  clientName: string;
  seller: string;
  createdAt: string;
  value: number;
  status: QuoteStatus;
};

export type ProductionOrder = {
  id: string;
  title: string;
  clientName: string;
  quoteId: string;
  seller: string;
  deadline: string;
  priority: Priority;
  paymentStatus: "Pendente" | "Confirmado";
  status: ProductionStatus;
  progress: number;
  notes: string[];
};

export type InventoryItem = {
  id: string;
  name: string;
  type: InventoryType;
  quantity: number;
  unit: string;
  minQuantity: number;
  cost: number;
};

export type CatalogModel = {
  id: string;
  name: string;
  category: string;
  material: string;
  basePrice: number;
  status: "Disponível" | "Revisão" | "Arquivado";
};

export type FinancialEntry = {
  id: string;
  type: FinancialType;
  description: string;
  category: string;
  date: string;
  amount: number;
  status: FinancialStatus;
};

type ErpState = {
  clients: Client[];
  quotes: Quote[];
  productionOrders: ProductionOrder[];
  inventory: InventoryItem[];
  catalog: CatalogModel[];
  financialEntries: FinancialEntry[];
  addClient: (client: Omit<Client, "id" | "orders"> & { orders?: number }) => void;
  addQuote: (quote: Omit<Quote, "id" | "createdAt"> & { createdAt?: string }) => void;
  updateQuoteStatus: (id: string, status: QuoteStatus) => void;
  addProductionOrder: (order: Omit<ProductionOrder, "id" | "progress" | "notes">) => void;
  moveProductionOrder: (id: string, status: ProductionStatus) => void;
  advanceProductionOrder: (id: string) => void;
  addProductionNote: (id: string, note: string) => void;
  addInventoryItem: (item: Omit<InventoryItem, "id">) => void;
  updateInventoryQuantity: (id: string, quantity: number) => void;
  addCatalogModel: (model: Omit<CatalogModel, "id">) => void;
  addFinancialEntry: (entry: Omit<FinancialEntry, "id">) => void;
  updateFinancialStatus: (id: string, status: FinancialStatus) => void;
};

const makeId = (prefix: string) => `${prefix}-${Date.now().toString(36).toUpperCase().slice(-5)}`;

const progressByStatus: Record<ProductionStatus, number> = {
  "Em negociação": 8,
  "Pagamento confirmado": 18,
  "Em impressão": 38,
  "Em fabricação": 55,
  "Pintura / Acabamento": 72,
  Finalizado: 88,
  "Aguardando cliente": 94,
  Entregue: 100,
};

export const useErpStore = create<ErpState>((set) => ({
  clients: [
    { id: "CLI-001", name: "João Silva", type: "Cliente", phone: "(11) 99999-1111", email: "joao@email.com", city: "São Paulo", orders: 12, commission: 0, status: "Ativo" },
    { id: "CLI-002", name: "Maria Santos", type: "Cliente", phone: "(11) 99999-2222", email: "maria@email.com", city: "Campinas", orders: 8, commission: 0, status: "Ativo" },
    { id: "AFL-001", name: "Lucas Martins", type: "Afiliado", phone: "(11) 99999-5555", email: "lucas@email.com", city: "Santo André", orders: 10, commission: 7, status: "Ativo" },
    { id: "FOR-001", name: "Resinas Brasil", type: "Fornecedor", phone: "(11) 3333-4000", email: "vendas@resinas.com", city: "Guarulhos", orders: 0, commission: 0, status: "Ativo" },
  ],
  quotes: [
    { id: "OR-2026-158", clientName: "João Silva", seller: "Admin Master", createdAt: "10/05/2026", value: 1250, status: "Aprovado" },
    { id: "OR-2026-157", clientName: "Maria Santos", seller: "Admin Master", createdAt: "09/05/2026", value: 980.5, status: "Enviado" },
    { id: "OR-2026-156", clientName: "Pedro Almeida", seller: "Lucas Martins", createdAt: "08/05/2026", value: 2350, status: "Rascunho" },
    { id: "OR-2026-155", clientName: "Ana Costa", seller: "Admin Master", createdAt: "07/05/2026", value: 450, status: "Expirado" },
  ],
  productionOrders: [
    { id: "P-2026-001", title: "Personagem anime em resina", clientName: "João Silva", quoteId: "OR-2026-158", seller: "Admin Master", deadline: "23/05/2026", priority: "Alta", paymentStatus: "Confirmado", status: "Pintura / Acabamento", progress: 72, notes: ["Pintura base finalizada."] },
    { id: "P-2026-002", title: "Peça industrial PETG", clientName: "Maria Santos", quoteId: "OR-2026-157", seller: "Admin Master", deadline: "28/05/2026", priority: "Normal", paymentStatus: "Confirmado", status: "Em impressão", progress: 38, notes: [] },
    { id: "P-2026-003", title: "Protótipo funcional", clientName: "Ana Costa", quoteId: "OR-2026-155", seller: "Admin Master", deadline: "30/05/2026", priority: "Baixa", paymentStatus: "Pendente", status: "Em negociação", progress: 8, notes: [] },
    { id: "P-2026-004", title: "Estátua colecionável 30 cm", clientName: "Pedro Almeida", quoteId: "OR-2026-156", seller: "Lucas Martins", deadline: "21/05/2026", priority: "Alta", paymentStatus: "Confirmado", status: "Em fabricação", progress: 55, notes: ["Separar base antes do acabamento."] },
  ],
  inventory: [
    { id: "MAT-001", name: "Resina Padrão Cinza", type: "Resina", quantity: 2.5, unit: "kg", minQuantity: 1, cost: 96 },
    { id: "MAT-002", name: "Resina ABS Like", type: "Resina", quantity: 1.2, unit: "kg", minQuantity: 1, cost: 138 },
    { id: "MAT-003", name: "Resina Flexível", type: "Resina", quantity: 0.3, unit: "kg", minQuantity: 0.8, cost: 165 },
    { id: "MAT-004", name: "Filamento PLA Preto", type: "Filamento", quantity: 5, unit: "kg", minQuantity: 1.5, cost: 78 },
    { id: "MAT-005", name: "Caixas 20x20", type: "Embalagem", quantity: 42, unit: "un", minQuantity: 20, cost: 3.4 },
  ],
  catalog: [
    { id: "MOD-001", name: "Engrenagem personalizada", category: "Mecânica", material: "PETG", basePrice: 89, status: "Disponível" },
    { id: "MOD-002", name: "Estátua dragão", category: "Colecionável", material: "Resina", basePrice: 349, status: "Disponível" },
    { id: "MOD-003", name: "Copo texturizado", category: "Utilitário", material: "PLA", basePrice: 59, status: "Revisão" },
    { id: "MOD-004", name: "Capacete sci-fi", category: "Cosplay", material: "PLA", basePrice: 680, status: "Disponível" },
  ],
  financialEntries: [
    { id: "FIN-001", type: "Receita", description: "Pedido OR-2026-158", category: "Vendas", date: "10/05/2026", amount: 1250, status: "Pago" },
    { id: "FIN-002", type: "Receita", description: "Pedido OR-2026-157", category: "Vendas", date: "09/05/2026", amount: 980.5, status: "Pendente" },
    { id: "FIN-003", type: "Despesa", description: "Compra de resina", category: "Materiais", date: "06/05/2026", amount: 420, status: "Pago" },
    { id: "FIN-004", type: "Despesa", description: "Energia / oficina", category: "Operacional", date: "05/05/2026", amount: 310, status: "Pendente" },
  ],

  addClient: (client) =>
    set((state) => ({
      clients: [{ ...client, id: makeId(client.type === "Afiliado" ? "AFL" : client.type === "Fornecedor" ? "FOR" : "CLI"), orders: client.orders ?? 0 }, ...state.clients],
    })),

  addQuote: (quote) =>
    set((state) => ({
      quotes: [{ ...quote, id: makeId("OR"), createdAt: quote.createdAt ?? new Date().toLocaleDateString("pt-BR") }, ...state.quotes],
    })),

  updateQuoteStatus: (id, status) =>
    set((state) => ({
      quotes: state.quotes.map((quote) => (quote.id === id ? { ...quote, status } : quote)),
    })),

  addProductionOrder: (order) =>
    set((state) => ({
      productionOrders: [
        { ...order, id: makeId("P"), progress: progressByStatus[order.status], notes: [] },
        ...state.productionOrders,
      ],
    })),

  moveProductionOrder: (id, status) =>
    set((state) => ({
      productionOrders: state.productionOrders.map((order) =>
        order.id === id ? { ...order, status, progress: progressByStatus[status] } : order,
      ),
    })),

  advanceProductionOrder: (id) =>
    set((state) => ({
      productionOrders: state.productionOrders.map((order) => {
        if (order.id !== id) return order;
        const nextStatus = productionStatuses[Math.min(productionStatuses.indexOf(order.status) + 1, productionStatuses.length - 1)];
        return { ...order, status: nextStatus, progress: progressByStatus[nextStatus] };
      }),
    })),

  addProductionNote: (id, note) =>
    set((state) => ({
      productionOrders: state.productionOrders.map((order) =>
        order.id === id ? { ...order, notes: [`${new Date().toLocaleString("pt-BR")} - ${note}`, ...order.notes] } : order,
      ),
    })),

  addInventoryItem: (item) =>
    set((state) => ({
      inventory: [{ ...item, id: makeId("MAT") }, ...state.inventory],
    })),

  updateInventoryQuantity: (id, quantity) =>
    set((state) => ({
      inventory: state.inventory.map((item) => (item.id === id ? { ...item, quantity } : item)),
    })),

  addCatalogModel: (model) =>
    set((state) => ({
      catalog: [{ ...model, id: makeId("MOD") }, ...state.catalog],
    })),

  addFinancialEntry: (entry) =>
    set((state) => ({
      financialEntries: [{ ...entry, id: makeId("FIN") }, ...state.financialEntries],
    })),

  updateFinancialStatus: (id, status) =>
    set((state) => ({
      financialEntries: state.financialEntries.map((entry) => (entry.id === id ? { ...entry, status } : entry)),
    })),
}));
