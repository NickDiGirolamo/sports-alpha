import { PageHeader } from "@/components/page-header";
import { getTopGames } from "@/lib/data/service";
import { formatMoneyline, formatSpread } from "@/lib/utils";

export default async function OddsPage() {
  const games = await getTopGames();

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow="Odds terminal"
        title="Market board"
        description="Opening versus current lines, biggest movers, and a clean terminal-style presentation for price monitoring."
      />
      <div className="hidden overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] md:block">
        <div className="grid grid-cols-[1.4fr,0.8fr,0.8fr,0.8fr,0.9fr] border-b border-white/10 px-5 py-4 text-xs uppercase tracking-[0.24em] text-slate-500">
          <div>Matchup</div>
          <div>Moneyline</div>
          <div>Spread</div>
          <div>Total</div>
          <div>Movement</div>
        </div>
        {games.map((game) => (
          <div key={game.id} className="grid grid-cols-[1.4fr,0.8fr,0.8fr,0.8fr,0.9fr] items-center gap-3 border-b border-white/8 px-5 py-4 text-sm last:border-b-0">
            <div>
              <p className="font-medium text-white">
                {game.awayTeam.code} @ {game.homeTeam.code}
              </p>
              <p className="mt-1 text-slate-500">{game.league}</p>
            </div>
            <div className="text-slate-200">
              {formatMoneyline(game.currentLine.moneyline.away)} / {formatMoneyline(game.currentLine.moneyline.home)}
            </div>
            <div className="text-slate-200">{formatSpread(game.currentLine.spread.away)}</div>
            <div className="text-slate-200">{game.currentLine.total.points.toFixed(1)}</div>
            <div className="text-zinc-300">{game.lineMovement[0]?.summary}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:hidden">
        {games.map((game) => (
          <div key={game.id} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-white">
                  {game.awayTeam.code} @ {game.homeTeam.code}
                </p>
                <p className="mt-1 text-sm text-slate-500">{game.league}</p>
              </div>
              <div className="rounded-full border border-lime-300/18 bg-lime-300/10 px-3 py-1 text-xs text-lime-100">
                {game.lineMovement[0]?.market}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">ML</p>
                <p className="mt-1 text-sm text-white">
                  {formatMoneyline(game.currentLine.moneyline.away)} / {formatMoneyline(game.currentLine.moneyline.home)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Spread</p>
                <p className="mt-1 text-sm text-white">{formatSpread(game.currentLine.spread.away)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Total</p>
                <p className="mt-1 text-sm text-white">{game.currentLine.total.points.toFixed(1)}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-zinc-300">{game.lineMovement[0]?.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
