import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const RoadviewComponentBlock = styled.div`
  width: 500px;
  height: 500px;
`;

const RoadviewComponent = () => {
  const { latitude, longitude } = useSelector(({ map }) => ({
    latitude: map.latitude,
    longitude: map.longitude,
  }));
  const roadViewBox = useRef();
  const [roadview, setRoadView] = useState();
  const roadviewClient = new window.kakao.maps.RoadviewClient();
  const [position, setPosition] = useState(
    new window.kakao.maps.LatLng(latitude, longitude)
  );

  function MapWalker(position) {
    //커스텀 오버레이에 사용할 map walker 엘리먼트
    var content = document.createElement("div");
    var figure = document.createElement("div");
    var angleBack = document.createElement("div");

    //map walker를 구성하는 각 노드들의 class명을 지정 - style셋팅을 위해 필요
    content.className = "MapWalker";
    figure.className = "figure";
    angleBack.className = "angleBack";

    content.appendChild(angleBack);
    content.appendChild(figure);

    //커스텀 오버레이 객체를 사용하여, map walker 아이콘을 생성
    var walker = new window.kakao.maps.CustomOverlay({
      position: position,
      content: content,
      yAnchor: 1,
    });

    this.walker = walker;
    this.content = content;
  }
  MapWalker.prototype.setAngle = function (angle) {
    var threshold = 22.5; //이미지가 변화되어야 되는(각도가 변해야되는) 임계 값
    for (var i = 0; i < 16; i++) {
      //각도에 따라 변화되는 앵글 이미지의 수가 16개
      if (angle > threshold * i && angle < threshold * (i + 1)) {
        //각도(pan)에 따라 아이콘의 class명을 변경
        var className = "m" + i;
        this.content.className = this.content.className.split(" ")[0];
        this.content.className += " " + className;
        break;
      }
    }
  };

  //map walker의 위치를 변경시키는 함수
  MapWalker.prototype.setPosition = function (position) {
    this.walker.setPosition(position);
  };

  //map walker를 지도위에 올리는 함수
  MapWalker.prototype.setMap = function (map) {
    this.walker.setMap(map);
  };

  useEffect(() => {
    setRoadView(new window.kakao.maps.Roadview(roadViewBox.current));
  }, []);

  useEffect(() => {
    if (roadview) {
      console.log(position);
      roadviewClient.getNearestPanoId(position, 300, function (panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      });
    }
  }, [roadview]);

  return <RoadviewComponentBlock ref={roadViewBox}></RoadviewComponentBlock>;
};

export default RoadviewComponent;
