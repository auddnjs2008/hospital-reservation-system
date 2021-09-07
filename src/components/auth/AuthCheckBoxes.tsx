import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { IAuthCheckBoxes } from "../../../types";

const AuthCheckBoxesBlock = styled.div`
  display: flex;
  justify-content: space-around;

  width: 100%;
  height: 30px;
  label {
    display: flex;

    input {
      width: 1rem;
      height: 1rem;
    }
  }
`;

const AuthCheckBoxes: React.FC<IAuthCheckBoxes> = ({
  manager,
  user,
  setHospital,
  value,
  content,
}) => {
  const [boxView, setBoxView] = useState(false);

  const onCheckBoxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement).checked) {
      if (user.current && manager.current) {
        e.target === manager.current
          ? (user.current.checked = false)
          : (manager.current.checked = false);
      }
    } else {
      if (user.current && manager.current) {
        e.target === manager.current
          ? (user.current.checked = true)
          : (manager.current.checked = true);
      }
    }
    manager.current && manager.current.checked
      ? setBoxView(true)
      : setBoxView(false);
  };
  useEffect(() => {
    if (user.current) user.current.checked = true;
  }, [user]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHospital(value);
  };

  return (
    <>
      <AuthCheckBoxesBlock>
        <label>
          <input
            type="checkbox"
            name="manager"
            onClick={onCheckBoxClick}
            ref={manager}
          />
          <span>병원관리자</span>
        </label>
        <label>
          <input
            type="checkbox"
            name="user"
            onClick={onCheckBoxClick}
            ref={user}
          />
          <span>일반사용자</span>
        </label>
      </AuthCheckBoxesBlock>
      {content === "SIGN UP" && boxView && (
        <input
          type="text"
          placeholder="병원이름"
          value={value}
          onChange={onChange}
        ></input>
      )}
    </>
  );
};

export default AuthCheckBoxes;
