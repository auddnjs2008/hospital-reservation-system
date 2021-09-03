import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { postReviews, setRates } from "../../lib/api/review";
import pallet from "../../lib/styles/pallet";

const ReviewWriteBlock = styled.div`
  width: ${(props) => (props.rvPage ? "90%" : "500px")};
  height: 18rem;
  padding-top: 1rem;

  position: ${(props) => (props.rvPage ? "" : "absolute")};
  display: flex;
  flex-direction: column;
  top: ${(props) =>
    props.scroll ? `${props.scroll + window.innerHeight / 2}px` : "50%"};
  left: ${(props) => (props.rvPage ? "" : "50%")};
  transform: ${(props) => (props.rvPage ? "" : "translate(-50%, -50%)")};
  /* background-color: ${(props) => (props.rvPage ? "white" : "#f2f3f1")}; */
  background-color: rgba(45, 52, 54, 1);
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
    color: white;
  }

  form {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    margin-top: 1rem;
    .rate {
      display: flex;
      align-items: center;
      .starNum {
        font-size: 1.3rem;
        color: white;
      }
    }
    .starBox {
      display: flex;
      margin-right: 1rem;
      margin-left: 1rem;
      margin-bottom: 1rem;
    }
  }
  textarea {
    flex: 1;
    height: 100%;
    resize: none;
    padding: 0;
    font-size: 1rem;
    /* background-color: #f2f3f1; */
    color: white;
    background-color: rgba(45, 52, 54, 0.9);
    padding: 0.2rem;
  }
  input[type="submit"] {
    all: unset;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${pallet.green[1]};
    border: 1px solid black;
  }
  span.close {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    color: white;
    font-size: 1.5rem;
    &:active {
      transform: scale(0.98);
    }
  }
`;

const StyledStar = styled.div`
  color: ${(props) => (props.color ? "#ffc048" : "")};
  font-size: 2rem;
`;

const ReviewWrite = ({
  scroll,
  hospital,
  setReview,
  rvPage = false,
  setReload,
  history,
}) => {
  const { id } = useSelector(({ auth }) => ({ id: auth.auth.id }));
  const [starNum, setStarNum] = useState(0);
  const [text, setText] = useState("");

  const onClick = (e) => {
    setStarNum(e.currentTarget.id);
  };

  const onChange = (e) => {
    const cText = e.currentTarget.value;
    setText(cText);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    if (!id) {
      history.push("/login");
      return;
    }
    try {
      await postReviews(hospital, text, id, starNum);
      alert("후기가 등록되었습니다.");
      await setRates();

      setText("");
      setStarNum(0);
      if (!rvPage) setReview(false);
      if (rvPage) setReload((item) => !item);
    } catch (e) {
      alert("에러");
    }
  };

  return (
    <ReviewWriteBlock rvPage={rvPage} scroll={scroll}>
      {!rvPage && <h1>{hospital}</h1>}
      <form onSubmit={onSubmit}>
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
          <span className="starNum">{starNum}/5</span>
        </div>
        <textarea onChange={onChange} value={text}></textarea>
        <input type="submit" value="등록"></input>
      </form>
      {!rvPage && (
        <span className="close" onClick={() => setReview(false)}>
          <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
        </span>
      )}
    </ReviewWriteBlock>
  );
};

export default withRouter(ReviewWrite);
