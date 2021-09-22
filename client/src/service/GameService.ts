import { Game, GameResource } from "./rest/GameResource";

export interface GameViewModel {
  gameId: string;
  host: string;
  createdAt: number;
  players: string;
}

class GameServiceImpl {
  async getAvailableGames(): Promise<GameViewModel[]> {
    return GameResource.getAvailableGames().then((result) => {
      return result.map(this.toViewModel);
    });
  }

  private toViewModel(game: Game): GameViewModel {
    return {
      gameId: game.gameId,
      host: game.userName,
      createdAt: game.createdAt,
      players: "1/2",
    };
  }
}

export const GameService = new GameServiceImpl();
