"use client";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}: Props) {
  const base = "rounded-xl px-4 py-2 font-medium transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-green-500 text-black",
    secondary: "bg-white/10 text-white border border-white/10",
    ghost: "bg-transparent text-white/70 hover:bg-white/5",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
