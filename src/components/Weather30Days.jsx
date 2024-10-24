import { useContext, useEffect, useState } from "react";
import {Fetch30Context} from '../context/Contexts';
import ShowWeather from "./ShowWeather";
import FetchWeather30 from "../api/FetchWeather30";

export default function Weather30Days() {
  const [loading, setLoading] = useState(true);

  const {fetch30, setFetch30, setWeatherData } = useContext(Fetch30Context);

  const apiId = import.meta.env.VITE_OPENWEATHER_API_KEY;


  //useEffect para hacer fetch cuando cambio ubicacion
  useEffect(() => {
      setLoading(true);
      const url = `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=40.416775&lon=-3.703790&appid=${apiId}&units=metric`;
      console.log(url);
      FetchWeather30(url, "GET", null, handleFetch);
  }, [fetch30]);

  //handle para la devolucion de datos del fetch
  const handleFetch = (newWeatherData) => {
    setWeatherData(newWeatherData);
    setFetch30(false);
    setLoading(false);
  }

  return (<></>
  )
}