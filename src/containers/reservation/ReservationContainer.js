import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import ReservationComponent from "../../components/reservation/ReservationComponent";

const ReservationContainer = ({ history }) => {
  const [hospitalName, setHospitalName] = useState();
  const { lat, long, id } = useSelector(({ roadmap, auth }) => ({
    lat: roadmap.latitude,
    long: roadmap.longitude,
    id: auth.auth.id,
  }));
  const findHospital = () => {
    const id = decodeURI(window.location.href).split("reservation/")[1];
    setHospitalName(id);
  };
  useEffect(() => {
    if (!id) history.push("/login");
  }, [history, id]);

  useEffect(() => {
    findHospital();
  }, [lat, long]);
  return <ReservationComponent hospitalName={hospitalName} />;
};

export default withRouter(ReservationContainer);
