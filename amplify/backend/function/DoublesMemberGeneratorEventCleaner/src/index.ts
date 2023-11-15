/* Amplify Params - DO NOT EDIT
	API_DOUBLESMEMBERGENERATOR_EVENTTABLE_ARN
	API_DOUBLESMEMBERGENERATOR_EVENTTABLE_NAME
	API_DOUBLESMEMBERGENERATOR_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import type { DynamoDBStreamHandler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const EVENT_TABLE = process.env.API_DOUBLESMEMBERGENERATOR_EVENTTABLE_NAME!;

const ddb = new DynamoDBClient({});
const doc = DynamoDBDocumentClient.from(ddb);

/**
 * ttl による削除などにより Environment が削除された場合に関連する Event を削除する。
 */
export const handler: DynamoDBStreamHandler = async (event) => {
  for (const { dynamodb, eventName, eventSourceARN } of event.Records) {
    if (!dynamodb || eventName !== "REMOVE" || !eventSourceARN) {
      continue;
    }

    const envId = dynamodb.Keys?.id?.S;
    if (!envId) continue;

    for (const id of await getEventIdsByEnvironmentId(envId)) {
      await deleteEventById(id);
      console.log(`Deleted event: ${id}`);
    }

    console.log(`Deleted events by environment id: ${envId}`);
  }
};

async function getEventIdsByEnvironmentId(
  environmentID: string,
): Promise<string[]> {
  const output = await doc.send(
    new QueryCommand({
      TableName: EVENT_TABLE,
      IndexName: "byEnvironment",
      KeyConditionExpression: "environmentID = :environmentID",
      ExpressionAttributeValues: {
        ":environmentID": environmentID,
      },
    }),
  );
  return (output?.Items || []).map((item) => item.id);
}

async function deleteEventById(id: string): Promise<void> {
  const command = new DeleteCommand({ TableName: EVENT_TABLE, Key: { id } });
  await doc.send(command);
}
