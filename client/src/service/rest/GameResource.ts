import Axios from "axios";
import { apiEndpoint } from "../auth/config";
import { CreateGameRequest } from "../../../../server/src/business/models/requests/CreateGameRequest";
import { getApiConfig } from "./utils";

export interface PlayerInfo {
  playerId: string;
  lastHealthCheck: number;
}

export interface Game {
  gameId: string;
  gameName: string;
  userId: string;
  createdAt: number;
  available: boolean;
  userName: string;
  players: PlayerInfo[];
  activePlayer?: string;
}

class GameResourceImpl {
  async getAvailableGames(): Promise<Game[]> {
    const result = await Axios.get(`${apiEndpoint}/game`, getApiConfig());
    return result.data;
  }

  async createGame(game: CreateGameRequest): Promise<Game> {
    const result = await Axios.post(`${apiEndpoint}/game`, JSON.stringify(game), getApiConfig());
    return result.data;
  }

  /**
   * Deletes a game with the given gameId.
   * @param gameId gameId
   */
  async deleteGame(gameId: string): Promise<Game> {
    const result = await Axios.delete(`${apiEndpoint}/game/${gameId}`, getApiConfig());
    return result.data;
  }

  async updateGamePlayerState(gameId: string, players: string[], activePlayer: string | null): Promise<void> {
    const request = JSON.stringify({ players, activePlayer });
    return await Axios.patch(`${apiEndpoint}/game/${gameId}/players`, request, getApiConfig());
  }

  async updateGameBoardState(gameId: string, gameBoardState: string[], activePlayer: string): Promise<void> {
    const request = JSON.stringify({ gameBoardState, activePlayer });
    console.log("WWW body", request);
    return await Axios.patch(`${apiEndpoint}/game/${gameId}/gameboard`, request, getApiConfig());
  }

  /**
   * Retrieves game with specified id.
   * @param gameId game id
   */
  async getGame(gameId: string): Promise<Game> {
    const result = await Axios.get(`${apiEndpoint}/game/${gameId}`, getApiConfig());
    return result.data;
  }
}

export const GameResource = new GameResourceImpl();
