import Link from "next/link";
import { InsightCard } from "@/components/insight-card";
import { LineMovementIndicator } from "@/components/line-movement-indicator";
import { MetricCard } from "@/components/metric-card";
import { Game, Insight, Team } from "@/lib/types";

export function HomeSections({
  games,
  insights,
}: {
  games: Array<Game & { awayTeam: Team; homeTeam: Team }>;
  insights: Insight[];
}) {
  const movementFeed = [...games]
    .flatMap((game) => game.lineMovement.map((movement) => ({ ...movement, gameId: game.id, matchup: `${game.awayTeam.code} @ ${game.homeTeam.code}` })))
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
    .slice(0, 3);

  const edges = [...games].sort((a, b) => b.projection.modelEdgePercent - a.projection.modelEdgePercent).slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-zinc-300">Market movement</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Sharp action and drift</h3>
            </div>
            <Link href="/odds" className="text-sm text-lime-100 underline underline-offset-4">
              Open odds terminal
            </Link>
          </div>
          <div className="space-y-3">
            {movementFeed.map((movement) => (
              <div key={`${movement.gameId}-${movement.market}`}>
                <p className="mb-2 text-xs uppercase tracking-[0.22em] text-slate-500">{movement.matchup}</p>
                <LineMovementIndicator movement={movement} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.26em] text-zinc-300">Best analytical edges</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Model-backed spots with explanation</h3>
          </div>
          <div className="grid gap-4">
            {edges.map((game) => (
              <div key={game.id} className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-zinc-400">
                      {game.awayTeam.code} @ {game.homeTeam.code}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">{game.projection.lean}</p>
                  </div>
                  <div className="rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1 text-sm text-lime-100">
                    {game.projection.modelEdgePercent.toFixed(1)}% edge
                  </div>
                </div>
                <p className="mt-3 text-sm text-zinc-300">{game.projection.rationale[0]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs uppercase tracking-[0.26em] text-zinc-300">Platform architecture</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Built like a data product</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <MetricCard label="Service layer" value="Provider adapters" detail="Schedule, odds, stats, injuries, weather, and insights can be swapped independently." />
            <MetricCard label="Domain model" value="Normalized entities" detail="Games, snapshots, metrics, reports, projections, and watchlist records are typed end to end." />
            <MetricCard label="Model design" value="Transparent MVP" detail="Weighted recent form, efficiency, injuries, rest, and home adjustment feed side/total output." />
            <MetricCard label="Compliance" value="Research only" detail="No bet execution or sportsbook behavior anywhere in the product." />
          </div>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.26em] text-zinc-300">Trending insights</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Notes that turn the raw data into context</h3>
          </div>
          <div className="grid gap-4">
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
