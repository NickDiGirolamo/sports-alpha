import { Insight } from "@/lib/types";

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-lime-300/18 bg-lime-300/10 px-3 py-1 text-xs text-lime-100">
          {insight.category}
        </span>
        <span className="text-xs text-zinc-500">{insight.timestamp}</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{insight.title}</h3>
      <p className="mt-2 text-sm text-zinc-300">{insight.summary}</p>
    </article>
  );
}
