import { notFound } from "next/navigation";
import { GameFactGrid } from "@/components/game-fact-grid";
import { LineMovementIndicator } from "@/components/line-movement-indicator";
import { MarketOverview } from "@/components/market-overview";
import { MatchupMetricsChart } from "@/components/matchup-metrics-chart";
import { PageHeader } from "@/components/page-header";
import { TeamComparisonTable } from "@/components/team-comparison-table";
import { TeamPill } from "@/components/team-pill";
import { TrendChart } from "@/components/trend-chart";
import { WatchlistButton } from "@/components/watchlist-button";
import { getGameById } from "@/lib/data/service";
import { calculateHold, formatGameTime, moneylineToProbability } from "@/lib/utils";

export default async function GameDetailPage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params;
  const game = await getGameById(gameId);

  if (!game) {
    notFound();
  }

  const factGrid = [
    {
      label: "Market hold",
      value: `${calculateHold(game.currentLine.moneyline.home, game.currentLine.moneyline.away).toFixed(2)}%`,
      detail: "Useful for identifying whether the current book price is efficient or inflated.",
    },
    {
      label: "Spread gap",
      value: `${Math.abs(game.projection.fairSpread - game.currentLine.spread.away).toFixed(1)}`,
      detail: "Difference between the model fair spread and the current market spread.",
    },
    {
      label: "Total gap",
      value: `${Math.abs(game.projection.fairTotal - game.currentLine.total.points).toFixed(1)}`,
      detail: "Helps identify whether the game environment is richer or lower scoring than the market implies.",
    },
    {
      label: "Home implied %",
      value: `${(moneylineToProbability(game.currentLine.moneyline.home) * 100).toFixed(1)}%`,
      detail: "Current moneyline translated into market win probability for the home side.",
    },
  ];

  const chartMetrics = game.metrics.slice(0, 5).map((metric) => ({
    metric: metric.label,
    away: Number(metric.awayValue.toFixed(1)),
    home: Number(metric.homeValue.toFixed(1)),
  }));

  return (
    <div className="space-y-4 pb-10 sm:space-y-6">
      <section className="grid gap-4 xl:grid-cols-[0.9fr,1.1fr]">
        <div className="grid gap-4">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">Matchup analysis</p>
              <WatchlistButton />
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr,auto,1fr] md:items-center">
              <TeamPill team={game.awayTeam} />
              <div className="text-center text-xs uppercase tracking-[0.3em] text-zinc-500">vs</div>
              <TeamPill team={game.homeTeam} align="right" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Game time</p>
                <p className="mt-1 text-sm font-medium text-white">{formatGameTime(game.startTime)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">League / Venue</p>
                <p className="mt-1 text-sm font-medium text-white">{game.league}</p>
                <p className="mt-1 text-xs text-zinc-400">{game.venue}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Environment</p>
                <p className="mt-1 text-sm font-medium text-white">{game.weather ? game.weather.summary : "Indoor / neutral conditions"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">Betting market</p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Current</p>
                <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-zinc-500">Moneyline</p>
                    <p className="mt-1 text-white">
                      {game.awayTeam.code} {game.currentLine.moneyline.away} / {game.homeTeam.code} {game.currentLine.moneyline.home}
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Spread</p>
                    <p className="mt-1 text-white">{game.currentLine.spread.away.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Total</p>
                    <p className="mt-1 text-white">{game.currentLine.total.points.toFixed(1)}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-lime-300/16 bg-lime-300/[0.07] p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-300">Model / market delta</p>
                <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-zinc-500">Fair spread</p>
                    <p className="mt-1 text-white">{game.projection.fairSpread.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Fair total</p>
                    <p className="mt-1 text-white">{game.projection.fairTotal.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Edge</p>
                    <p className="mt-1 text-lime-100">{game.projection.modelEdgePercent.toFixed(1)}%</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-zinc-200">{game.marketSummary}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <MatchupMetricsChart data={chartMetrics} awayLabel={game.awayTeam.code} homeLabel={game.homeTeam.code} />
          <div className="grid gap-4 lg:grid-cols-2">
            <TrendChart title="Spread movement" data={game.lineHistory} dataKey="spread" stroke="#58c7ff" />
            <TrendChart title="Total movement" data={game.lineHistory} dataKey="total" stroke="#9fffaf" />
          </div>
        </div>
      </section>

      <MarketOverview awayTeam={game.awayTeam} homeTeam={game.homeTeam} currentLine={game.currentLine} openingLine={game.openingLine} />

      <section className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <div className="space-y-6 rounded-[32px] border border-white/10 bg-white/[0.03] p-4 sm:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">Betting market panel</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Opening vs current line movement</h3>
          </div>
          <div className="grid gap-3">
            {game.lineMovement.map((movement) => (
              <LineMovementIndicator key={movement.market} movement={movement} />
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-4 sm:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">Model insight</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{game.projection.lean}</h3>
            <p className="mt-2 text-sm text-zinc-300">
              Projected score: {game.awayTeam.code} {game.projection.projectedAwayScore} - {game.homeTeam.code} {game.projection.projectedHomeScore}
            </p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Fair spread</p>
              <p className="mt-2 text-2xl font-semibold text-white">{game.projection.fairSpread.toFixed(1)}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Fair total</p>
              <p className="mt-2 text-2xl font-semibold text-white">{game.projection.fairTotal.toFixed(1)}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Edge</p>
              <p className="mt-2 text-2xl font-semibold text-lime-100">{game.projection.modelEdgePercent.toFixed(1)}%</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Confidence</p>
              <p className="mt-2 text-2xl font-semibold text-white">{game.projection.confidence}</p>
            </div>
          </div>
          <ul className="mt-5 space-y-3 text-sm text-zinc-300">
            {game.projection.rationale.map((point) => (
              <li key={point} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GameFactGrid facts={factGrid} />

      <section className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-4 sm:p-6">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">Team comparison</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Which stats matter most here</h3>
          </div>
          <TeamComparisonTable awayTeam={game.awayTeam.code} homeTeam={game.homeTeam.code} metrics={game.metrics} />
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-4 sm:p-6">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">Situational context</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Trends, injuries, and external factors</h3>
          </div>
          <div className="space-y-4">
            {game.trends.map((trend) => (
              <div key={trend.label} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="text-sm text-zinc-400">{trend.label}</span>
                  <span className="text-sm text-white">
                    {game.awayTeam.code} {trend.away} - {game.homeTeam.code} {trend.home}
                  </span>
                </div>
              </div>
            ))}
            {game.injuries.map((injury) => (
              <div key={injury.id} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="font-medium text-white">{injury.player}</p>
                <p className="mt-1 text-sm text-zinc-200">
                  {injury.status} - {injury.impact} impact
                </p>
                <p className="mt-2 text-sm text-zinc-300">{injury.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

