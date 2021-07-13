import React from "react";
import { useDispatch } from "react-redux";
import { clickHospital } from "../../modules/hospital";
import AskComponent from "../../components/asks/AskComponent";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
const AskContainer = ({ history }) => {
  const dispatch = useDispatch();
  const itemClick = (kind) => {
    localStorage.setItem("hospital_kind", kind);
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
