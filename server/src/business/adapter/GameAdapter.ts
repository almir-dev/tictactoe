import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { createDynamoDBClient } from "./utils";
import { CreateGameRequest } from "../models/requests/CreateGameRequest";
import { Game } from "../models/projections/Game";
import { AWSError } from "aws-sdk";

export class GameAdapter {
  private static readonly DOCUMENT_CLIENT: DocumentClient = createDynamoDBClient();
  private static readonly GAME_TABLE = process.env.GAME_TABLE;

  private static readonly ERROR_HANDLER = (error: AWSError) => {
    if (error) {
      throw new Error("Failed to execute game request: " + error);
    }
  };

  static async createGame(gameId: string, createdAt: number, createGameRequest: CreateGameRequest): Promise<Game> {
    const Item = {
      ...createGameRequest,
      gameId,
      createdAt,
    };
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
        FilterExpression: "available = :active",
        ExpressionAttributeValues: {
          ":active": true,
        },
      },
      this.ERROR_HANDLER
    ).promise();

    return result.then((result) => {
      return result.Items as unknown as Game[];
    });
  }

  static async deleteGame(userId: string, gameId: string): Promise<void> {
    const Key = { gameId, userId };
    const params = { TableName: this.GAME_TABLE, Key };
    this.DOCUMENT_CLIENT.delete(params, this.ERROR_HANDLER);
  }
}
