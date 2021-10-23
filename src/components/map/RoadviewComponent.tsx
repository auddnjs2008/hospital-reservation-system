import React, { useCallback } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import pallet from "../../lib/styles/pallet";
import { changeCoordinate, initialzeRoadmap } from "../../modules/roadmap";
import { IStore } from "../../../types";
import CMapWalker from "../../lib/createmapwalker";

const RoadviewComponentBlock = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  z-index: 15;
  width: 70%;
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
  const { map, roadLat, roadLong, name } = useSelector(
    ({ map, roadmap, menupage }: IStore) => ({
      map: map.map,
      hospitals: map.hospitals,
      roadLat: roadmap.latitude,
      roadLong: roadmap.longitude,
      name: roadmap.name,
    })
  );
  const roadViewBox = useRef(null);
  const [roadview, setRoadView] = useState<any>();
  const [mapPrevWalker, setPrevMapWalker] = useState<any>(null);
  // const [walkerSetting, setWalkerSetting] = useState(false);

  const roadviewClient = new (window as any).kakao.maps.RoadviewClient();

  let startOverlayPoint: any = null;
  let start: number[] = [];

  const walkerViewChange = useCallback(
    (mapWalker) => {
      (window as any).kakao.maps.event.addListener(
        roadview,
        "viewpoint_changed",
        function () {
          // 이벤트가 발생할 때마다 로드뷰의 viewpoint값을 읽어, map walker에 반영
          const viewpoint = roadview.getViewpoint();
          mapWalker.setAngle(viewpoint.pan);
        }
      );

      (window as any).kakao.maps.event.addListener(
        roadview,
        "position_changed",
        function () {
          // 이벤트가 발생할 때마다 로드뷰의 position값을 읽어, map walker에 반영
          const position = roadview.getPosition();
          mapWalker.setPosition(position);
          map.setCenter(position);
        }
      );
    },
    [map, roadview]
  );

  const rvCustomOverlay = useCallback(
    (position: any, content: string) => {
      if (mapPrevWalker) mapPrevWalker.setMap(null);
      const result = new (window as any).kakao.maps.CustomOverlay({
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
      const newWalker = new CMapWalker(position);
      setPrevMapWalker(newWalker);
      newWalker.setMap(map);
      walkerViewChange(newWalker);
    },
    [map, mapPrevWalker, roadview, walkerViewChange]
  );

  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    const proj = map.getProjection();
    const overlayPos = mapPrevWalker.walker.getPosition();

    (window as any).kakao.maps.event.preventMap();
    start = [e.clientY, e.clientX];

    startOverlayPoint = proj.containerPointFromCoords(overlayPos);
    map.a.addEventListener("mousemove", onMouseMove);
  };

  const onMouseMove = useCallback(
    (e) => {
      const proj = map.getProjection();
      const deltaX = start[1] - e.clientX;
      const deltaY = start[0] - e.clientY;
      const newPoint = new (window as any).kakao.maps.Point(
        startOverlayPoint.x - deltaX,
        startOverlayPoint.y - deltaY
      );
      const newPos = proj.coordsFromContainerPoint(newPoint);

      mapPrevWalker.walker.setPosition(newPos);
    },
    [startOverlayPoint, map, mapPrevWalker, start]
  );

  const onMouseUp = useCallback(
    (e) => {
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
    },
    [dispatch, map, mapPrevWalker, onMouseMove]
  );

  useEffect(() => {
    setRoadView(new (window as any).kakao.maps.Roadview(roadViewBox.current));
  }, [roadLat, roadLong]);

  useEffect(() => {
    if (roadview) {
      dispatch(initialzeRoadmap(roadview));
      try {
        const position = new (window as any).kakao.maps.LatLng(
          roadLat,
          roadLong
        );
        roadviewClient.getNearestPanoId(
          position,
          300,
          function (panoId: string) {
            roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
          }
        );

        (window as any).kakao.maps.event.addListener(roadview, "init", () =>
          rvCustomOverlay(
            position,
            `<div class="overlay_info"><span>${
              name ? name : "나의 위치"
            }</span></div>`
          )
        );
        return () =>
          (window as any).kakao.maps.event.addListener(roadview, "init", () =>
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
  }, [roadview, rvCustomOverlay]);

  useEffect(() => {
    if (mapPrevWalker) {
      mapPrevWalker.content.addEventListener("mousedown", onMouseDown);
      mapPrevWalker.content.addEventListener("mouseup", onMouseUp);

      return () => {
        mapPrevWalker.content.removeEventListener("mousedown", onMouseDown);
        mapPrevWalker.content.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [mapPrevWalker, onMouseUp]);

  return <RoadviewComponentBlock ref={roadViewBox}></RoadviewComponentBlock>;
};

export default RoadviewComponent;
