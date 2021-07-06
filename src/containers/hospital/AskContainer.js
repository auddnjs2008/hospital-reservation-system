import React from "react";
import { useDispatch } from "react-redux";
import { clickHospital } from "../../modules/hospital";
import AskComponent from "../../components/asks/AskComponent";
import { useEffect } from "react";
const AskContainer = () => {
  const dispatch = useDispatch();
  const itemClick = (kind) => {
    dispatch(clickHospital({ kind: `${kind}` }));
  };
  const onItemClick = (e) => {
    const {
      target: { id: kind },
    } = e;
    itemClick(kind);
  };

  return <AskComponent onItemClick={onItemClick}></AskComponent>;
};

export default AskContainer;
