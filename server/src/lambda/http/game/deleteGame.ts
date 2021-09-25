import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { api200, extractUserId, middyfy } from "../../utils";
import { GameService } from "../../../business/service/GameService";

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = extractUserId(event);
  const gameId = event.pathParameters.gameId;

  await GameService.deleteGame(userId, gameId);

  return api200({});
});

middyfy(handler);
