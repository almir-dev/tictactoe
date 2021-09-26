/**
 * Fields representing a game model.
 */
export interface Game {
  /* id of the game. */
  gameId: string;
  /* id of a user who created the game. `*/
  userId: string;
  /* username of the user. */
  userName: string;
  /* Date of creation. */
  createdAt: number;
  /* Name of the session. */
  gameName: string;
  /* Ids of the users. */
  players: string[];
  /* values of the game board in 1d array. */
  gameBoardValues: string[];
  /* active players id. */
  activePlayer?: string;
}
