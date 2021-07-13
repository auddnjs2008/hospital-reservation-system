import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eraseMarker, searchMap } from "../../modules/map";
import styled from "styled-components";
import { useEffect } from "react";
import { useRef } from "react";

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
    }
  }
`;

const SearchComponent = () => {
  const [text, SetText] = useState("");
  const dispatch = useDispatch();
  const { latitude, longitude, markers } = useSelector(({ map }) => ({
    latitude: map.latitude,
    longitude: map.longitude,
    markers: map.markers,
  }));
  const checkBox = useRef();
  const onChange = (e) => {
    const text = e.target.value;
    SetText(text);
  };

  const findCallBack = (result, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const filterResult = result.filter(
        (item) => item.category_group_code === "HP8"
      );
      if (filterResult.length !== 0) {
        eraseMarkers();
        dispatch(eraseMarker());
        dispatch(searchMap({ hospitals: filterResult }));
      } else {
        window.alert("검색어에 일치하는 병원이 없습니다");
      }
    }
  };

  const findNearHospitals = () => {
    const places = new window.kakao.maps.services.Places();
    if (checkBox.current.checked) {
      const Lat = new window.kakao.maps.LatLng(latitude, longitude);
      places.keywordSearch(`${text}`, findCallBack, {
        location: Lat,
        radius: 4000,
      });
    } else {
      places.keywordSearch(`${text}`, findCallBack);
    }
  };

  const eraseMarkers = () => {
    if (markers) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text) {
      findNearHospitals();
      SetText("");
    } else {
      window.alert("검색어를 입력해주세요");
    }
  };

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

export default SearchComponent;
