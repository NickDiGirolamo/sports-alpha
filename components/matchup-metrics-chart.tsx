"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function MatchupMetricsChart({
  data,
  awayLabel,
  homeLabel,
}: {
  data: Array<{ metric: string; away: number; home: number }>;
  awayLabel: string;
  homeLabel: string;
}) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-3 sm:p-4">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">Visual comparison</p>
        <h3 className="mt-2 text-xl font-semibold text-white">Where the statistical gap lives</h3>
      </div>
      <div className="h-[270px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barCategoryGap={16}>
            <CartesianGrid stroke="rgba(148,163,184,0.10)" horizontal={false} />
            <XAxis type="number" stroke="#71717a" tickLine={false} axisLine={false} />
            <YAxis dataKey="metric" type="category" stroke="#71717a" tickLine={false} axisLine={false} width={88} />
            <Tooltip
              contentStyle={{
                background: "rgba(9, 9, 11, 0.94)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                color: "#f4f4f5",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="away" name={awayLabel} fill="#b8ff3b" radius={[0, 8, 8, 0]} />
            <Bar dataKey="home" name={homeLabel} fill="#d4d4d8" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
