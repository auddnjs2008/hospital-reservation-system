import React from "react";
import { useDispatch } from "react-redux";
import { clickHospital, initialHospital } from "../../modules/hospital";
import AskComponent from "../../components/asks/AskComponent";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { initialMapHospitals } from "../../modules/map";

const AskContainer = ({ history }) => {
  const dispatch = useDispatch();
  const itemClick = (kind) => {
    localStorage.setItem("hospital_kind", kind);
    dispatch(initialHospital());
    dispatch(initialMapHospitals());
    dispatch(clickHospital({ kind: `${kind}` }));
  };
  const onItemClick = (e) => {
    const {
      target: { id: kind },
    } = e;
    itemClick(kind);
    history.push("/map");
  };

  return <AskComponent onItemClick={onItemClick}></AskComponent>;
};

export default withRouter(AskContainer);
