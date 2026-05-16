type StatusTone = "green" | "yellow" | "red" | "blue" | "purple" | "gray";

const toneClasses: Record<StatusTone, string> = {
  green: "border-green-500/25 bg-green-500/10 text-green-400",
  yellow: "border-yellow-500/25 bg-yellow-500/10 text-yellow-300",
  red: "border-red-500/25 bg-red-500/10 text-red-300",
  blue: "border-blue-500/25 bg-blue-500/10 text-blue-300",
  purple: "border-purple-500/25 bg-purple-500/10 text-purple-300",
  gray: "border-white/10 bg-white/5 text-white/60",
};

export default function StatusBadge({
  children,
  tone = "gray",
}: {
  children: React.ReactNode;
  tone?: StatusTone;
}) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}
