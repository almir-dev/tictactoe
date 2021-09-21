import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";

import { decodeJWTFromAPIGatewayEvent, parseUserId } from "../../auth/utils";
import { UserService } from "../../service/UserService";
import { api200 } from "../utils";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const jwtToken = decodeJWTFromAPIGatewayEvent(event);
    const userId = parseUserId(jwtToken);

    const content = await UserService.getUser(userId);
    return api200(content);
  }
);

handler.use(cors({ credentials: true })).use(httpErrorHandler());
