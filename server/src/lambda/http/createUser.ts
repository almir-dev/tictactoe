import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";

import { decodeJWTFromAPIGatewayEvent, parseUserId } from "../../auth/utils";
import { UserService } from "../../service/UserService";
import { api201 } from "../utils";
import { CreateUserRequest } from "../../requests/CreateTodoRequest";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const jwtToken = decodeJWTFromAPIGatewayEvent(event);
    const userId = parseUserId(jwtToken);

    const createUserRequest: CreateUserRequest = {
      ...JSON.parse(event.body),
      userId,
    };
    const content = await UserService.createUser(createUserRequest);

    return api201(content);
  }
);

handler.use(cors({ credentials: true })).use(httpErrorHandler());
