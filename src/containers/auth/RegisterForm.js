import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AuthForm from "../../components/auth/AuthForm";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector(({ auth }) => ({
    email: auth.email,
    password: auth.email,
  }));
  const onChange = () => {};

  const onSubmit = () => {};

  return <AuthForm content="SIGN UP" text={{ email, password }}></AuthForm>;
};

export default RegisterForm;
