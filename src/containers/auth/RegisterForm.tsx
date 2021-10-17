import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../../types";
import AuthForm from "../../components/auth/AuthForm";
import { changeField } from "../../modules/auth";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { id, password, email } = useSelector(({ auth: { auth } }: IStore) => ({
    id: auth.Inputid,
    password: auth.InputPassword,
    email: auth.email,
  }));
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: text, name: key } = e.target;
    dispatch(changeField({ key, text }));
  };

  return (
    <AuthForm
      content="SIGN UP"
      onChange={onChange}
      text={{ id, password, email }}
    ></AuthForm>
  );
};

export default RegisterForm;
