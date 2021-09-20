import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";

import { decodeJWTFromAPIGatewayEvent, parseUserId } from "../../auth/utils";
import { api201 } from "../utils";
import { UserService } from "../../service/UserService";
import { CreateUserAvatarResponse } from "../../response/CreateUserAvatarResponse";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const jwtToken = decodeJWTFromAPIGatewayEvent(event);
    const userId = parseUserId(jwtToken);
    const userName = event.pathParameters.userName;

    const response: CreateUserAvatarResponse =
      await UserService.createUserAvatar(userId, userName);

    return api201(response);
  }
);

handler.use(cors({ credentials: true })).use(httpErrorHandler());
