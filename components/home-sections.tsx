import Link from "next/link";
import { EdgeOverviewChart } from "@/components/edge-overview-chart";
import { InsightCard } from "@/components/insight-card";
import { LineMovementIndicator } from "@/components/line-movement-indicator";
import { MetricCard } from "@/components/metric-card";
import { Game, Insight, Team } from "@/lib/types";
import { calculateHold } from "@/lib/utils";

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
  const edgeChartData = [...games]
    .sort((a, b) => b.projection.modelEdgePercent - a.projection.modelEdgePercent)
    .slice(0, 5)
    .map((game) => ({
      game: `${game.awayTeam.code}-${game.homeTeam.code}`,
      edge: Number(game.projection.modelEdgePercent.toFixed(1)),
      lineGap: Number(Math.abs(game.projection.fairSpread - game.currentLine.spread.away).toFixed(1)),
    }));

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
        <EdgeOverviewChart data={edgeChartData} />
        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.26em] text-zinc-300">Alpha board</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Most actionable quantitative gaps</h3>
          </div>
          <div className="space-y-3">
            {games
              .slice()
              .sort((a, b) => b.projection.modelEdgePercent - a.projection.modelEdgePercent)
              .slice(0, 4)
              .map((game) => (
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
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                    <div>
                      <p className="text-zinc-500">Fair spread gap</p>
                      <p className="mt-1 text-white">{Math.abs(game.projection.fairSpread - game.currentLine.spread.away).toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500">Fair total gap</p>
                      <p className="mt-1 text-white">{Math.abs(game.projection.fairTotal - game.currentLine.total.points).toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500">Hold</p>
                      <p className="mt-1 text-white">
                        {calculateHold(game.currentLine.moneyline.home, game.currentLine.moneyline.away).toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-zinc-500">Best stat gap</p>
                      <p className="mt-1 text-white">
                        {Math.max(...game.metrics.map((metric) => Math.abs(metric.awayValue - metric.homeValue))).toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

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
          <p className="text-xs uppercase tracking-[0.26em] text-zinc-300">Research profile</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Quantitative lenses driving the board</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <MetricCard label="Market math" value="Implied prob + hold" detail="Moneyline pricing is converted into probability and vig context, not just shown raw." />
            <MetricCard label="Projection layer" value="Fair side + total" detail="Each matchup compares market numbers against a transparent projected score and fair line." />
            <MetricCard label="Situational depth" value="Form, rest, injuries" detail="Recent trend snapshots and player availability shape the lean, not just power ratings." />
            <MetricCard label="Visual evidence" value="Charts over clutter" detail="Comparison charts and movement visuals help the user validate why the edge exists." />
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
