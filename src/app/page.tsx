'use client';
import React from 'react';
import Link from 'next/link';
import { Cuboid, EyeOff } from 'lucide-react';

export default function LoginPage() {
  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#0f1015] flex flex-col items-center justify-center p-4 font-sans">
      
      <div className="w-full max-w-[400px] bg-[#161720] border border-[#272733] rounded-2xl p-8 flex flex-col shadow-2xl relative">
        
        {/* Logo */}
        <div className="flex items-center justify-center mb-8 mt-2">
          <img src="/Images/LogoVerde3.0.svg" alt="Imagine 3D ERP Logo" className="h-12 object-contain" />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-white mb-2">Bem-vindo de volta!</h2>
          <p className="text-sm text-gray-400">Faça login para continuar</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-300">E-mail</label>
            <input 
              type="email" 
              placeholder="seu@email.com" 
              className="w-full bg-[#0f1015] border border-[#272733] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-300">Senha</label>
            <div className="relative">
              <input 
                type="password" 
                defaultValue="secretpassword" 
                className="w-full bg-[#0f1015] border border-[#272733] rounded-lg pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-brand transition-colors"
              />
              <EyeOff size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-300 transition-colors" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-[#0f1015] accent-brand cursor-pointer" />
              <span className="text-xs text-gray-400">Lembrar de mim</span>
            </label>
            <a href="#" className="text-xs text-brand hover:text-brandHover transition-colors">Esqueci minha senha</a>
          </div>

          <Link href="/dashboard" className="mt-2 w-full bg-brand hover:bg-brandHover text-[#0f1015] font-semibold py-3 rounded-lg text-sm transition-colors text-center block">
            Entrar
          </Link>
        </form>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-gray-600">© 2026 IMAGINE 3D ERP. Todos os direitos reservados.</p>
        </div>
      </div>
      
    </div>
  );
}
