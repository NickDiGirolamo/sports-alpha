import { formatMoneyline, formatSpread } from "@/lib/utils";

export function OddsBadge({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: string | number;
  variant?: "default" | "accent";
}) {
  const displayValue =
    typeof value === "number" && label.toLowerCase().includes("money")
      ? formatMoneyline(value)
      : typeof value === "number" && label.toLowerCase().includes("spread")
        ? formatSpread(value)
        : value;

  return (
    <div className={`rounded-2xl border px-3 py-2 ${variant === "accent" ? "border-lime-300/22 bg-lime-300/10" : "border-white/10 bg-white/5"}`}>
      <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{displayValue}</p>
    </div>
  );
}
