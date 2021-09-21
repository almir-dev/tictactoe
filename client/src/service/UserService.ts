import { UserStore } from "./UserStore";
import { UserResource } from "./rest/UserResource";

class UserServiceImpl {
  async updateUserAvatar(file: Buffer): Promise<string> {
    const userName = UserStore.getUserName()!;

    const avatarUpdate = await UserResource.updateUserAvatar(userName);
    return UserResource.uploadImage(avatarUpdate.postUrl, file).then(() => {
      UserStore.setUserAvatar(avatarUpdate.avatarUrl);
      return avatarUpdate.avatarUrl;
    });
  }
}

export const UserService = new UserServiceImpl();
