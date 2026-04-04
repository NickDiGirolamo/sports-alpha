"use client";

import { ResponsiveContainer, Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { LinePoint } from "@/lib/types";

export function TrendChart({
  title,
  data,
  dataKey,
  stroke,
}: {
  title: string;
  data: LinePoint[];
  dataKey: "spread" | "total";
  stroke: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{title}</p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor={stroke} stopOpacity={0.4} />
                <stop offset="95%" stopColor={stroke} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} width={36} />
            <Tooltip
              contentStyle={{
                background: "rgba(2, 6, 23, 0.92)",
                border: "1px solid rgba(148,163,184,0.16)",
                borderRadius: "16px",
                color: "#e2e8f0",
              }}
            />
            <Area type="monotone" dataKey={dataKey} stroke={stroke} fillOpacity={1} fill={`url(#gradient-${dataKey})`} strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
