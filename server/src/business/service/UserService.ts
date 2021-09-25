import { UserAdapter } from "../adapter/UserAdapter";
import { CreateUserRequest } from "../models/requests/CreateUserRequest";
import * as uuid from "uuid";
import { CreateUserAvatarResponse } from "../models/response/CreateUserAvatarResponse";
import { User } from "../models/projections/User";

export class UserService {
  static async createUser(createUserRequest: CreateUserRequest) {
    createUserRequest.avatar = undefined;
    const user = UserAdapter.createUser(createUserRequest);
    return user;
  }

  static async updateUserName(userId: string, userName: string) {
    return UserAdapter.updateUserName(userId, userName);
  }

  static async createUserAvatar(userId: string, userName: string): Promise<CreateUserAvatarResponse> {
    const avatarId = uuid.v4();
    const postUrl = await UserAdapter.createAvatarUrl(avatarId);
    const avatarUrl = await UserAdapter.updateUserAvatar(userId, userName, avatarId);
    return Promise.resolve({ avatarUrl, postUrl });
  }

  static async getUser(userId: string): Promise<User> {
    const user = UserAdapter.getUser(userId);
    return user;
  }
}
