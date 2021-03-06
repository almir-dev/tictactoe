import { UserAdapter } from "../adapter/UserAdapter";
import { CreateUserRequest } from "../models/requests/CreateUserRequest";
import * as uuid from "uuid";
import { CreateUserAvatarResponse } from "../models/response/CreateUserAvatarResponse";
import { User } from "../models/projections/User";

export class UserService {
  static async createUser(userId: string) {
    const createUserRequest: CreateUserRequest = {
      userName: "tictactoe" + uuid.v4(),
      userId,
    };

    const user = UserAdapter.createUser(createUserRequest);
    return user;
  }

  static async updateUserName(userId: string, userName: string) {
    return UserAdapter.updateUserName(userId, userName);
  }

  static async createUserAvatar(userId: string): Promise<CreateUserAvatarResponse> {
    const avatarId = uuid.v4();
    const postUrl = await UserAdapter.createAvatarUrl(avatarId);
    const avatarUrl = await UserAdapter.updateUserAvatar(userId, avatarId);
    return Promise.resolve({ avatarUrl, postUrl });
  }

  static async getUser(userId: string): Promise<User> {
    const user = UserAdapter.getUser(userId);
    return user;
  }
}
