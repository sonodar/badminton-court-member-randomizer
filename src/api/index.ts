import { Amplify } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

// https://github.com/aws-amplify/amplify-js/issues/5130
DataStore.start().catch(() => {
	DataStore.clear().then(() => {
		DataStore.start();
	});
});

export * from "./environment";
export * from "./event";
