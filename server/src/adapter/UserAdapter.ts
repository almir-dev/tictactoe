import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { User } from "./User";
import { CreateUserRequest } from "../requests/CreateTodoRequest";
import { AWSError } from "aws-sdk";

const AWSXRay = require("aws-xray-sdk");
const XAWS = AWSXRay.captureAWS(AWS);

export class UserAdapter {
  private static readonly DOCUMENT_CLIENT: DocumentClient =
    UserAdapter.createDynamoDBClient();
  private static readonly USER_TABLE = process.env.USER_TABLE;
  private static readonly S3 = new XAWS.S3({ signatureVersion: "v4" });
  private static readonly AVATAR_BUCKET = process.env.AVATAR_BUCKET;

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

  static async createAvatarUrl(avatarId: string): Promise<string> {
    const attachmentUrl = await this.S3.getSignedUrl("putObject", {
      Bucket: this.AVATAR_BUCKET,
      Key: avatarId,
      Expires: 300,
    });

    return attachmentUrl;
  }

  public static async updateUserAvatar(
    userId: string,
    userName: string,
    avatarId: string
  ): Promise<void> {
    const handleError = (error: AWSError) => {
      if (error) {
        throw new Error("Error " + error);
      }
    };

    this.DOCUMENT_CLIENT.update(
      {
        TableName: this.USER_TABLE,
        Key: { userId, userName },
        UpdateExpression: "set avatar = :avatar",
        ExpressionAttributeValues: {
          ":avatar": `https://${this.AVATAR_BUCKET}.s3.amazonaws.com/${avatarId}`,
        },
      },
      handleError
    );
  }

  private static createDynamoDBClient() {
    return new XAWS.DynamoDB.DocumentClient();
  }
}
