import { CreateGameRequest } from "../requests/CreateGameRequest";
import { GameAdapter } from "../adapter/GameAdapter";
import * as uuid from "uuid";
import { Game } from "../models/Game";

export class GameService {
  static async createGame(createGameRequest: CreateGameRequest): Promise<Game> {
    const gameId = uuid.v4();
    const createdAt = new Date().getTime();
    const game = GameAdapter.createGame(gameId, createdAt, createGameRequest);
    return game;
  }

  static async getGames(): Promise<Game[]> {
    const games = GameAdapter.getGames();
    return games;
  }
}
