import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { User } from "./User";
import { CreateUserRequest } from "../requests/CreateTodoRequest";

const AWSXRay = require("aws-xray-sdk");
const XAWS = AWSXRay.captureAWS(AWS);

export class UserAdapter {
  private static readonly DOCUMENT_CLIENT: DocumentClient =
    UserAdapter.createDynamoDBClient();
  private static readonly USER_TABLE = process.env.USER_TABLE;

  public static async createUser(
    createUserRequest: CreateUserRequest
  ): Promise<User> {
    const params = {
      TableName: this.USER_TABLE,
      Item: createUserRequest,
    };

    this.DOCUMENT_CLIENT.put(params).promise();
    return createUserRequest;
  }

  private static createDynamoDBClient() {
    return new XAWS.DynamoDB.DocumentClient();
  }
}
