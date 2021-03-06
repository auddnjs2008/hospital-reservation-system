import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { reviewPage } from "../../modules/menupage";
import ReviewWrite from "./ReviewWrite";
import Loading from "../common/Loading";
import { IReviewComponent } from "../../../types";

const ReviewComponentBlock = styled.div`
  padding: 1rem;
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f6fa;
  width: 70%;

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1rem;
    color: black;
  }
  p.noReview {
    font-size: 2rem;
    margin-top: 5rem;
    margin-bottom: 3rem;
    color: black;
    font-weight: 600;
  }
`;
const RateStar = styled.div`
  span {
    margin-right: 10px;
    color: #ff5d5d;
  }
  font-size: 2rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;
const ReviewList = styled.ul`
  background-color: white;

  border-bottom: none;
  width: 90%;
  li {
    display: grid;
    grid-template-columns: minmax(100px, auto) 8fr;
    padding: 12px;
    margin-bottom: 0.8rem;
    border: 1px solid black;
    .profile {
      span {
        margin-left: 0.5rem;
        color: black;
      }
      font-size: 1.2rem;
      margin-bottom: 1rem;
      padding: 0.3rem;
      color: black;
      font-weight: 600;
    }
    p {
      line-height: 1.5;
      color: black;
    }
    .userStar {
      display: flex;
      li {
        all: unset;
        margin-bottom: 10px;
      }
    }
  }
`;

const ReviewComponent: React.FC<IReviewComponent> = ({
  hospital,
  reviews,
  rate,
  setReload,
}) => {
  const [star, setStar] = useState<number[]>([]);
  const reviewpage = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const setArrStar = useCallback(() => {
    const arr = [];
    for (let i = 0; i < Math.floor(rate); i++) {
      arr.push(1);
    }
    if (Math.floor(rate) !== rate) arr.push(0.5);
    for (let i = Math.ceil(rate); i < 5; i++) {
      arr.push(0);
    }
    setStar(arr);
  }, [rate]);

  const userStars = (number: number) => {
    const starArr = [];
    for (let i = 0; i < number; i++) {
      starArr.push(1);
    }
    return starArr;
  };

  useEffect(() => {
    if (rate) {
      setArrStar();
    }
  }, [reviews, rate, setArrStar]);

  useEffect(() => {
    dispatch(reviewPage(reviewpage));
  }, [dispatch]);

  return (
    <ReviewComponentBlock ref={reviewpage}>
      <h1>{hospital}</h1>
      {star && (
        <RateStar>
          <span>{rate}</span>
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
      {reviews === null ? (
        <Loading></Loading>
      ) : reviews.length ? (
        <ReviewList>
          {reviews.map((item) => (
            <li>
              <div className="profile">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                <span>{item.UserName}</span>
              </div>
              <div>
                <ul className="userStar">
                  {userStars(Number(item.rate)).map((item) => (
                    <li>
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ color: "#ffc048" }}
                      ></FontAwesomeIcon>
                    </li>
                  ))}
                  {item.rate}
                </ul>
                <p>{item.comment}</p>
              </div>
            </li>
          ))}
        </ReviewList>
      ) : (
        <p className="noReview">????????? ????????? ????????????</p>
      )}
      <ReviewWrite
        scroll={0}
        hospital={hospital}
        rvPage={true}
        setReload={setReload}
        setReview={null}
      ></ReviewWrite>
    </ReviewComponentBlock>
  );
};

export default ReviewComponent;
