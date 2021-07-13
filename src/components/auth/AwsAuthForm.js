import React from "react";
import styled from "styled-components";
import Amplify from "aws-amplify";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../../lib/awsconfig";

Amplify.configure(awsconfig);

const AwsAuthFormBlock = styled.div``;

const AwsAuthForm = () => {
  return (
    <AmplifyAuthenticator>
      <div>only logged in user can see in</div>
    </AmplifyAuthenticator>
  );
};

export default AwsAuthForm;
