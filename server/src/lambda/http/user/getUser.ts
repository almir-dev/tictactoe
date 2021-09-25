import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { UserService } from "../../../business/service/UserService";
import { api200, api204, extractUserId, middyfy } from "../../utils";

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = extractUserId(event);

  const content = await UserService.getUser(userId);

  if (!content) {
    return api204();
  }

  return api200(content);
});

middyfy(handler);
