import Image from "next/image";
import { notFound } from "next/navigation";
import { GameFactGrid } from "@/components/game-fact-grid";
import { LineMovementIndicator } from "@/components/line-movement-indicator";
import { MarketOverview } from "@/components/market-overview";
import { MatchupMetricsChart } from "@/components/matchup-metrics-chart";
import { PageHeader } from "@/components/page-header";
import { TeamComparisonTable } from "@/components/team-comparison-table";
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
      <section className="space-y-4">
        <div className="overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-[920px] items-start gap-4">
          <div className="w-[300px] shrink-0">
            <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-3 sm:p-4 min-h-[350px]">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">Matchup</p>
                <WatchlistButton label="Save" />
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  {game.awayTeam.logoUrl ? (
                    <Image
                      src={game.awayTeam.logoUrl}
                      alt={`${game.awayTeam.city} ${game.awayTeam.name} logo`}
                      width={56}
                      height={56}
                      className="h-14 w-14 object-contain"
                      unoptimized
                    />
                  ) : (
                    <span className="text-sm font-semibold text-white">{game.awayTeam.code}</span>
                  )}
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  x
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  {game.homeTeam.logoUrl ? (
                    <Image
                      src={game.homeTeam.logoUrl}
                      alt={`${game.homeTeam.city} ${game.homeTeam.name} logo`}
                      width={56}
                      height={56}
                      className="h-14 w-14 object-contain"
                      unoptimized
                    />
                  ) : (
                    <span className="text-sm font-semibold text-white">{game.homeTeam.code}</span>
                  )}
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-sm font-semibold text-white">{game.awayTeam.code}</p>
                  <p className="text-[11px] text-zinc-400">{game.awayTeam.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{game.homeTeam.code}</p>
                  <p className="text-[11px] text-zinc-400">{game.homeTeam.name}</p>
                </div>
              </div>
              <div className="mt-3 space-y-2 rounded-2xl border border-white/10 bg-slate-950/45 p-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-zinc-500">Time</span>
                  <span className="text-right text-white">{formatGameTime(game.startTime)}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-zinc-500">League</span>
                  <span className="text-right text-white">{game.league}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-zinc-500">Venue</span>
                  <span className="text-right text-white">{game.venue}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <MatchupMetricsChart data={chartMetrics} awayLabel={game.awayTeam.code} homeLabel={game.homeTeam.code} />
          </div>
        </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[300px,minmax(0,1fr)]">
          <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">Market snapshot</p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">ML</p>
                <p className="mt-1 text-white">
                  {game.awayTeam.code} {game.currentLine.moneyline.away}
                </p>
                <p className="text-white">{game.homeTeam.code} {game.currentLine.moneyline.home}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Spread</p>
                <p className="mt-1 text-white">{game.currentLine.spread.away.toFixed(1)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Total</p>
                <p className="mt-1 text-white">{game.currentLine.total.points.toFixed(1)}</p>
              </div>
            </div>
            <div className="mt-3 rounded-2xl border border-lime-300/16 bg-lime-300/[0.07] p-3">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-zinc-300">Model edge</span>
                <span className="text-lime-100">{game.projection.modelEdgePercent.toFixed(1)}%</span>
              </div>
              <p className="mt-2 text-sm text-zinc-200">{game.marketSummary}</p>
            </div>
          </div>
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

