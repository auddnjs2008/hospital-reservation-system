import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialWhere } from "../../modules/map";
import MapComponent from "../../components/map/MapComponent";
import recommendAxios from "../../lib/axiosTest";
import { changeCoordinate } from "../../modules/roadmap";

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
      dispatch(
        changeCoordinate({
          latitude: result[0].y,
          longitude: result[0].x,
          name: result[0].place_name,
        })
      );
      // const fixedResult = result.map((item) => ({
      //   name: item.place_name,
      //   distance: item.distance,
      // }));
      // console.log(JSON.stringify(result));
      // console.log(JSON.stringify({ info: fixedResult }));
      // recommendAxios({ info: result });
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
      findNearHospitals();
    }
  }, [latitude, longitude, hospitals]);

  return <MapComponent></MapComponent>;
};

export default MapContainer;
