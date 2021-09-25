import { CreateGameRequest } from "../models/requests/CreateGameRequest";
import { CreateFullGameRequest, GameAdapter } from "../adapter/GameAdapter";
import * as uuid from "uuid";
import { Game } from "../models/projections/Game";

export class GameService {
  /**
   * Creates a game from the request.
   * @param createGameRequest game parameters
   */
  static async createGame(createGameRequest: CreateGameRequest): Promise<Game> {
    const gameId = uuid.v4();
    const createdAt = new Date().getTime();

    const fullRequest: CreateFullGameRequest = {
      gameId,
      createdAt,
      players: [],
      gameBoardValues: [],
      ...createGameRequest,
    };

    const game = GameAdapter.createGame(fullRequest);
    return game;
  }

  /**
   * Retrieves all active games.
   */
  static async getGames(): Promise<Game[]> {
    const games = GameAdapter.getActiveGames();
    return games;
  }

  /**
   * Delete a game for the active user.
   * @param userId userId
   * @param gameId gameId
   */
  static async deleteGame(userId: string, gameId: string): Promise<void> {
    return GameAdapter.deleteGame(userId, gameId);
  }
}
