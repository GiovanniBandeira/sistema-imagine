"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAppStore } from "@/stores/useAppStore";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);

  return (
    <div className="flex h-dvh overflow-hidden bg-[#050816]">
      {sidebarOpen && <Sidebar />}

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-auto px-5 py-5 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
