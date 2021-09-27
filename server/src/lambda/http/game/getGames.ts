import { APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { api200, middyfy } from "../../utils";
import { GameService } from "../../../business/service/GameService";
import { createLogger } from "../../../utils/logger";
const logger = createLogger("user");
export const handler = middy(async (): Promise<APIGatewayProxyResult> => {
  const content = await GameService.getGames();

  logger.info("Successfully found games", {
    count: content.length,
    date: new Date().toISOString,
  });

  return api200(content);
});

middyfy(handler);
