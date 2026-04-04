"use client";

import { BookmarkPlus } from "lucide-react";
import { useState } from "react";

export function WatchlistButton({ label = "Save matchup" }: { label?: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setSaved((value) => !value)}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
        saved
          ? "border-lime-300/22 bg-lime-300/12 text-lime-50"
          : "border-white/10 bg-white/5 text-zinc-200 hover:border-lime-300/22 hover:bg-lime-300/10"
      }`}
    >
      <BookmarkPlus className="h-4 w-4" />
      {saved ? "Saved" : label}
    </button>
  );
}
