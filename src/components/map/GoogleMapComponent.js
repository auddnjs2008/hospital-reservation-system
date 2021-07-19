import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const GoogleMapComponentBlock = styled.div`
  #map {
    width: 500px;
    height: 500px;
  }
`;

const GoogleMapComponent = () => {
  const googlemap = useRef();
  const mode = useRef();

  function initMap() {
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    const directionsService = new window.google.maps.DirectionsService();
    const map = new window.google.maps.Map(googlemap.current, {
      zoom: 14,
      center: { lat: 37.77, lng: -122.447 },
    });
    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    mode.current.addEventListener("change", () => {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
  }
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const selectedMode = "TRANSIT";
    directionsService
      .route({
        origin: { lat: 37.284882599999996, lng: 126.83578220000001 },
        destination: { lat: 37.3188475342542, lng: 126.83515543664 },
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: window.google.maps.TravelMode[selectedMode],
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + `${e}`));
  }

  useEffect(() => {
    initMap();
  }, []);
  return (
    <GoogleMapComponentBlock>
      <div id="map" ref={googlemap}></div>
      <div id="mode" ref={mode}></div>
    </GoogleMapComponentBlock>
  );
};

export default GoogleMapComponent;
