import React, { useRef } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "aws-amplify";
import { login } from "../../modules/auth";

const ConfirmFormBlock = styled.form``;

const ConfirmForm = ({ history }) => {
  const dispatch = useDispatch();
  const { id, password } = useSelector(({ auth: { auth } }) => ({
    id: auth.Inputid,
    password: auth.InputPassword,
  }));
  const confirm = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await Auth.confirmSignUp(id, confirm.current.value);
      await Auth.signIn(id, password);
      dispatch(login({ id }));
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
