import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaceInfoComponent from "../components/common/PlaceInfoComponent";

const PlaceInfoContainer = () => {
  const { hospitals } = useSelector(({ map }) => ({
    hospitals: map.hospitals,
  }));

  return <PlaceInfoComponent hospitals={hospitals}></PlaceInfoComponent>;
};

export default PlaceInfoContainer;
