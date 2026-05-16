"use client";

import { create } from "zustand";

type AppState = {
  sidebarOpen: boolean;
  currentProject: any | null;

  setSidebarOpen: (value: boolean) => void;
  setCurrentProject: (project: any) => void;
};

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  currentProject: null,

  setSidebarOpen: (value) =>
    set({
      sidebarOpen: value,
    }),

  setCurrentProject: (project) =>
    set({
      currentProject: project,
    }),
}));
