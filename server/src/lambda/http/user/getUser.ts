import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { UserService } from "../../../business/service/UserService";
import { api200, extractUserId, middyfy } from "../../utils";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = extractUserId(event);

    const content = await UserService.getUser(userId);
    return api200(content);
  }
);

middyfy(handler);
