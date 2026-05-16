"use client";

import { X } from "lucide-react";

type ModalProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function Modal({ title, open, onClose, children, footer }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90dvh] w-full max-w-lg overflow-auto rounded-xl border border-white/10 bg-[#0B1023] p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {children}

        {footer && (
          <div className="mt-6 flex justify-end gap-3 border-t border-white/10 pt-5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
