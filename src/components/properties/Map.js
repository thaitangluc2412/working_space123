import { useState } from "react";

import GoogleMapReact from "google-map-react";

import MarkerMap from "./MarkerMap";



const Map = (props) => {
    console.log(`alo ${props.lat}, ${props.lng}`);
    const defaultProps = {
        center: {
          lat: +props.lat,
          lng: +props.lng
        },
        zoom: 16
      };
   return (
    // Important! Always set the container height explicitly
    <div style={{ height: props.height, width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
        
        >
        <MarkerMap
          lat={props.lat}
          lng={props.lng}
        />
      </GoogleMapReact>
    </div>
  );
}

export default Map;