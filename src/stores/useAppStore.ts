"use client";

import { create } from "zustand";

type AppState = {
  sidebarOpen: boolean;
  currentProject: unknown | null;
  toast: string | null;
  setSidebarOpen: (value: boolean) => void;
  toggleSidebar: () => void;
  setCurrentProject: (project: unknown) => void;
  setToast: (message: string | null) => void;
};

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  currentProject: null,
  toast: null,

  setSidebarOpen: (value) => set({ sidebarOpen: value }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setCurrentProject: (project) => set({ currentProject: project }),
  setToast: (message) => set({ toast: message }),
}));
