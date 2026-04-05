import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { GameCard } from "@/components/game-card";
import { MetricCard } from "@/components/metric-card";
import { Game, Team } from "@/lib/types";

export function HeroSummary({ games }: { games: Array<Game & { awayTeam: Team; homeTeam: Team }> }) {
  const biggestMove = [...games]
    .flatMap((game) => game.lineMovement.map((movement) => ({ game, movement })))
    .sort((a, b) => Math.abs(b.movement.delta) - Math.abs(a.movement.delta))[0];

  const strongestEdge = [...games].sort((a, b) => b.projection.modelEdgePercent - a.projection.modelEdgePercent)[0];

  return (
    <section className="grid gap-6 xl:grid-cols-[1.3fr,0.9fr]">
      <div className="rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(184,255,59,0.12),transparent_26%),linear-gradient(160deg,rgba(32,34,38,0.94),rgba(12,13,15,0.82))] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] sm:p-8">
        <div className="flex items-center gap-2 text-lime-100">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em]">Today&apos;s slate summary</span>
        </div>
        <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          See the board, the movement, and the why behind the number.
        </h2>
        <p className="mt-4 max-w-3xl text-base text-zinc-300">
          Sports Alpha surfaces marquee games, current lines, meaningful movement, and transparent model context so you can evaluate the market like an analyst instead of scrolling a sportsbook clone.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <MetricCard label="Games tracked" value={`${games.length}`} detail="Multi-sport architecture with odds, stats, injuries, and projections." />
          <MetricCard
            label="Biggest move"
            value={biggestMove ? `${biggestMove.game.awayTeam.code} / ${biggestMove.movement.market}` : "N/A"}
            detail={biggestMove?.movement.summary}
          />
          <MetricCard
            label="Top edge"
            value={`${strongestEdge.projection.modelEdgePercent.toFixed(1)}%`}
            detail={`${strongestEdge.projection.lean} - ${strongestEdge.projection.confidence} confidence`}
          />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/odds"
            className="inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-300/12 px-5 py-3 text-sm font-medium text-lime-50 transition hover:bg-lime-300/18"
          >
            Open odds board
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/model"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-zinc-200 transition hover:border-lime-300/20 hover:bg-lime-300/8"
          >
            Inspect the model
          </Link>
        </div>
      </div>
      <GameCard game={games[0]} compact />
    </section>
  );
}
