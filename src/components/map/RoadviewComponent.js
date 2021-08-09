import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import pallet from "../../lib/styles/pallet";
import MapWalker from "../../lib/createmapwalker";
import roadmap, {
  changeCoordinate,
  initialzeRoadmap,
} from "../../modules/roadmap";

const RoadviewComponentBlock = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;
  z-index: 15;
  width: 70vw;
  height: 100vh;
  .overlay_info {
    width: 200px;
    height: 50px;
    background-color: ${pallet.green[3]};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    font-size: 20px;
    font-weight: 600;
    border: 2px solid white;
  }
`;

const RoadviewComponent = () => {
  const dispatch = useDispatch();
  const { map, hospitals, roadLat, roadLong, name, storeRoadmap } = useSelector(
    ({ map, roadmap, menupage }) => ({
      map: map.map,
      hospitals: map.hospitals,
      roadLat: roadmap.latitude,
      roadLong: roadmap.longitude,
      name: roadmap.name,
      storeRoadmap: roadmap.roadmap,
    })
  );
  const roadViewBox = useRef();
  const [roadview, setRoadView] = useState();
  const [mapPrevWalker, setPrevMapWalker] = useState(null);
  const [walkerSetting, setWalkerSetting] = useState(false);

  const roadviewClient = new window.kakao.maps.RoadviewClient();

  let startOverlayPoint = null;
  let start = [];

  const rvCustomOverlay = (position, content) => {
    if (mapPrevWalker) mapPrevWalker.setMap(null);
    const result = new window.kakao.maps.CustomOverlay({
      position: position,
      content,
      xAnchor: 0.5,
      yAnchor: 1.1,
    });

    result.setMap(roadview);

    setTimeout(() => {
      const projection = roadview.getProjection();
      const viewPoint = projection.viewpointFromCoords(
        result.getPosition(),
        result.getAltitude()
      );
      roadview.setViewpoint(viewPoint);
    }, 850);
    const newWalker = new MapWalker(position);
    setPrevMapWalker(newWalker);
    newWalker.setMap(map);
    walkerViewChange(newWalker);
  };

  const walkerViewChange = (mapWalker) => {
    window.kakao.maps.event.addListener(
      roadview,
      "viewpoint_changed",
      function () {
        // 이벤트가 발생할 때마다 로드뷰의 viewpoint값을 읽어, map walker에 반영
        const viewpoint = roadview.getViewpoint();
        mapWalker.setAngle(viewpoint.pan);
      }
    );

    window.kakao.maps.event.addListener(
      roadview,
      "position_changed",
      function () {
        // 이벤트가 발생할 때마다 로드뷰의 position값을 읽어, map walker에 반영
        const position = roadview.getPosition();
        mapWalker.setPosition(position);
        map.setCenter(position);
      }
    );
  };

  const onMouseDown = (e) => {
    const proj = map.getProjection();
    const overlayPos = mapPrevWalker.walker.getPosition();

    window.kakao.maps.event.preventMap();
    start = [e.clientY, e.clientX];

    startOverlayPoint = proj.containerPointFromCoords(overlayPos);
    map.a.addEventListener("mousemove", onMouseMove);
  };

  const onMouseMove = (e) => {
    const proj = map.getProjection();
    const deltaX = start[1] - e.clientX;
    const deltaY = start[0] - e.clientY;
    const newPoint = new window.kakao.maps.Point(
      startOverlayPoint.x - deltaX,
      startOverlayPoint.y - deltaY
    );
    const newPos = proj.coordsFromContainerPoint(newPoint);

    mapPrevWalker.walker.setPosition(newPos);
  };

  const onMouseUp = (e) => {
    const position = mapPrevWalker.walker.getPosition();
    map.setCenter(position);

    dispatch(
      changeCoordinate({
        latitude: position.Ma,
        longitude: position.La,
        name: "여행중",
      })
    );
    map.a.removeEventListener("mousemove", onMouseMove);
  };

  useEffect(() => {
    setWalkerSetting(true);
  }, [roadview]);

  useEffect(() => {
    setRoadView(new window.kakao.maps.Roadview(roadViewBox.current));
    if (roadview) {
      dispatch(initialzeRoadmap(roadview));
      try {
        const position = new window.kakao.maps.LatLng(roadLat, roadLong);
        // : new window.kakao.maps.LatLng(hospitals[0].y, hospitals[0].x);
        roadviewClient.getNearestPanoId(position, 300, function (panoId) {
          roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
        });

        window.kakao.maps.event.addListener(roadview, "init", () =>
          rvCustomOverlay(
            position,
            `<div class="overlay_info"><span>${
              name ? name : "나의 위치"
            }</span></div>`
          )
        );
        return () =>
          window.kakao.maps.event.addListener(roadview, "init", () =>
            rvCustomOverlay(
              position,
              `<div class="overlay_info"><span>${
                name ? name : "나의 위치"
              }</span></div>`
            )
          );
      } catch (e) {
        alert(`${e}`);
      }
    }
  }, [roadLat, roadLong, walkerSetting]);

  useEffect(() => {
    if (mapPrevWalker) {
      mapPrevWalker.content.addEventListener("mousedown", onMouseDown);
      mapPrevWalker.content.addEventListener("mouseup", onMouseUp);

      return () => {
        mapPrevWalker.content.removeEventListener("mousedown", onMouseDown);
        mapPrevWalker.content.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [mapPrevWalker]);

  return <RoadviewComponentBlock ref={roadViewBox}></RoadviewComponentBlock>;
};

export default RoadviewComponent;
