import Axios from "axios";
import { apiEndpoint } from "../auth/config";
import { auth } from "../../components/App";
import { CreateGameRequest } from "../../../../server/src/requests/CreateGameRequest";

export interface Game {
  gameId: string;
  userId: string;
  createdAt: number;
  available: boolean;
  userName: string;
}

class GameResourceImpl {
  async getAvailableGames(): Promise<Game[]> {
    const result = await Axios.get(`${apiEndpoint}/game`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.idToken}`,
      },
    });

    return result.data;
  }

  async createGame(game: CreateGameRequest): Promise<Game> {
    const result = await Axios.post(
      `${apiEndpoint}/game`,
      JSON.stringify(game),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.idToken}`,
        },
      }
    );

    return result.data;
  }
}

export const GameResource = new GameResourceImpl();
