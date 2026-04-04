import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { LineMovement } from "@/lib/types";

export function LineMovementIndicator({ movement }: { movement: LineMovement }) {
  const isUp = movement.direction === "up";
  const isDown = movement.direction === "down";
  const Icon = isUp ? ArrowUpRight : isDown ? ArrowDownRight : ArrowRight;
  const color = isUp ? "text-rose-300" : isDown ? "text-emerald-300" : "text-slate-300";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className={`flex items-center gap-2 text-sm font-medium ${color}`}>
        <Icon className="h-4 w-4" />
        <span className="capitalize">{movement.market}</span>
        <span className="text-slate-400">
          {movement.open} to {movement.current}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-300">{movement.summary}</p>
    </div>
  );
}
