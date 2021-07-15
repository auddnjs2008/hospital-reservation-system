import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AuthForm from "../../components/auth/AuthForm";
import { changeField } from "../../modules/auth";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { id, password, email } = useSelector(({ auth }) => ({
    id: auth.id,
    password: auth.password,
    email: auth.email,
  }));
  const onChange = (e) => {
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
