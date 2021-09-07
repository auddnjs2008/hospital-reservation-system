import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReviewComponent from "../../components/review/ReviewComponent";
import { getReviews } from "../../lib/api/review";

const ReviewContainer = () => {
  const [reviews, setReviews] = useState<
    { UserName: string; comment: string }[]
  >([]);
  const [hospital, setHospital] = useState("");
  const [rate, setRate] = useState(0);
  const [reload, setReload] = useState(false);

  const getRate = (data: any): number => {
    let sum = 0;
    data.forEach((item: any) => (sum += Number(item.rate)));
    return sum % data.length < 0.5
      ? Math.floor(sum / data.length)
      : Math.floor(sum / data.length) + 0.5;
  };

  useEffect(() => {
    const getApi = async () => {
      try {
        const result = await getReviews(hospital);
        const data = JSON.parse(result.data.body).Items;
        setReviews(data);
        if (data.length) {
          setRate(getRate(data));
        }
      } catch (e) {
        alert(`${e}`);
      }
    };
    if (hospital) getApi();
  }, [hospital, reload]);

  useEffect(() => {
    setHospital(decodeURI(window.location.href).split("review/")[1]);
  }, [window.location.href]);

  return (
    <ReviewComponent
      hospital={hospital}
      reviews={reviews}
      rate={rate}
      setReload={setReload}
    ></ReviewComponent>
  );
};

export default ReviewContainer;
