import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { api201, middyfy } from "../../utils";
import { GameService } from "../../../business/service/GameService";
import { UpdateGameBoardStateRequest } from "../../../business/models/requests/UpdateGameBoardStateRequest";

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const createUserRequest: UpdateGameBoardStateRequest = JSON.parse(event.body);
  const gameId = event.pathParameters.gameId;
  const content = await GameService.updateGameBoardState(createUserRequest, gameId);

  return api201(content);
});

middyfy(handler);
