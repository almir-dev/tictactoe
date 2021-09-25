import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { UserService } from "../../../business/service/UserService";
import { api201, extractUserId, middyfy } from "../../utils";
import { CreateUserRequest } from "../../../business/models/requests/CreateUserRequest";

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = extractUserId(event);

  const createUserRequest: CreateUserRequest = {
    ...JSON.parse(event.body),
    userId,
  };
  const content = await UserService.createUser(createUserRequest);

  return api201(content);
});

middyfy(handler);
