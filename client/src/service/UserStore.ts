import { UserResource } from "./rest/UserResource";

export interface User {
  userId: string;
  userName: string;
  avatar?: string;
}

class UserStoreImpl {
  init(): Promise<void> {
    return UserResource.getUser().then((result) => {
      sessionStorage.setItem("userId", result.userId);
      sessionStorage.setItem("userName", result.userName);
      result.avatar && sessionStorage.setItem("avatar", result.avatar);
      return Promise.resolve();
    });
  }

  getUserName() {
    return sessionStorage.getItem("userName");
  }

  getUserId() {
    return sessionStorage.getItem("userId");
  }

  getUserAvatar() {
    return sessionStorage.getItem("avatar");
  }

  setUserAvatar(url: string) {
    return sessionStorage.setItem("avatar", url);
  }
}

export const UserStore = new UserStoreImpl();
