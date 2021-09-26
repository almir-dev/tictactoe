import { UserStore } from "./UserStore";
import { User, UserResource } from "./rest/UserResource";

class UserServiceImpl {
  async updateUserAvatar(file: Buffer): Promise<string> {
    const avatarUpdate = await UserResource.updateUserAvatar();
    return UserResource.uploadImage(avatarUpdate.postUrl, file).then(() => {
      UserStore.setUserAvatar(avatarUpdate.avatarUrl);
      return avatarUpdate.avatarUrl;
    });
  }

  async updateUserName(userName: string): Promise<void> {
    return UserResource.updateUserName(userName);
  }

  /** Checks if logged in user exists and in the gameUserDB.*/
  async userExists(): Promise<boolean> {
    const user = await UserResource.getUser();
    return !!user.userId;
  }

  async createUser(): Promise<User> {
    return UserResource.createUser();
  }

  async findUser(userId: string): Promise<User> {
    let user;
    try {
      user = await UserResource.findUser(userId);
    } catch (e) {
      return UserService.findUser(userId);
    }
    return user;
  }
}

export const UserService = new UserServiceImpl();
