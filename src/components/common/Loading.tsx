import React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import pallet from "../../lib/styles/pallet";

const LoadingBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  width: 100%;
  height: 100%;
`;

const Loading = () => {
  return (
    <LoadingBlock>
      <Loader
        type="Puff"
        color={`${pallet.green[3]}`}
        height={300}
        width={300}
        timeout={100000}
      ></Loader>
    </LoadingBlock>
  );
};

export default Loading;
