import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoneyline(value: number) {
  return value > 0 ? `+${value}` : `${value}`;
}

export function formatSpread(value: number) {
  return value > 0 ? `+${value.toFixed(1)}` : value.toFixed(1);
}

export function formatMetric(value: number, format: "number" | "percent" | "decimal" = "number") {
  if (format === "percent") {
    return `${value.toFixed(1)}%`;
  }

  if (format === "decimal") {
    return value.toFixed(2);
  }

  return value.toFixed(1);
}

export function formatGameTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function moneylineToProbability(moneyline: number) {
  if (moneyline < 0) {
    return Math.abs(moneyline) / (Math.abs(moneyline) + 100);
  }

  return 100 / (moneyline + 100);
}

export function calculateHold(home: number, away: number) {
  return (moneylineToProbability(home) + moneylineToProbability(away) - 1) * 100;
}
