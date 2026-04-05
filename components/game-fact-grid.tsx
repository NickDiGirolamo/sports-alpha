export function GameFactGrid({
  facts,
}: {
  facts: Array<{ label: string; value: string; detail: string }>;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {facts.map((fact) => (
        <div key={fact.label} className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">{fact.label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{fact.value}</p>
          <p className="mt-2 text-sm text-zinc-300">{fact.detail}</p>
        </div>
      ))}
    </div>
  );
}
