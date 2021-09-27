export interface UpdateGameBoardStateRequest {
  gameBoardValues: string[];
  activePlayer: string;
}

export interface FullUpdateGameBoardStateRequest {
  gameBoardValues: string[];
  activePlayer: string;
  gameId: string;
  userId: string;
}
