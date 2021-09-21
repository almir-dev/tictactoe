import { APIGatewayProxyEvent } from "aws-lambda";
import { parseUserId } from "../auth/utils";

/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns userId from a JWT token
 */
export function getUserId(event: APIGatewayProxyEvent): string {
  const authorization = event.headers.Authorization;
  const split = authorization.split(" ");
  const jwtToken = split[1];

  return parseUserId(jwtToken);
}

/**
 * Create a 201 response from input.
 * @param response response body
 */
export const api201 = (response: unknown) => {
  return {
    statusCode: 201,
    body: JSON.stringify(response),
  };
};

/**
 * Create a 200 response from input.
 * @param response response body
 */
export const api200 = (response: unknown) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
