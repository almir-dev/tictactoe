import { UserAdapter } from "../adapter/UserAdapter";
import { CreateUserRequest } from "../requests/CreateTodoRequest";
import * as uuid from "uuid";
import { CreateUserAvatarResponse } from "../response/CreateUserAvatarResponse";

export class UserService {
  static async createUser(createUserRequest: CreateUserRequest) {
    createUserRequest.avatar = undefined;
    const user = UserAdapter.createUser(createUserRequest);
    return user;
  }

  static async createUserAvatar(
    userId: string,
    userName: string
  ): Promise<CreateUserAvatarResponse> {
    const avatarId = uuid.v4();
    const avatarUrl = await UserAdapter.createAvatarUrl(avatarId);
    await UserAdapter.updateUserAvatar(userId, userName, avatarId);
    return Promise.resolve({ avatarUrl: avatarUrl });
  }
}
