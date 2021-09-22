/**
 * Fields in a request to create a game session.
 */
export interface CreateGameRequest {
  /* id of a user. `*/
  userId: string;
  /* username of the user. */
  userName: string;
  /* Name of the session. */
  gameName: string;
  /* Flag indicating whether a game is available for joining. */
  available: boolean;
}
