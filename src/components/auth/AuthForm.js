import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";
import pallet from "../../lib/styles/pallet";

import { useRef } from "react";
import ConfirmForm from "./ConfirmForm";
import { useDispatch } from "react-redux";
import { emptyField } from "../../modules/auth";

import { Auth } from "aws-amplify";

const AuthFormBlock = styled.div`
  width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: auto;
  border-radius: 10px;
  border: 3px solid ${pallet.green[2]};
  h2 {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: inherit;
    height: 60%;
    padding: 20px;
  }
  input {
    width: 100%;
    height: 2.5rem;
    border: none;
    outline: none;
    border-bottom: 2px solid ${pallet.black[2]};
    margin-bottom: 50px;
    font-size: 20px;
    &::nth-last-child {
      margin-bottom: 10px;
    }
    &::placeholder {
      font-size: 20px;
    }
  }
  footer {
    width: 100%;
    padding: 20px;
    text-align: end;
    margin-top: -100px;
    font-size: 15px;
    font-weight: 500;
    a {
      font-size: 20px;
    }
  }
`;

const AuthForm = ({ onChange, content, text, history }) => {
  const dispatch = useDispatch();
  const [confirmSw, setConfirmSw] = useState(false);
  const id = useRef();
  const password = useRef();
  const email = useRef();

  const LogInSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await Auth.signIn(id.current.value, password.current.value);
    } catch (e) {
      alert(`${e}`);
    }

    dispatch(emptyField());
  };

  const SignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await Auth.signUp({
        username: id.current.value,
        password: password.current.value,
        attributes: {
          email: email.current.value,
        },
      });

      setConfirmSw(true);
    } catch (error) {
      alert(`${error}`);
      console.log(error);
    }

    // dispatch(emptyField());
  };

  return (
    <AuthFormBlock>
      <h2>{content || "LOGIN"}</h2>
      {confirmSw ? (
        <ConfirmForm />
      ) : (
        <form onSubmit={content === "Login" ? LogInSubmit : SignUpSubmit}>
          <input
            onChange={onChange}
            type="text"
            ref={id}
            placeholder="id"
            value={text.email}
            name="id"
          ></input>
          <input
            onChange={onChange}
            type="password"
            ref={password}
            placeholder="password"
            name="password"
            value={text.password}
          ></input>
          {content === "SIGN UP" && (
            <input
              onChange={onChange}
              type="email"
              ref={email}
              placeholder="email"
              name="email"
              value={text.email}
              style={{ marginBottom: "20px" }}
            ></input>
          )}

          <Button content={content}></Button>
        </form>
      )}
      <footer>
        <Link to={content === "Login" ? "/register" : "/login"}>
          {content === "Login" ? "SIGN UP" : "Login"}
        </Link>
      </footer>
    </AuthFormBlock>
  );
};

export default withRouter(AuthForm);
