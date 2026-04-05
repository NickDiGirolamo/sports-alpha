"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function EdgeOverviewChart({
  data,
}: {
  data: Array<{ game: string; edge: number; lineGap: number }>;
}) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">Edge map</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Market versus model gap</h3>
      </div>
      <div className="h-72 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap={18}>
            <CartesianGrid stroke="rgba(148,163,184,0.10)" vertical={false} />
            <XAxis dataKey="game" stroke="#71717a" tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "rgba(9, 9, 11, 0.94)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                color: "#f4f4f5",
              }}
            />
            <Bar dataKey="edge" radius={[8, 8, 0, 0]} fill="#b8ff3b" />
            <Bar dataKey="lineGap" radius={[8, 8, 0, 0]} fill="#d4d4d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
