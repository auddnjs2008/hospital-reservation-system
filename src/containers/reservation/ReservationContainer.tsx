import Auth from "@aws-amplify/auth";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { IStore, Props } from "../../../types";
import ReservationComponent from "../../components/reservation/ReservationComponent";

const ReservationContainer = ({ history }: Props) => {
  const [hospitalName, setHospitalName] = useState("");
  const { lat, long, id, hospitals } = useSelector(
    ({ roadmap, auth, map }: IStore) => ({
      lat: roadmap.latitude,
      long: roadmap.longitude,
      id: auth.auth.id,
      hospitals: map.hospitals,
    })
  );
  const findHospital = () => {
    const id: string = decodeURI(window.location.href).split("reservation/")[1];
    setHospitalName(id);
  };

  const findId = useCallback(async () => {
    let result;
    await Auth.currentAuthenticatedUser().then((data) => {
      result = data;
    });
    if (!result) history.push("/login");
  }, [history]);
  useEffect(() => {
    findId();
    // if (!id) history.push("/login");
  }, [history, id, findId]);

  useEffect(() => {
    findHospital();
  }, [lat, long]);

  return (
    <ReservationComponent hospitalName={hospitalName} hospitals={hospitals} />
  );
};

export default withRouter(ReservationContainer);
