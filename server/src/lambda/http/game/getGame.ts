import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { api200, middyfy } from "../../utils";
import { GameService } from "../../../business/service/GameService";

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const gameId = event.pathParameters.gameId;

  const content = await GameService.getGame(gameId);
  return api200(content);
});

middyfy(handler);
