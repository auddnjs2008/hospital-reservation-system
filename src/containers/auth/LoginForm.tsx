import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../../types";
import AuthForm from "../../components/auth/AuthForm";
import { changeField } from "../../modules/auth";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { id, password } = useSelector(({ auth: { auth } }: IStore) => ({
    id: auth.Inputid,
    password: auth.InputPassword,
  }));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: text, name: key } = e.target;
    dispatch(changeField({ key, text }));
  };

  return (
    <AuthForm
      onChange={onChange}
      content="Login"
      text={{ id, password, email: "" }}
    ></AuthForm>
  );
};

export default LoginForm;
