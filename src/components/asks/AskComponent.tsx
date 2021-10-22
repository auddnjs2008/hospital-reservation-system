import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";

import styled from "styled-components";
import { IAskComponent } from "../../../types";
import pallet from "../../lib/styles/pallet";

const AskComponentBlock = styled.div`
  width: 100vw;
  height: 100vh;
  /* background-color: ${pallet.green[2]}; */
  background-image: url("https://usecloud.s3.ap-northeast-1.amazonaws.com/cool-background+(2).png");
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-family: "Nano";
  h1 {
    font-weight: 700;
    font-size: 3rem;
    @media (max-width: 480px) {
      font-size: 2.5rem;
    }
  }
`;

const PngBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  height: 100%;
  z-index: 5;
  img {
    width: 100%;
    height: 100%;
  }
  div {
    position: absolute;
    bottom: 0;

    width: 70%;
    background-color: #97acff;
    height: 50px;
  }
`;

const QuestionBox = styled.div`
  /* background-color: ${pallet.black[1]}; */

  background-color: white;
  border-radius: 10px;
  width: 30rem;
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(2, 30rem);
  overflow: hidden;
  scroll-behavior: smooth;
  box-shadow: 0px 3px 7px ${pallet.black[6]};
  @media (max-width: 480px) {
    width: 20rem;

    grid-template-columns: repeat(2, 20rem);
  }
  height: 50%;
`;
const QuestionWrapper = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  li {
    padding: 5px;
    /* border: 1px solid black; */
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: ${pallet.green[3]};
      color: white;
    }
  }
`;

const BtnWrapper = styled.div`
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
  font-size: 1.5rem;
  .page:nth-child(2) {
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
  }
  .page:nth-child(3) {
    width: 10px;
    height: 10px;
    background-color: black;
    border-radius: 50%;
  }
`;

const AskComponent: React.FC<IAskComponent> = ({ onItemClick }) => {
  const sliderBox = useRef<HTMLDivElement>(null);
  const leftDot = useRef<HTMLDivElement>(null);
  const rightDot = useRef<HTMLDivElement>(null);
  const onLeftClick = () => {
    if (sliderBox.current && leftDot.current && rightDot.current) {
      sliderBox.current.scrollLeft = 0;
      leftDot.current.style.backgroundColor = "white";
      rightDot.current.style.backgroundColor = "black";
    }
  };

  const onRightClick = () => {
    if (sliderBox.current && leftDot.current && rightDot.current) {
      sliderBox.current.scrollLeft = sliderBox.current.scrollWidth;
      rightDot.current.style.backgroundColor = "white";
      leftDot.current.style.backgroundColor = "black";
    }
  };

  return (
    <AskComponentBlock>
      <h1>어디가 불편하세요?</h1>
      <QuestionBox ref={sliderBox}>
        <QuestionWrapper onClick={onItemClick}>
          <li id="피부과">피부과</li>
          <li id="치과">치과</li>
          <li id="안과">안과</li>
          <li id="성형외과">성형외과</li>
          <li id="내과">내과</li>
          <li id="한의원">한의원</li>
          <li id="소아청소년과">소아청소년과</li>
          <li id="산부인과">산부인과</li>
          <li id="이비인후과">이비인후과</li>
          <li id="종합병원">종합병원</li>
          <li id="신경외과">신경외과</li>
          <li id="비뇨기과">비뇨기과</li>
        </QuestionWrapper>
        <QuestionWrapper onClick={onItemClick}>
          <li id="정형외과">정형외과</li>
          <li id="외과">외과</li>
          <li id="신경과">신경과</li>
          <li id="재활의확과">재활의학과</li>
          <li id="가정의학과">가정의학과</li>
          <li id="마취통증의학과">마취통증의학과</li>
          <li id="영상.검진의학과">영상.검진의학과</li>
          <li id="정신건강의학과">정신건강의학과</li>
        </QuestionWrapper>
      </QuestionBox>
      <BtnWrapper>
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={onLeftClick}
        ></FontAwesomeIcon>
        <div className="page" ref={leftDot} onClick={onLeftClick}></div>
        <div className="page" ref={rightDot} onClick={onRightClick}></div>
        <FontAwesomeIcon
          icon={faChevronRight}
          onClick={onRightClick}
        ></FontAwesomeIcon>
      </BtnWrapper>
      <PngBlock>
        <img
          alt="hospital"
          src="https://usecloud.s3.ap-northeast-1.amazonaws.com/hospitalHome2.png"
        ></img>
        <div></div>
      </PngBlock>
    </AskComponentBlock>
  );
};

export default React.memo(AskComponent);
