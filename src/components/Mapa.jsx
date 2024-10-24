import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from 'leaflet';
import { MapContext } from "../context/Contexts";

const Map = () => {
  const { position, weatherData } = useContext(MapContext);
  const apiId = import.meta.env.VITE_OPENWEATHER_API_KEY;

  if (weatherData != null) {
    console.log(weatherData);
  }
  var weatherIcon = L.icon({
    iconUrl: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
    shadowUrl: "https://img.icons8.com/?size=64&id=r3zZvjy5L6eB&format=png",

    iconSize: [38, 55],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [30, 100],
    popupAnchor: [-3, -76]
  });


  return (
    /*
    position ? (
      <MapContainer
        center={[position.coords.latitude, position.coords.longitude]}
        zoom={13}
        style={{ height: "300px", width: "100%" }}
        key={`${position.coords.latitude}-${position.coords.longitude}`}
      >
        <L.tileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position.coords.latitude, position.coords.longitude]} icon={weatherIcon} />
      </MapContainer>
    ) : (
      <div>Loading map...</div>
    )
  */
    <MapContainer
      center={[position.coords.latitude, position.coords.longitude]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
      key={`${position.coords.latitude}-${position.coords.longitude}`}
    >{/* Base Map Layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* OpenWeatherMap Layer */}
      <TileLayer
        attribution='&copy; <a href="https://openweathermap.org/">OpenWeather</a>'
        url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiId}`}
      />
      <Marker position={[position.coords.latitude, position.coords.longitude]} icon={weatherIcon} />
    </MapContainer>
  );
}

export default Map;