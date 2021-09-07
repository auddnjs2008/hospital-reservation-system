import React, { useRef } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "aws-amplify";
import { login } from "../../modules/auth";
import { IStore, Props } from "../../../types";

const ConfirmFormBlock = styled.form``;

const ConfirmForm = ({ history }: Props) => {
  const dispatch = useDispatch();
  const { id, password } = useSelector(({ auth: { auth } }: IStore) => ({
    id: auth.Inputid,
    password: auth.InputPassword,
  }));
  const confirm = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await Auth.confirmSignUp(id, confirm.current!.value);
      const user = await Auth.signIn(id, password);
      dispatch(login({ id }));
      user.attributes["custom:hospital_name"]
        ? history.push("/")
        : history.push("/user");
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
