import { UserAdapter } from "../adapter/UserAdapter";
import { CreateUserRequest } from "../requests/CreateTodoRequest";

export class UserService {
  static async createUser(createUserRequest: CreateUserRequest) {
    createUserRequest.avatar = undefined;
    const user = UserAdapter.createUser(createUserRequest);
    return user;
  }
}
