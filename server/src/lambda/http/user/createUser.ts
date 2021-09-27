import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { UserService } from "../../../business/service/UserService";
import { api201, extractUserId, middyfy } from "../../utils";
import { createLogger } from "../../../utils/logger";
const logger = createLogger("user");

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = extractUserId(event);
  const content = await UserService.createUser(userId);

  logger.info("Successfully created user", {
    userId: userId,
    date: new Date().toISOString,
  });

  return api201(content);
});

middyfy(handler);
