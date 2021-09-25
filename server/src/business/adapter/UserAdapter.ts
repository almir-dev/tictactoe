import * as AWS from "aws-sdk";
import { AWSError } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { CreateUserRequest } from "../models/requests/CreateUserRequest";
import { User } from "../models/projections/User";

const AWSXRay = require("aws-xray-sdk");
const XAWS = AWSXRay.captureAWS(AWS);

export class UserAdapter {
  private static readonly DOCUMENT_CLIENT: DocumentClient = UserAdapter.createDynamoDBClient();
  private static readonly USER_TABLE = process.env.USER_TABLE;
  private static readonly S3 = new XAWS.S3({ signatureVersion: "v4" });
  private static readonly AVATAR_BUCKET = process.env.AVATAR_BUCKET;

  private static readonly ERROR_HANDLER = (error: AWSError) => {
    if (error) {
      throw new Error("Failed to execute game request: " + error);
    }
  };

  static async createUser(createUserRequest: CreateUserRequest): Promise<User> {
    const params = {
      TableName: this.USER_TABLE,
      Item: createUserRequest,
    };

    this.DOCUMENT_CLIENT.put(params).promise();
    return createUserRequest;
  }

  static async updateUserName(userId: string, userName: string): Promise<void> {
    this.DOCUMENT_CLIENT.update(
      {
        TableName: this.USER_TABLE,
        Key: {
          userId,
        },
        UpdateExpression: "set #userName = :n",
        ExpressionAttributeValues: {
          ":n": userName,
        },
        ExpressionAttributeNames: {
          "#userName": "userName",
        },
      },
      this.ERROR_HANDLER
    );
  }

  static async createAvatarUrl(avatarId: string): Promise<string> {
    const attachmentUrl = await this.S3.getSignedUrl("putObject", {
      Bucket: this.AVATAR_BUCKET,
      Key: avatarId,
      Expires: 300,
    });

    return attachmentUrl;
  }

  static async updateUserAvatar(userId: string, userName: string, avatarId: string): Promise<string> {
    this.DOCUMENT_CLIENT.update(
      {
        TableName: this.USER_TABLE,
        Key: { userId, userName },
        UpdateExpression: "set avatar = :avatar",
        ExpressionAttributeValues: {
          ":avatar": `https://${this.AVATAR_BUCKET}.s3.amazonaws.com/${avatarId}`,
        },
      },
      this.ERROR_HANDLER
    );

    return `https://${this.AVATAR_BUCKET}.s3.amazonaws.com/${avatarId}`;
  }

  static async getUser(userId: string): Promise<User> {
    const result = this.DOCUMENT_CLIENT.query(
      {
        TableName: this.USER_TABLE,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      },
      this.ERROR_HANDLER
    ).promise();

    return result.then((result) => {
      return result.Items[0] as unknown as User;
    });
  }

  private static createDynamoDBClient() {
    return new XAWS.DynamoDB.DocumentClient();
  }
}
