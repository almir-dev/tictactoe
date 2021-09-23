import { APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { api200, middyfy } from "../../utils";
import { GameService } from "../../../business/service/GameService";

export const handler = middy(async (): Promise<APIGatewayProxyResult> => {
  const content = await GameService.getGames();
  return api200(content);
});

middyfy(handler);
