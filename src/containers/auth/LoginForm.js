import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/auth/AuthForm";
import { changeField } from "../../modules/auth";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector(({ auth }) => ({
    email: auth.email,
    password: auth.password,
  }));

  const onChange = (e) => {
    const { value: text, name: key } = e.target;
    dispatch(changeField({ key, text }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <AuthForm
      onChange={onChange}
      onSubmit={onSubmit}
      content="Login"
      text={{ email, password }}
    ></AuthForm>
  );
};

export default LoginForm;
