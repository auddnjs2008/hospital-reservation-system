import React, { useRef } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import Button from "../common/Button";
import { CognitoUser } from "amazon-cognito-identity-js";
import { useSelector } from "react-redux";
import userPool from "../../lib/awsconfig";

const ConfirmFormBlock = styled.form``;

const ConfirmForm = ({ history }) => {
  const { id } = useSelector(({ auth: { auth } }) => ({ id: auth.id }));
  const confirm = useRef();
  const cognitoUser = new CognitoUser({
    Username: id,
    Pool: userPool,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    cognitoUser.confirmRegistration(
      confirm.current.value,
      true,
      (err, result) => {
        if (err) {
          alert("error");
          return;
        }
        alert("성공");
        confirm.current.value = "";
        history.push("/user");
      }
    );
  };

  return (
    <ConfirmFormBlock onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="email-confirm-code"
        name="confirm"
        ref={confirm}
      />
      <Button content="confirm"></Button>
    </ConfirmFormBlock>
  );
};

export default withRouter(ConfirmForm);
