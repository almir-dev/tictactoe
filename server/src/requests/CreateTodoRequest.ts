/**
 * Fields in a request to create/update a single user.
 */
export interface CreateUserRequest {
  /* username of the user. */
  userName: string;
  /* url of the user avatar image. */
  avatar: string;
}
