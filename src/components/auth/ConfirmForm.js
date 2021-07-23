import React, { useRef } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import Button from "../common/Button";
import { useSelector } from "react-redux";
import { Auth } from "aws-amplify";

const ConfirmFormBlock = styled.form``;

const ConfirmForm = ({ history }) => {
  const { id } = useSelector(({ auth: { auth } }) => ({ id: auth.id }));
  const confirm = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await Auth.confirmSignUp(id, confirm.current.value);

      history.push("/user");
    } catch (error) {
      alert(`${error}`);
    }
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
