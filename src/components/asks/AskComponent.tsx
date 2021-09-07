import React, { useRef } from "react";

import styled from "styled-components";
import { IAskComponent } from "../../../types";
import pallet from "../../lib/styles/pallet";
const AskComponentBlock = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${pallet.green[2]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  h1 {
    font-size: 3rem;
    @media (max-width: 480px) {
      font-size: 2.5rem;
    }
  }
`;

const QuestionBox = styled.div`
  background-color: ${pallet.black[0]};
  border-radius: 10px;
  width: 30rem;
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
    border: 1px solid black;
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

const ToggleSliderBtn = styled.button`
  all: unset;
  border: 1px solid black;
  width: 3rem;
  height: 1.5rem;
  border-radius: 17px;
  position: absolute;
  bottom: 50px;
  background-color: white;
`;

const BtnInCircle = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  border: 1px solid black;
  background-color: white;

  transform: translateX(0%);
  transition: transform 0.4s ease-in-out;
`;

const AskComponent: React.FC<IAskComponent> = ({ onItemClick }) => {
  const sliderBox = useRef<HTMLDivElement>(null);
  const sliderCircle = useRef<HTMLDivElement>(null);
  const onClick = () => {
    if (sliderBox.current && sliderCircle.current) {
      const scrollWidth = sliderBox.current.scrollWidth;
      const scrollLeft = sliderBox.current.scrollLeft;
      if (scrollLeft === 0) {
        sliderBox.current.scrollLeft = scrollWidth / 2;
        sliderCircle.current.style.transform = "translateX(100%)";
      } else {
        sliderBox.current.scrollLeft = 0;
        sliderCircle.current.style.transform = "translateX(0%)";
      }
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
      <ToggleSliderBtn onClick={onClick}>
        <BtnInCircle ref={sliderCircle} />
      </ToggleSliderBtn>
    </AskComponentBlock>
  );
};

export default React.memo(AskComponent);
