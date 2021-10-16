import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eraseMarker, searchMap } from "../../modules/map";
import styled from "styled-components";
import { useRef } from "react";
import { changeCoordinate } from "../../modules/roadmap";
import { withRouter } from "react-router-dom";
import { useCallback } from "react";
import { IHospitalItem, IStore, Props } from "../../../types";

const SearchComponentBlock = styled.form`
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  width: 90%;
  input {
    outline: none;
    width: 100%;
    height: 3rem;
    font-size: 20px;
    &::placeholder {
      font-size: 20px;
    }
  }
  button {
    position: absolute;
    right: 0;
    width: 3rem;
    height: 3rem;
    font-size: 30px;
  }
  .nearSearch {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
    input {
      width: 1rem;
      height: 1rem;
    }
    span {
      margin-left: 5px;
      color: white;
    }
  }
`;

const SearchComponent = ({ history }: Props) => {
  const [text, SetText] = useState("");
  const dispatch = useDispatch();
  const { latitude, longitude, markers } = useSelector(({ map }: IStore) => ({
    latitude: map.latitude,
    longitude: map.longitude,
    markers: map.markers,
  }));
  const checkBox = useRef<HTMLInputElement>(null);
  const onChange = useCallback((e) => {
    const text = e.target.value;
    SetText(text);
  }, []);

  const eraseMarkers = useCallback(() => {
    if (markers) {
      for (let i = 0; i < markers.length; i++) {
        (markers[i] as any).setMap(null);
      }
    }
  }, [markers]);

  const findCallBack = useCallback(
    (result, status) => {
      if (status === (window as any).kakao.maps.services.Status.OK) {
        const filterResult = result.filter(
          (item: IHospitalItem) => item.category_group_code === "HP8"
        );

        if (filterResult.length !== 0) {
          eraseMarkers();
          dispatch(eraseMarker());
          dispatch(searchMap({ hospitals: filterResult }));
          history.push("/map");
          dispatch(
            changeCoordinate({
              latitude: filterResult[0].y,
              longitude: filterResult[0].x,
              name: filterResult[0].place_name,
            })
          );
        } else {
          window.alert("검색어에 일치하는 병원이 없습니다");
        }
      }
    },
    [dispatch, eraseMarkers, history]
  );

  const findNearHospitals = useCallback(() => {
    const places = new (window as any).kakao.maps.services.Places();
    if (checkBox.current?.checked) {
      const Lat = new (window as any).kakao.maps.LatLng(latitude, longitude);
      places.keywordSearch(
        `${text.includes("병원") ? text : text + "병원"}`,
        findCallBack,
        {
          location: Lat,
          radius: 4000,
        }
      );
    } else {
      places.keywordSearch(
        `${text.includes("병원") ? text : text + "병원"}`,
        findCallBack
      );
    }
  }, [latitude, longitude, text, findCallBack]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (text) {
        findNearHospitals();
        SetText("");
      } else {
        window.alert("검색어를 입력해주세요");
      }
    },
    [text, findNearHospitals]
  );

  return (
    <SearchComponentBlock onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="장소검색"
        name="search"
        value={text}
        onChange={onChange}
      />
      <button> 🔍</button>
      <label className="nearSearch">
        <input type="checkbox" name="near" value="true" ref={checkBox} />
        <span>내 위치 기준 검색</span>
      </label>
    </SearchComponentBlock>
  );
};

export default withRouter(SearchComponent);
