import { CognitoUserPool } from "amazon-cognito-identity-js";

// region: "ap-northeast-2",
const awsconfig = {
  UserPoolId: "ap-northeast-2_0DUJPzcri",
  ClientId: "45r3thdrpdtk0m7oog85vlfeds",
};
const userPool = new CognitoUserPool(awsconfig);
export default userPool;
