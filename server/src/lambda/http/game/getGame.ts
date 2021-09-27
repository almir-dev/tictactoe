import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { api200, middyfy } from "../../utils";
import { GameService } from "../../../business/service/GameService";
import { createLogger } from "../../../utils/logger";
const logger = createLogger("user");
export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const gameId = event.pathParameters.gameId;

  const content = await GameService.getGame(gameId);

  logger.info("Successfully found game", {
    gameId: gameId,
    date: new Date().toISOString,
  });

  return api200(content);
});

middyfy(handler);
