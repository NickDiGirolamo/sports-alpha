import Image from "next/image";
import { Team } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TeamPill({ team, align = "left" }: { team: Team; align?: "left" | "right" }) {
  return (
    <div className={cn("flex items-center gap-3", align === "right" && "justify-end")}>
      <div
        className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        style={{
          backgroundColor: `${team.primaryColor}22`,
        }}
      >
        {team.logoUrl ? (
          <Image src={team.logoUrl} alt={`${team.city} ${team.name} logo`} width={40} height={40} className="h-10 w-10 object-contain" unoptimized />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-sm font-semibold text-white"
            style={{
              background: `linear-gradient(135deg, ${team.primaryColor}, ${team.secondaryColor})`,
            }}
          >
            {team.code}
          </div>
        )}
      </div>
      <div className={cn(align === "right" && "text-right")}>
        <p className="text-sm text-slate-400">{team.city}</p>
        <p className="font-medium text-white">{team.name}</p>
      </div>
    </div>
  );
}
