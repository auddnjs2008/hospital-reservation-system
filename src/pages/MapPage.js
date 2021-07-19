import React from "react";
import axios from "axios";
import MapContainer from "../containers/map/MapContainer";
import PlaceInfoContainer from "../containers/PlaceInfoContainer";
import styled from "styled-components";
import { useEffect } from "react";

const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const MapPage = () => {
  //useEffect(async () => {
  //try {
  //   const response = await axios({
  //     method: "post",
  //     url: "https://u7npsu62nj.execute-api.ap-northeast-2.amazonaws.com/api_test/resource",
  //     data: {
  //       method: "POST",
  //       body: {
  //         TableName: "reservation",
  //         Item: {
  //           number: "4",
  //           hospitalName: "미엘피부과 송산그린시티점",
  //           name: "wndnjs",
  //           time: "11:00",
  //         },
  //       },
  //     },
  //   });
  //   console.log(response);
  // } catch (e) {
  //   console.log(e);
  // }
  //   try {
  //     const response = await axios({
  //       method: "post",
  //       url: "https://u7npsu62nj.execute-api.ap-northeast-2.amazonaws.com/api_test/resource",
  //       data: {
  //         method: "GET",
  //         body: {
  //           TableName: "reservation",
  //           ScanFilter: {
  //             hospitalName: {
  //               AttributeValueList: {
  //                 S: "미엘피부과 송산그린시티점",
  //               },
  //               ComparisonOperator: "EQ",
  //             },
  //           },
  //         },
  //       },
  //     });
  //     console.log(JSON.parse(response.data.body));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  return (
    <>
      <MapWrapper>
        <PlaceInfoContainer />
        <MapContainer></MapContainer>
      </MapWrapper>
    </>
  );
};

export default MapPage;
