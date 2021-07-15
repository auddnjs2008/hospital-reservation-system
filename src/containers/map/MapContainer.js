import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialWhere } from "../../modules/map";
import MapComponent from "../../components/map/MapComponent";

const MapContainer = () => {
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

  const findCallBack = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      dispatch(initialWhere({ latitude, longitude, hospitals: result }));
    }
  };

  const findNearHospitals = () => {
    const Lat = new kakao.maps.LatLng(latitude, longitude);
    const places = new kakao.maps.services.Places();
    places.keywordSearch(
      kind || localStorage.getItem("hospital_kind"),
      findCallBack,
      {
        location: Lat,
        radius: 4000,
      }
    );
  };

  useEffect(() => {
    if (latitude && latitude) return;
    navigator.geolocation.getCurrentPosition((position) => {
      const result = window.confirm("위치정보를 공유해주세요");
      if (result) {
        dispatch(
          initialWhere({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            hospitals: [],
          })
        );
      } else {
        //에러처리;
        //to do  에러처리
        console.log("error");
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (latitude && longitude && hospitals.length === 0) {
      console.log("실행");
      findNearHospitals();
    }
  }, [latitude, longitude, hospitals]);

  return <MapComponent></MapComponent>;
};

export default MapContainer;
