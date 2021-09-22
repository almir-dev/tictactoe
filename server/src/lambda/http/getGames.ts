import { APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";
import { api200 } from "../utils";
import { GameService } from "../../service/GameService";

export const handler = middy(async (): Promise<APIGatewayProxyResult> => {
  const content = await GameService.getGames();
  return api200(content);
});

handler.use(cors({ credentials: true })).use(httpErrorHandler());
