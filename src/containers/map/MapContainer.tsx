import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawMarker, initialWhere } from "../../modules/map";
import MapComponent from "../../components/map/MapComponent";
import { withRouter } from "react-router-dom";
import { IHospital, IMap, Props } from "../../../types";

interface IWrapper {
  map: IMap;
  hospital: IHospital;
}

const MapContainer = ({ history }: Props) => {
  const dispatch = useDispatch();
  const { latitude, longitude, kind, hospitals } = useSelector(
    ({ map, hospital }: IWrapper) => ({
      latitude: map.latitude,
      longitude: map.longitude,
      kind: hospital.hospital.kind,
      hospitals: map.hospitals,
    })
  );
  const [map, setMap] = useState();

  const kakao = (window as any).kakao;

  // const findCallBack = useCallback(
  //   (result, status) => {
  //     if (status === kakao.maps.services.Status.OK) {
  //       dispatch(initialWhere({ latitude, longitude, hospitals: result }));
  //     }
  //   },
  //   [dispatch, kakao.maps, latitude, longitude]
  // );

  const markerDraw = useCallback(() => {
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
    const imageSize = new kakao.maps.Size(24, 35);
    const bounds = new kakao.maps.LatLngBounds();
    const markers = [];
    if (hospitals) {
      hospitals.forEach((item, index) => {
        const imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(2, index * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        };
        const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        );
        const eachLang = new kakao.maps.LatLng(item.y, item.x);
        bounds.extend(eachLang);
        const marker = new kakao.maps.Marker({
          map,
          position: eachLang,
          title: item.place_name,
          image: markerImage,
        });
        markers.push(marker);
      });
      if (markers.length) dispatch(drawMarker({ markers }));
    }
    if (map) map.setBounds(bounds);
  }, [dispatch, hospitals, kakao.maps, map]);

  const findNearHospitals = useCallback(
    (latitude, longitude) => {
      const Lat = new kakao.maps.LatLng(latitude, longitude); // latitude,longitude
      const places = new kakao.maps.services.Places();
      places.keywordSearch(
        kind || localStorage.getItem("hospital_kind"),
        (result: any, status: any) => {
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
    [dispatch, kakao.maps, kind, history]
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

  return (
    <MapComponent mapInfo={{ latitude, longitude, hospitals }}></MapComponent>
  );
};

export default withRouter(MapContainer);
