import "./globals.css";

import ClientRoot from "@/components/layout/ClientRoot";
import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

export const metadata = {
  title: "Imagine Tools",
  description: "Sistema de gestão Imagine 3D",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-[#050816] text-white antialiased">
        <ThemeProvider>
          <AuthProvider>
            <ClientRoot>{children}</ClientRoot>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
