import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { api201, extractUserId, middyfy } from "../../utils";
import { UserService } from "../../../business/service/UserService";
import { CreateUserAvatarResponse } from "../../../business/models/response/CreateUserAvatarResponse";

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = extractUserId(event);
  const response: CreateUserAvatarResponse = await UserService.createUserAvatar(userId);

  return api201(response);
});

middyfy(handler);
