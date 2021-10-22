import React from "react";
import { useDispatch } from "react-redux";
import { clickHospital, initialHospital } from "../../modules/hospital";
import AskComponent from "../../components/asks/AskComponent";
import { withRouter } from "react-router-dom";
import { initialMapHospitals } from "../../modules/map";
import { useCallback } from "react";
import { Props } from "../../../types";

const AskContainer = ({ history }: Props) => {
  const dispatch = useDispatch();
  const itemClick = useCallback(
    (kind) => {
      localStorage.setItem("hospital_kind", kind);
      dispatch(initialHospital());
      dispatch(initialMapHospitals());
      dispatch(clickHospital({ kind: `${kind}` }));
    },
    [dispatch]
  );
  const onItemClick = useCallback(
    (e) => {
      const {
        target: { id: kind },
      } = e;
      itemClick(kind);
      history.push("/map");
    },
    [history, itemClick]
  );

  return <AskComponent onItemClick={onItemClick}></AskComponent>;
};

export default withRouter(AskContainer);
