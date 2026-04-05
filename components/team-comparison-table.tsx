import { TeamMetric } from "@/lib/types";
import { formatMetric } from "@/lib/utils";

export function TeamComparisonTable({
  awayTeam,
  homeTeam,
  metrics,
}: {
  awayTeam: string;
  homeTeam: string;
  metrics: TeamMetric[];
}) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.03]">
      <div className="min-w-[520px]">
        <div className="grid grid-cols-[1fr,1.2fr,1fr] border-b border-white/10 px-4 py-3 text-center text-xs uppercase tracking-[0.22em] text-slate-400">
          <div className="text-center">{awayTeam}</div>
          <div className="text-center">Metric</div>
          <div className="text-center">{homeTeam}</div>
        </div>
        {metrics.map((metric) => (
          <div key={metric.key} className="grid grid-cols-[1fr,1.2fr,1fr] items-center gap-3 px-4 py-4 text-sm even:bg-white/[0.02]">
            <div className="text-center font-medium text-white">{formatMetric(metric.awayValue, metric.format)}</div>
            <div className="text-center text-slate-300">{metric.label}</div>
            <div className="text-center font-medium text-white">{formatMetric(metric.homeValue, metric.format)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
