import { UserStore } from "./UserStore";
import { User, UserResource } from "./rest/UserResource";

class UserServiceImpl {
  async updateUserAvatar(file: Buffer): Promise<string> {
    const userName = UserStore.getUserName()!;

    const avatarUpdate = await UserResource.updateUserAvatar(userName);
    return UserResource.uploadImage(avatarUpdate.postUrl, file).then(() => {
      UserStore.setUserAvatar(avatarUpdate.avatarUrl);
      return avatarUpdate.avatarUrl;
    });
  }

  /** Checks if logged in user exists and in the gameUserDB.*/
  async userExists(): Promise<boolean> {
    const user = await UserResource.getUser();
    return !!user.userId;
  }

  async createUser(): Promise<User> {
    return UserResource.createUser();
  }
}

export const UserService = new UserServiceImpl();
