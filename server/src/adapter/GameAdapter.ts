import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { User } from "../models/User";
import { createDynamoDBClient } from "./utils";
import { CreateGameRequest } from "../requests/CreateGameRequest";

export class GameAdapter {
  private static readonly DOCUMENT_CLIENT: DocumentClient =
    createDynamoDBClient();
  private static readonly GAME_TABLE = process.env.GAME_TABLE;

  static async createGame(
    gameId: string,
    createGameRequest: CreateGameRequest
  ): Promise<User> {
    const Item = {
      ...createGameRequest,
      gameId,
    };
    const params = {
      TableName: this.GAME_TABLE,
      Item,
    };

    this.DOCUMENT_CLIENT.put(params).promise();
    return createGameRequest;
  }
}
