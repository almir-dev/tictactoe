import { CreateGameRequest } from "../models/requests/CreateGameRequest";
import { CreateFullGameRequest, GameAdapter } from "../adapter/GameAdapter";
import * as uuid from "uuid";
import { Game } from "../models/projections/Game";
import {
  FullUpdateGamePlayerStateRequest,
  PlayerInfo,
  UpdateGamePlayerStateRequest,
} from "../models/requests/UpdateGamePlayerStateRequest";

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
    const games = await GameAdapter.getActiveGames();
    return games.filter((game) => game.players.length < 2);
  }

  /**
   * Retrieves specific game.
   */
  static async getGame(gameId: string): Promise<Game> {
    return GameAdapter.getGame(gameId);
  }

  /**
   * Delete a game for the active user.
   * @param userId userId
   * @param gameId gameId
   */
  static async deleteGame(userId: string, gameId: string): Promise<void> {
    return GameAdapter.deleteGame(userId, gameId);
  }

  /**
   * Update the games players and active player values.
   * @param updateGamePlayerState new player state
   * @param gameId game id
   * @param userId user id
   */
  static async updateGamePlayerState(
    updateGamePlayerState: UpdateGamePlayerStateRequest,
    gameId: string,
    userId: string
  ): Promise<void> {
    const players: PlayerInfo[] = updateGamePlayerState.players.map((p) => {
      return {
        playerId: p,
        lastHealthCheck: new Date().getTime(),
      };
    });

    const fullRequest: FullUpdateGamePlayerStateRequest = {
      gameId,
      userId,
      players,
      activePlayer: updateGamePlayerState.activePlayer,
    };

    return GameAdapter.updateGamePlayerState(fullRequest);
  }
}
