import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialWhere } from "../../modules/map";
import MapComponent from "../../components/map/MapComponent";
import { withRouter } from "react-router-dom";

const MapContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { latitude, longitude, kind, hospitals } = useSelector(
    ({ map, hospital }) => ({
      latitude: map.latitude,
      longitude: map.longitude,
      kind: hospital.hospital.kind,
      hospitals: map.hospitals,
    })
  );

  const kakao = window.kakao;

  // const findCallBack = useCallback(
  //   (result, status) => {
  //     if (status === kakao.maps.services.Status.OK) {
  //       dispatch(initialWhere({ latitude, longitude, hospitals: result }));
  //     }
  //   },
  //   [dispatch, kakao.maps, latitude, longitude]
  // );

  const findNearHospitals = useCallback(
    (latitude, longitude) => {
      const Lat = new kakao.maps.LatLng(latitude, longitude); // latitude,longitude
      const places = new kakao.maps.services.Places();
      places.keywordSearch(
        kind || localStorage.getItem("hospital_kind"),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            dispatch(
              initialWhere({
                latitude,
                longitude,
                hospitals: result,
              })
            ); // latitude,longitude
          } else {
            alert("일치하는 정보가 없습니다.");
            history.push("/");
          }
        },
        {
          location: Lat,
          radius: 4000,
        }
      );
    },
    [dispatch, kakao.maps, kind]
  );

  useEffect(() => {
    if (latitude && longitude) return;
    navigator.geolocation.getCurrentPosition((position) => {
      const result = window.confirm("위치정보를 공유해주세요");
      if (result) {
        findNearHospitals(position.coords.latitude, position.coords.longitude);
      } else {
        //에러처리;
        //to do  에러처리
        alert("error");
      }
    });
  }, [dispatch, findNearHospitals, latitude, longitude]);

  useEffect(() => {
    if (latitude && longitude && hospitals.length === 0) {
      findNearHospitals(latitude, longitude);
    }
  }, [latitude, longitude, hospitals, findNearHospitals]);

  return <MapComponent></MapComponent>;
};

export default withRouter(MapContainer);
