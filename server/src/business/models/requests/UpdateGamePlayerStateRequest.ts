export interface UpdateGamePlayerStateRequest {
  players: string[];
  activePlayer?: string;
}

export interface FullUpdateGamePlayerStateRequest extends UpdateGamePlayerStateRequest {
  gameId: string;
  userId: string;
}
