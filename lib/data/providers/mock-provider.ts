import { dataHealth, games, insights, sports, teamProfiles, teams, watchlist } from "@/lib/mock-data";
import { DataHealthStatus, Game, Insight, Sport, SportKey, Team, TeamProfile, WatchlistItem } from "@/lib/types";

function resolveTeams(game: Game) {
  return {
    awayTeam: teams.find((team) => team.id === game.awayTeamId)!,
    homeTeam: teams.find((team) => team.id === game.homeTeamId)!,
  };
}

export const mockProvider = {
  getSports(): Sport[] {
    return sports;
  },
  getTodayGames(sport?: SportKey) {
    const filtered = sport ? games.filter((game) => game.sport === sport) : games;
    return filtered.map((game) => ({ ...game, ...resolveTeams(game) }));
  },
  getGame(gameId: string) {
    const game = games.find((entry) => entry.id === gameId);
    if (!game) {
      return null;
    }

    return { ...game, ...resolveTeams(game) };
  },
  getTeams(sport?: SportKey): Team[] {
    return sport ? teams.filter((team) => team.sport === sport) : teams;
  },
  getTeamProfile(teamId: string): TeamProfile | null {
    return teamProfiles.find((entry) => entry.teamId === teamId) ?? null;
  },
  getInsights(): Insight[] {
    return insights;
  },
  getWatchlist(): WatchlistItem[] {
    return watchlist;
  },
  getDataHealth(): DataHealthStatus[] {
    return dataHealth;
  },
};
