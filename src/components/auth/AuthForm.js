import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";
import pallet from "../../lib/styles/pallet";

import { useRef } from "react";
import ConfirmForm from "./ConfirmForm";
import { useDispatch } from "react-redux";
import { isManager, login } from "../../modules/auth";

import Amplify, { Auth } from "aws-amplify";
import AuthCheckBoxes from "./AuthCheckBoxes";
import { managerConfig, config } from "../../lib/amplifyconfig";

const AuthFormBlock = styled.div`
  width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    align-items: space-between;
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
  const [hospitalName, setHospital] = useState("");
  const id = useRef();
  const password = useRef();
  const email = useRef();
  const manager = useRef();
  const user = useRef();

  const LogInSubmit = async (e) => {
    let user;
    e.preventDefault();

    try {
      manager.current.checked
        ? Amplify.configure(managerConfig)
        : Amplify.configure(config);
      user = await Auth.signIn(id.current.value, password.current.value);
      if (manager.current.checked) {
        dispatch(
          isManager({ hospital: user.attributes["custom:hospital_name"] })
        );
        window.location.href = "/";
        // history.push("/");
        return;
      }
      window.location.href = "/user";
      // history.push("/user");
    } catch (e) {
      alert(`${e}`);
    }
    if (user) dispatch(login({ id: user.username }));
  };

  const SignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      if (manager.current.checked) {
        if (!hospitalName) {
          alert("병원이름을 적어주세요!!");
          return;
        }
        Amplify.configure(managerConfig);

        await Auth.signUp({
          username: id.current.value,
          password: password.current.value,
          attributes: {
            email: email.current.value,
            "custom:hospital_name": hospitalName,
          },
        });
        dispatch(isManager({ hospital: hospitalName }));
      } else {
        Amplify.configure(config);
        await Auth.signUp({
          username: id.current.value,
          password: password.current.value,
          attributes: {
            email: email.current.value,
          },
        });
      }
      setConfirmSw(true);
    } catch (error) {
      if (error.code === "InvalidPasswordException") {
        alert("최소8글자와 숫자,특수문자,대문자,소문자를 모두 사용해주세요");
      }
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
            name="Inputid"
          ></input>
          <input
            onChange={onChange}
            type="password"
            ref={password}
            placeholder="password"
            name="InputPassword"
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
          <AuthCheckBoxes
            manager={manager}
            user={user}
            setHospital={setHospital}
            value={hospitalName}
            content={content}
          />
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
