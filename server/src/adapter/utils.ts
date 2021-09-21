import * as AWS from "aws-sdk";

const AWSXRay = require("aws-xray-sdk");
const XAWS = AWSXRay.captureAWS(AWS);

export function createDynamoDBClient() {
  return new XAWS.DynamoDB.DocumentClient();
}
