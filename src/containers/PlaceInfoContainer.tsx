import React from "react";

import { useSelector } from "react-redux";

import PlaceInfoComponent from "../components/common/PlaceInfoComponent";

const PlaceInfoContainer = () => {
  const { hospitals, id } = useSelector(({ map, auth }) => ({
    hospitals: map.hospitals,
    id: auth.auth.id,
  }));

  return (
    <PlaceInfoComponent
      hospitals={
        hospitals.length
          ? hospitals
          : JSON.parse(localStorage.getItem("hospitals"))
      }
      id={id}
    ></PlaceInfoComponent>
  );
};

export default PlaceInfoContainer;
