import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { api201, extractUserId, middyfy } from "../../utils";
import { CreateGameRequest } from "../../../business/models/requests/CreateGameRequest";
import { GameService } from "../../../business/service/GameService";

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = extractUserId(event);

  const createUserRequest: CreateGameRequest = {
    ...JSON.parse(event.body),
    userId,
  };
  const content = await GameService.createGame(createUserRequest);

  return api201(content);
});

middyfy(handler);
