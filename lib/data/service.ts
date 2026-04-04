import { mockProvider } from "@/lib/data/providers/mock-provider";
import { SportKey } from "@/lib/types";

export async function getSports() {
  return mockProvider.getSports();
}

export async function getTopGames(sport?: SportKey) {
  return mockProvider.getTodayGames(sport).sort((a, b) => b.popularityScore - a.popularityScore);
}

export async function getFeaturedGames() {
  return (await getTopGames()).filter((game) => game.importance !== "Standard").slice(0, 3);
}

export async function getGameById(gameId: string) {
  return mockProvider.getGame(gameId);
}

export async function getTeams(sport?: SportKey) {
  return mockProvider.getTeams(sport);
}

export async function getTeamById(teamId: string) {
  const allTeams = await getTeams();
  const team = allTeams.find((entry) => entry.id === teamId);
  const profile = mockProvider.getTeamProfile(teamId);
  return team ? { team, profile } : null;
}

export async function getInsights() {
  return mockProvider.getInsights();
}

export async function getWatchlist() {
  const games = await getTopGames();
  return mockProvider.getWatchlist().map((item) => ({
    ...item,
    game: games.find((game) => game.id === item.gameId)!,
  }));
}

export async function getDataHealth() {
  return mockProvider.getDataHealth();
}
