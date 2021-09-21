import Axios from "axios";
import { apiEndpoint } from "../auth/config";
import { auth } from "../../components/App";

export interface User {
  userId: string;
  userName: string;
  avatar?: string;
}

export interface AvatarUpdate {
  postUrl: string;
  avatarUrl: string;
}

class UserResourceImpl {
  async getUser(): Promise<User> {
    const result = await Axios.get(`${apiEndpoint}/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.idToken}`,
      },
    });

    return result.data;
  }

  async updateUserAvatar(userName: string): Promise<AvatarUpdate> {
    const result = await Axios.post(
      `${apiEndpoint}/user/${userName}/avatar`,
      "",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.idToken}`,
        },
      }
    );

    return result.data;
  }

  async uploadImage(url: string, file: Buffer): Promise<void> {
    return await Axios.put(url, file);
  }
}

export const UserResource = new UserResourceImpl();
