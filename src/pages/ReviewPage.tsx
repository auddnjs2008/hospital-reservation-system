import * as React from "react";
import styled from "styled-components";
import PlaceInfoContainer from "../containers/PlaceInfoContainer";
import ReviewContainer from "../containers/review/ReviewContainer";

const ReviewWrapper = styled.div`
  display: flex;
`;

const ReviewPage = () => {
  return (
    <ReviewWrapper>
      <PlaceInfoContainer />
      <ReviewContainer></ReviewContainer>
    </ReviewWrapper>
  );
};

export default ReviewPage;
