import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { UserService } from "../../../business/service/UserService";
import { api200, api404, middyfy } from "../../utils";
import { createLogger } from "../../../utils/logger";
const logger = createLogger("user");

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = decodeURI(event.pathParameters.userId);

  const content = await UserService.getUser(userId);

  if (!content) {
    return api404();
  }

  logger.info("Successfully found user", {
    userId: userId,
    userName: content.userName,
    date: new Date().toISOString,
  });

  return api200(content);
});

middyfy(handler);
