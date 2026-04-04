import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { OddsBadge } from "@/components/odds-badge";
import { TeamPill } from "@/components/team-pill";
import { WatchlistButton } from "@/components/watchlist-button";
import { Game, Team } from "@/lib/types";
import { formatGameTime } from "@/lib/utils";

export function GameCard({ game, compact = false }: { game: Game & { awayTeam: Team; homeTeam: Team }; compact?: boolean }) {
  return (
    <div className="group rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_16px_60px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-400">
                {game.league}
              </span>
              <span className="rounded-full border border-lime-300/18 bg-lime-300/10 px-3 py-1 text-xs text-lime-100">
                {game.importance}
              </span>
            </div>
            <p className="mt-3 text-xl font-semibold text-white">{game.headline}</p>
            <p className="mt-1 text-sm text-zinc-400">
              {formatGameTime(game.startTime)} • {game.venue}
            </p>
          </div>
          <WatchlistButton label="Track game" />
        </div>

        <div className={`grid gap-4 ${compact ? "md:grid-cols-[1fr,1fr]" : "lg:grid-cols-[1.3fr,0.9fr]"}`}>
          <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
            <div className="space-y-4">
              <TeamPill team={game.awayTeam} />
              <div className="border-t border-white/10" />
              <TeamPill team={game.homeTeam} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <OddsBadge label={`${game.awayTeam.code} moneyline`} value={game.currentLine.moneyline.away} />
            <OddsBadge label={`${game.homeTeam.code} moneyline`} value={game.currentLine.moneyline.home} />
            <OddsBadge label="Spread" value={game.currentLine.spread.away} variant="accent" />
            <OddsBadge label="Total" value={game.currentLine.total.points} />
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr,auto] lg:items-end">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Quick edge</p>
            <p className="mt-2 text-sm text-zinc-200">{game.quickInsight}</p>
          </div>
          <Link
            href={`/game/${game.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-lime-300/22 bg-lime-300/10 px-4 py-3 text-sm font-medium text-lime-50 transition hover:bg-lime-300/16"
          >
            View matchup
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
