"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#050816]">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <Header />

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
