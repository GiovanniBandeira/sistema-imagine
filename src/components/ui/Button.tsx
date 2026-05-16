"use client";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary: "bg-brand text-black hover:bg-brandHover",
    secondary: "border border-white/10 bg-white/10 text-white hover:bg-white/15",
    ghost: "bg-transparent text-white/70 hover:bg-white/5 hover:text-white",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
