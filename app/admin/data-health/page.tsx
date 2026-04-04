import { PageHeader } from "@/components/page-header";
import { getDataHealth } from "@/lib/data/service";

export default async function DataHealthPage() {
  const statuses = await getDataHealth();

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow="Admin"
        title="Data health"
        description="Internal-style ingestion overview for schedules, odds, stats, injuries, and operational follow-up."
      />
      <div className="grid gap-4">
        {statuses.map((status) => (
          <div key={status.provider} className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xl font-semibold text-white">{status.provider}</p>
                <p className="mt-1 text-sm text-slate-400">Last updated {status.lastUpdated}</p>
              </div>
              <div
                className={`rounded-full px-3 py-1 text-sm ${
                  status.status === "Healthy"
                    ? "border border-white/15 bg-white/8 text-zinc-100"
                    : status.status === "Delayed"
                      ? "border border-white/12 bg-white/6 text-zinc-200"
                      : "border border-white/10 bg-white/5 text-zinc-300"
                }`}
              >
                {status.status}
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-[0.3fr,1fr]">
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Records today</p>
                <p className="mt-2 text-white">{status.recordsToday}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-sm text-slate-300">{status.notes}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
