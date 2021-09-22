import { Game, GameResource } from "./rest/GameResource";
import { UserStore } from "./UserStore";
import { CreateGameRequest } from "../../../server/src/requests/CreateGameRequest";

export interface GameViewModel {
  gameId: string;
  gameName: string;
  host: string;
  createdAt: number;
  players: string;
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
      available: true,
    };

    return GameResource.createGame(game).then((result) => {
      return this.toViewModel(result);
    });
  }

  private toViewModel(game: Game): GameViewModel {
    return {
      gameId: game.gameId,
      gameName: game.gameName,
      host: game.userName,
      createdAt: game.createdAt,
      players: "1/2",
    };
  }
}

export const GameService = new GameServiceImpl();
