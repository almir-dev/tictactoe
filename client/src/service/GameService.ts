import { Game, GameResource } from "./rest/GameResource";
import { UserStore } from "./UserStore";
import { CreateGameRequest } from "../../../server/src/business/models/requests/CreateGameRequest";

export interface GameViewModel {
  gameId: string;
  gameName: string;
  host: string;
  createdAt: number;
  players: string;
  hostId: string;
}

class GameServiceImpl {
  getAvailableGames(): Promise<GameViewModel[]> {
    return GameResource.getAvailableGames().then((result) => {
      return result.map(this.toViewModel);
    });
  }

  createGame(gameName: string) {
    const userId = UserStore.getUserId()!;
    const userName = UserStore.getUserName()!;

    const game: CreateGameRequest = {
      userId,
      userName,
      gameName,
    };

    return GameResource.createGame(game).then((result) => {
      return this.toViewModel(result);
    });
  }

  /**
   * Deletes a game with the given gameId.
   * @param gameId gameId
   */
  deleteGame(gameId: string) {
    return GameResource.deleteGame(gameId);
  }

  /**
   * Adds current user to the game session.
   * @param gameId game id
   */
  joinGame(gameId: string): Promise<void> {
    return GameResource.getGame(gameId).then((game) => {
      const userId = UserStore.getUserId()!;
      const existingPlayers = game.players.map((p) => p.playerId);
      const players = [...existingPlayers, userId];
      const activePlayer = game.activePlayer === null ? userId : null;
      GameResource.updateGamePlayerState(gameId, players, activePlayer);
    });
  }

  updateGameBoard(gameId: string, gameBoardValues: string[], activePlayer: string): Promise<void> {
    return GameResource.updateGameBoardState(gameId, gameBoardValues, activePlayer);
  }

  getGame(gameId: string): Promise<Game> {
    return GameResource.getGame(gameId);
  }

  private toViewModel(game: Game): GameViewModel {
    return {
      gameId: game.gameId,
      gameName: game.gameName,
      host: game.userName,
      createdAt: game.createdAt,
      players: "1/2",
      hostId: game.userId,
    };
  }
}

export const GameService = new GameServiceImpl();
