import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";
import pallet from "../../lib/styles/pallet";

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

const AuthForm = ({ onChange, onSubmit, content, text }) => {
  return (
    <AuthFormBlock>
      <h2>{content || "LOGIN"}</h2>
      <form>
        <input
          onChange={onChange}
          type="email"
          placeholder="email"
          value={text.email}
          name="email"
        ></input>
        <input
          onChange={onChange}
          type="password"
          placeholder="password"
          name="password"
          value={text.password}
        ></input>
        {content === "SIGN UP" && (
          <input
            type="password"
            placeholder="password-confirm"
            name={"passwordConfirm"}
            style={{ marginBottom: "20px" }}
          ></input>
        )}
        <Button content={content}></Button>
      </form>
      <footer>
        <Link to={content === "Login" ? "/register" : "/login"}>
          {content === "Login" ? "SIGN UP" : "Login"}
        </Link>
      </footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
