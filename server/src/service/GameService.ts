import { CreateGameRequest } from "../requests/CreateGameRequest";
import { GameAdapter } from "../adapter/GameAdapter";
import * as uuid from "uuid";

export class GameService {
  static async createGame(createGameRequest: CreateGameRequest) {
    const gameId = uuid.v4();
    const game = GameAdapter.createGame(gameId, createGameRequest);
    return game;
  }
}
