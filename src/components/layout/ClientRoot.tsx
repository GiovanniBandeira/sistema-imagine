"use client";

import { usePathname } from "next/navigation";
import AppShell from "./AppShell";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <>{children}</>;
  }

  return <AppShell>{children}</AppShell>;
}
