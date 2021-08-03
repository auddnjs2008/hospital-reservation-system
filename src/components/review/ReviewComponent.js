import { faStarHalf, faUser } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { reviewPage } from "../../modules/menupage";

const ReviewComponentBlock = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1rem;
  }
  p.noReview {
    font-size: 2rem;
    margin-top: 5rem;
  }
`;
const RateStar = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;
const ReviewList = styled.ul`
  width: 90%;
  li {
    padding: 10px;
    margin-bottom: 1rem;
    .profile {
      span {
        margin-left: 0.5rem;
        color: black;
      }
      font-size: 1.5rem;
      margin-bottom: 1rem;
      padding: 0.3rem;
      color: white;
      font-weight: 600;
      background: linear-gradient(to left, white, #07b495);
    }
    p {
      line-height: 1.5;
    }
  }
`;

const ReviewComponent = ({ hospital, reviews, rate }) => {
  const [star, setStar] = useState([]);
  const reviewpage = useRef();
  const dispatch = useDispatch();

  const setArrStar = () => {
    const arr = [];
    for (let i = 0; i < rate; i++) {
      arr.push(1);
    }
    if (Math.floor(rate) !== rate) arr.push(0.5);
    for (let i = 5 - rate + 1; i < 5; i++) {
      arr.push(0);
    }
    setStar(arr);
  };
  useEffect(() => {
    if (rate) {
      setArrStar();
      console.log(reviews);
    }
  }, [reviews, rate]);

  useEffect(() => {
    dispatch(reviewPage(reviewpage));
  }, []);

  return (
    <ReviewComponentBlock ref={reviewpage}>
      <h1>{hospital}</h1>
      {star && (
        <RateStar>
          {star.map((item) =>
            item === 1 ? (
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: "#ffc048" }}
              ></FontAwesomeIcon>
            ) : item === 0.5 ? (
              <FontAwesomeIcon
                icon={faStarHalf}
                style={{ color: "#ffc048" }}
              ></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon icon={faEmptyStar}></FontAwesomeIcon>
            )
          )}
        </RateStar>
      )}
      {reviews.length ? (
        <ReviewList>
          {reviews.map((item) => (
            <li>
              <div className="profile">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                <span>{item.UserName}</span>
              </div>
              <p>{item.comment}</p>
            </li>
          ))}
        </ReviewList>
      ) : (
        <p className="noReview">등록된 후기가 없습니다</p>
      )}
    </ReviewComponentBlock>
  );
};

export default ReviewComponent;
