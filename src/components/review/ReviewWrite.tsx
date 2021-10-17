import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IReviewWrite, IStore } from "../../../types";
import { postReviews, setRates } from "../../lib/api/review";
import pallet from "../../lib/styles/pallet";

const ReviewWriteBlock = styled.div<{ rvPage: boolean; scroll: number }>`
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
  border: 2px solid ${pallet.green[3]};
  background-color: white;
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
    color: black;
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
      border-bottom: 2px solid ${pallet.green[3]};
      .starNum {
        font-size: 1.3rem;
        color: black;
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
    color: black;
    border: none;
    outline: none;
    background-color: white;
    padding: 0.2rem;
  }
  input[type="submit"] {
    all: unset;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${pallet.green[1]};
  }
  span.close {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    color: black;
    font-size: 1.5rem;
    &:active {
      transform: scale(0.98);
    }
  }
`;

const StyledStar = styled.div<{ light: boolean }>`
  color: ${(props) => (props.light ? "#ffc048" : "")};
  font-size: 2rem;
`;

const ReviewWrite: React.FC<IReviewWrite> = ({
  scroll,
  hospital,
  setReview,
  rvPage = false,
  setReload,
}) => {
  const { id } = useSelector(({ auth }: IStore) => ({ id: auth.auth.id }));
  const [starNum, setStarNum] = useState(0);
  const [text, setText] = useState("");

  const onClick = (e: React.MouseEvent<SVGSVGElement | HTMLDivElement>) => {
    if (Number(e.currentTarget.id) <= starNum) {
      setStarNum(0);
      return;
    }
    setStarNum(Number(e.currentTarget.id));
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const cText = e.currentTarget.value;
    setText(cText);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;
    try {
      await postReviews(hospital, text, id, String(starNum));
      alert("후기가 등록되었습니다.");
      await setRates();

      setText("");
      setStarNum(0);
      if (!rvPage && setReview) setReview(false);
      if (rvPage) setReload!((item: boolean) => !item);
    } catch (e) {
      alert("에러");
    }
  };

  return (
    <ReviewWriteBlock rvPage={rvPage!} scroll={scroll}>
      {!rvPage && <h1>{hospital}</h1>}
      <form onSubmit={onSubmit}>
        <div className="rate">
          <div className="starBox">
            <StyledStar light={1 <= starNum} id={String(1)} onClick={onClick}>
              <FontAwesomeIcon
                icon={faStar}
                onClick={onClick}
              ></FontAwesomeIcon>
            </StyledStar>
            <StyledStar light={2 <= starNum} id={String(2)} onClick={onClick}>
              <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            </StyledStar>
            <StyledStar light={3 <= starNum} id={String(3)} onClick={onClick}>
              <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            </StyledStar>
            <StyledStar light={4 <= starNum} id={String(4)} onClick={onClick}>
              <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            </StyledStar>
            <StyledStar light={5 <= starNum} id={String(5)} onClick={onClick}>
              <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            </StyledStar>
          </div>
          <span className="starNum">{starNum}/5</span>
        </div>
        <textarea onChange={onChange} value={text}></textarea>
        <input type="submit" value="등록"></input>
      </form>
      {!rvPage && (
        <span
          className="close"
          onClick={() => {
            if (setReview) setReview(false);
          }}
        >
          <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
        </span>
      )}
    </ReviewWriteBlock>
  );
};

export default ReviewWrite;
