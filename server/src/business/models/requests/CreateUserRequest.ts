/**
 * Fields in a request to create a single user.
 */
export interface CreateUserRequest {
  /* id of a user. `*/
  userId: string;
  /* username of the user. */
  userName: string;
  /* url of the user avatar image. */
  avatar?: string;
}
