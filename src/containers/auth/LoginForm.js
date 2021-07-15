import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/auth/AuthForm";
import { changeField } from "../../modules/auth";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { id, password } = useSelector(({ auth }) => ({
    id: auth.id,
    password: auth.password,
  }));

  const onChange = (e) => {
    const { value: text, name: key } = e.target;
    dispatch(changeField({ key, text }));
  };

  return (
    <AuthForm
      onChange={onChange}
      content="Login"
      text={{ id, password }}
    ></AuthForm>
  );
};

export default LoginForm;
