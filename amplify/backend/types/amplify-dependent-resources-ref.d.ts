export type AmplifyDependentResourcesAttributes = {
  api: {
    DoublesMemberGenerator: {
      GraphQLAPIKeyOutput: "string";
      GraphQLAPIIdOutput: "string";
      GraphQLAPIEndpointOutput: "string";
    };
  };
  function: {
    DoublesMemberGeneratorEventCleaner: {
      Name: "string";
      Arn: "string";
      Region: "string";
      LambdaExecutionRole: "string";
      LambdaExecutionRoleArn: "string";
    };
  };
};
