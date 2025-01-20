import { GoogleMap, LoadScript } from "@react-google-maps/api";
import React from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const Map = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  if (!apiKey) {
    console.error("Google Maps API Key is missing!");
    return <div>Error: Google Maps API Key not found.</div>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Additional Map Features */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
