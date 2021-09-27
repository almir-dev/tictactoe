import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { api201, middyfy } from "../../utils";
import { GameService } from "../../../business/service/GameService";
import { UpdateGamePlayerStateRequest } from "../../../business/models/requests/UpdateGamePlayerStateRequest";
import { createLogger } from "../../../utils/logger";
const logger = createLogger("user");
export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const createUserRequest: UpdateGamePlayerStateRequest = JSON.parse(event.body);
  const gameId = event.pathParameters.gameId;
  const content = await GameService.updateGamePlayerState(createUserRequest, gameId);

  logger.info("Successfully updated game board state", {
    count: gameId,
    state: content,
    date: new Date().toISOString,
  });

  return api201(content);
});

middyfy(handler);
