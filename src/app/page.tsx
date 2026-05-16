"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeOff, LogIn } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@imagine3d.com");
  const [password, setPassword] = useState("imagine-admin");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login(email, password);
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#0f1015] p-4">
      <section className="w-full max-w-[410px] rounded-xl border border-[#272733] bg-[#161720] p-8 shadow-2xl">
        <div className="mb-8 flex justify-center">
          <img src="/Images/LogoVerde3.0.svg" alt="Imagine 3D ERP" className="h-12 object-contain" />
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-white">Bem-vindo de volta</h1>
          <p className="mt-2 text-sm text-gray-400">Entre para continuar no ERP Imagine Tools.</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium text-gray-300">E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-[#272733] bg-[#0f1015] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium text-gray-300">Senha</span>
            <span className="relative">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-[#272733] bg-[#0f1015] py-3 pl-4 pr-10 text-sm text-white outline-none transition-colors focus:border-brand"
              />
              <EyeOff size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </span>
          </label>

          <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-brand py-3 text-sm font-semibold text-[#0f1015] transition-colors hover:bg-brandHover">
            <LogIn size={16} />
            Entrar
          </button>
        </form>

        <p className="mt-10 text-center text-[11px] text-gray-600">
          2026 IMAGINE 3D ERP. Todos os direitos reservados.
        </p>
      </section>
    </main>
  );
}
