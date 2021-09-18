import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";

import { decodeJWTFromAPIGatewayEvent, parseUserId } from "../../auth/utils";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const jwtToken = decodeJWTFromAPIGatewayEvent(event);
    const userId = parseUserId(jwtToken);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: `hello ${userId}` }),
    };
  }
);

handler.use(cors({ credentials: true })).use(httpErrorHandler());
