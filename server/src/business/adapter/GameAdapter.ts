import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { createDynamoDBClient } from "./utils";
import { Game } from "../models/projections/Game";
import { AWSError } from "aws-sdk";
import { FullUpdateGamePlayerStateRequest } from "../models/requests/UpdateGamePlayerStateRequest";

export interface CreateFullGameRequest {
  /* Id of the game*/
  gameId: string;
  /* id of a user. `*/
  userId: string;
  /* username of the user. */
  userName: string;
  /* Name of the session. */
  gameName: string;
  /* values of the game board in 1d array. */
  gameBoardValues: string[];
  /* player user ids. */
  players: string[];
  /* active players id. */
  activePlayer?: string;
  /* timestamp of creation. */
  createdAt: number;
  /* flag indicating whether the game is finished or not. */
  finished: boolean;
}

export class GameAdapter {
  private static readonly DOCUMENT_CLIENT: DocumentClient = createDynamoDBClient();
  private static readonly GAME_TABLE = process.env.GAME_TABLE;

  private static readonly ERROR_HANDLER = (error: AWSError) => {
    if (error) {
      throw new Error("Failed to execute game request: " + error);
    }
  };

  static async createGame(gameFullRequest: CreateFullGameRequest): Promise<Game> {
    const Item = gameFullRequest;
    const params = {
      TableName: this.GAME_TABLE,
      Item,
    };

    this.DOCUMENT_CLIENT.put(params, this.ERROR_HANDLER).promise();
    return Item;
  }

  static async getActiveGames(): Promise<Game[]> {
    const result = this.DOCUMENT_CLIENT.scan(
      {
        TableName: this.GAME_TABLE,
      },
      this.ERROR_HANDLER
    ).promise();

    return result.then((result) => {
      return result.Items as unknown as Game[];
    });
  }

  static async updateGamePlayerState(updateGamePlayerState: FullUpdateGamePlayerStateRequest): Promise<void> {
    const gameId = updateGamePlayerState.gameId;
    const userId = updateGamePlayerState.userId;

    this.DOCUMENT_CLIENT.update(
      {
        TableName: this.GAME_TABLE,
        Key: { gameId, userId },
        UpdateExpression: "set #players = :players, #activePlayer = :activePlayer",
        ExpressionAttributeValues: {
          ":players": updateGamePlayerState.players,
          ":activePlayer": updateGamePlayerState.activePlayer,
        },
        ExpressionAttributeNames: {
          "#players": "players",
          "#activePlayer": "activePlayer",
        },
      },
      this.ERROR_HANDLER
    ).promise();
  }

  static async deleteGame(userId: string, gameId: string): Promise<void> {
    const Key = { gameId, userId };
    const params = { TableName: this.GAME_TABLE, Key };
    this.DOCUMENT_CLIENT.delete(params, this.ERROR_HANDLER);
  }
}
