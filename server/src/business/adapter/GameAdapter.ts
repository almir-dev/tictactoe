import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { createDynamoDBClient } from "./utils";
import { CreateGameRequest } from "../models/requests/CreateGameRequest";
import { Game } from "../models/projections/Game";

export class GameAdapter {
  private static readonly DOCUMENT_CLIENT: DocumentClient =
    createDynamoDBClient();
  private static readonly GAME_TABLE = process.env.GAME_TABLE;

  static async createGame(
    gameId: string,
    createdAt: number,
    createGameRequest: CreateGameRequest
  ): Promise<Game> {
    const Item = {
      ...createGameRequest,
      gameId,
      createdAt,
    };
    const params = {
      TableName: this.GAME_TABLE,
      Item,
    };

    this.DOCUMENT_CLIENT.put(params).promise();
    return Item;
  }

  static async getGames(): Promise<Game[]> {
    const result = this.DOCUMENT_CLIENT.scan({
      TableName: this.GAME_TABLE,
      FilterExpression: "available = :active",
      ExpressionAttributeValues: {
        ":active": true,
      },
    }).promise();

    return result.then((result) => {
      return result.Items as unknown as Game[];
    });
  }
}
