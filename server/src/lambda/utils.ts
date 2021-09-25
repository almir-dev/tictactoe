import { APIGatewayProxyEvent } from "aws-lambda";
import { cors, httpErrorHandler } from "middy/middlewares";
import { decode } from "jsonwebtoken";
import { JwtPayload } from "./auth/JwtPayload";

/**
 * Parse a JWT token and return a getUser id
 * @param jwtToken JWT token to parse
 * @returns a getUser id from the JWT token
 */
export function parseUserId(jwtToken: string): string {
  const decodedJwt = decode(jwtToken) as JwtPayload;
  return decodedJwt.sub;
}

/**
 * Parse an APIGatewayProxy's event and return a JWT token
 * @param event APIGatewayProxyEvent
 * @returns JWT token
 */
export function decodeJWTFromAPIGatewayEvent(event: APIGatewayProxyEvent): string {
  const authorization = event.headers.Authorization;
  const split = authorization.split(" ");
  return split[1];
}

/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns userId from a JWT token
 */
export function extractUserId(event: APIGatewayProxyEvent) {
  const jwtToken = decodeJWTFromAPIGatewayEvent(event);
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

/* middyfy handle with cors and error handler. */
export const middyfy = (handler) => {
  handler.use(cors({ credentials: true })).use(httpErrorHandler());
};
