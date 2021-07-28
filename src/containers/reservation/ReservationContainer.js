import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ReservationComponent from "../../components/reservation/ReservationComponent";

const ReservationContainer = () => {
  const [hospitalName, setHospitalName] = useState();
  const { lat, long } = useSelector(({ roadmap }) => ({
    lat: roadmap.latitude,
    long: roadmap.longitude,
  }));
  const findHospital = () => {
    const id = decodeURI(window.location.href).split("reservation/")[1];
    setHospitalName(id);
  };

  useEffect(() => {
    findHospital();
  }, [lat, long]);
  return <ReservationComponent hospitalName={hospitalName} />;
};

export default ReservationContainer;
