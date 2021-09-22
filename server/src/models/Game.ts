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
  /* Flag indicating whether a game is available for joining. */
  available: boolean;
}
