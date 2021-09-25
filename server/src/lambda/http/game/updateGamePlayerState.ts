import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { api201, extractUserId, middyfy } from "../../utils";
import { GameService } from "../../../business/service/GameService";
import { UpdateGamePlayerStateRequest } from "../../../business/models/requests/UpdateGamePlayerStateRequest";

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const createUserRequest: UpdateGamePlayerStateRequest = JSON.parse(event.body);
  const gameId = event.pathParameters.gameId;
  const userId = extractUserId(event);
  const content = await GameService.updateGamePlayerState(createUserRequest, gameId, userId);

  return api201(content);
});

middyfy(handler);
