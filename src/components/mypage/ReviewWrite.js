import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";

const ReviewWriteBlock = styled.div`
  width: 500px;
  height: 20rem;
  padding: 0.4rem;
  border: 1px solid black;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h1 {
    font-size: 2rem;
  }
  form {
    border: 1px solid red;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .rate {
      display: flex;
      border: 1px solid black;
      align-items: center;
    }
    .starBox {
      display: flex;
    }
  }
  textarea {
    flex: 1;
    height: 100%;
    resize: none;
    padding: 0;
  }
  span.close {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const StyledStar = styled.div`
  color: ${(props) => (props.color ? "#ffc048" : "")};
  font-size: 2rem;
`;

const ReviewWrite = ({ hospital, setReview }) => {
  const [starNum, setStarNum] = useState(0);

  const onClick = (e) => {
    if (Number(e.currentTarget.id) <= starNum) {
      setStarNum(0);
      return;
    }
    setStarNum(e.currentTarget.id);
  };

  return (
    <ReviewWriteBlock>
      <h1>{hospital}</h1>
      <p>후기를 남겨주세요</p>
      <form>
        <div className="rate">
          <div className="starBox">
            <StyledStar color={1 <= starNum} id={1} onClick={onClick}>
              <FontAwesomeIcon
                icon={faStar}
                onClick={onClick}
              ></FontAwesomeIcon>
            </StyledStar>
            <StyledStar color={2 <= starNum} id={2} onClick={onClick}>
              <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            </StyledStar>
            <StyledStar color={3 <= starNum} id={3} onClick={onClick}>
              <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            </StyledStar>
            <StyledStar color={4 <= starNum} id={4} onClick={onClick}>
              <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            </StyledStar>
            <StyledStar color={5 <= starNum} id={5} onClick={onClick}>
              <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            </StyledStar>
          </div>
          <span>{starNum}/5</span>
        </div>
        <textarea></textarea>
      </form>
      <span className="close" onClick={() => setReview(false)}>
        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
      </span>
    </ReviewWriteBlock>
  );
};

export default ReviewWrite;
