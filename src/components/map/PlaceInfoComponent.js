import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import pallet from "../../lib/styles/pallet";
import Menu from "../common/Menu";

const PlaceInfoComponentBlock = styled.div`
  min-width: 24rem;
  height: 100vh;
  header {
    height: 36%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: ${pallet.green[0]};
  }
`;

const BestRecommend = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 10rem;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const InputBox = styled.div`
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  width: 90%;
  input {
    outline: none;
    width: 100%;
    height: 3rem;
    font-size: 20px;
    &::placeholder {
      font-size: 20px;
    }
  }
  button {
    position: absolute;
    right: 0;
    width: 3rem;
    height: 3rem;
    font-size: 30px;
  }
`;

const PlaceInfoComponent = ({ hospitals }) => {
  return (
    <PlaceInfoComponentBlock>
      <header>
        <InputBox>
          <input type="text" placeholder="장소검색" name="search" />
          <button> 🔍</button>
        </InputBox>
        <Menu></Menu>
      </header>
      <main>
        <h1>Best Place</h1>
        {hospitals && (
          <BestRecommend>
            <h2>{hospitals[0].place_name}</h2>
            <div>{hospitals[0].address_name}</div>
            <div>
              <span>{hospitals[0].phone}</span>
              <a href={hospitals[0].place_url}>상세보기</a>
            </div>
          </BestRecommend>
        )}
      </main>
    </PlaceInfoComponentBlock>
  );
};

export default PlaceInfoComponent;
