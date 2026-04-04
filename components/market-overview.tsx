import { ArrowRight } from "lucide-react";
import { Team } from "@/lib/types";
import { calculateHold, formatMoneyline, formatSpread, moneylineToProbability } from "@/lib/utils";

export function MarketOverview({
  awayTeam,
  homeTeam,
  currentLine,
  openingLine,
}: {
  awayTeam: Team;
  homeTeam: Team;
  currentLine: {
    moneyline: { away: number; home: number };
    spread: { away: number; home: number };
    total: { points: number; overPrice?: number; underPrice?: number };
  };
  openingLine: {
    moneyline: { away: number; home: number };
    spread: { away: number; home: number };
    total: { points: number };
  };
}) {
  const hold = calculateHold(currentLine.moneyline.home, currentLine.moneyline.away).toFixed(2);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Current market</p>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-zinc-300">{awayTeam.code} moneyline</span>
            <span className="font-semibold text-white">{formatMoneyline(currentLine.moneyline.away)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-300">{homeTeam.code} moneyline</span>
            <span className="font-semibold text-white">{formatMoneyline(currentLine.moneyline.home)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-300">Spread</span>
            <span className="font-semibold text-white">
              {awayTeam.code} {formatSpread(currentLine.spread.away)} <ArrowRight className="mx-1 inline h-4 w-4 text-zinc-500" />
              {homeTeam.code} {formatSpread(currentLine.spread.home)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-300">Total</span>
            <span className="font-semibold text-white">{currentLine.total.points.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Derived pricing</p>
        <div className="mt-4 space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-zinc-300">{awayTeam.code} implied probability</span>
            <span className="font-semibold text-white">{(moneylineToProbability(currentLine.moneyline.away) * 100).toFixed(1)}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-300">{homeTeam.code} implied probability</span>
            <span className="font-semibold text-white">{(moneylineToProbability(currentLine.moneyline.home) * 100).toFixed(1)}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-300">Hold / vig</span>
            <span className="font-semibold text-white">{hold}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-300">Opening spread</span>
            <span className="font-semibold text-white">{formatSpread(openingLine.spread.away)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-300">Opening total</span>
            <span className="font-semibold text-white">{openingLine.total.points.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
