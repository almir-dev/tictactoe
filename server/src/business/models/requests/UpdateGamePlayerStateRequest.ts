export interface UpdateGamePlayerStateRequest {
  players: string[];
  activePlayer?: string;
}

export interface PlayerInfo {
  playerId: string;
  lastHealthCheck: number;
}

export interface FullUpdateGamePlayerStateRequest {
  players: PlayerInfo[];
  activePlayer?: string;
  gameId: string;
  userId: string;
}
