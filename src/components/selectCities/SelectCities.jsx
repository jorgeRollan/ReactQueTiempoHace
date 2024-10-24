import { useEffect, useState, useContext } from "react";
import FetchUrl from "../../api/FetchUrl";
import ShowWeather from "../ShowWeather";
import FormSearchCity from "./FormSearchCity"
import Select from "./Select";
import FetchCiudades from "../../api/FetchCiudades";
import { CleanContext } from '../../context/Contexts';
import { DataContext } from "../../context/Contexts";
import { SearchCityContext } from "../../context/Contexts"
import { SelectCityContext } from "../../context/Contexts";
import DataFallback from "../DataFallback";


export default function SelectCities() {
  const [selectCity, setSelectCity] = useState(null);
  const [selectCities, setSelectCities] = useState(null);
  const [fetchCiudades, setFetchCiudades] = useState(true);
  const [loading, setLoading] = useState(true);

  const { setClean, showWeather, setShowWeather, setPosition, weatherData, setWeatherData } = useContext(CleanContext);
  const apiId = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const handleFetch = (newWeatherData) => {
    setWeatherData(DataFallback(newWeatherData));
    console.log(newWeatherData);
    setPosition({coords: {latitude: newWeatherData.coord.lat, longitude: newWeatherData.coord.lon}});
    setLoading(false);
    setClean(true);
  }

  const handleFetchCiudades = (newCities) => {
    
    setSelectCities(newCities);
  }

  //use effect para llamar a fetch cuando cambia el SelectCity
  useEffect(() => {
    if (selectCity !== null) {
      setShowWeather(true);
      const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + selectCity + '&appid=' + apiId + '&units=metric';
      FetchUrl(url, "GET", null, handleFetch);
    }
  }, [selectCity]);

  useEffect(() => {
    if (fetchCiudades) {
      FetchCiudades('http://localhost:8000/api/ciudades', "GET", null, handleFetchCiudades);
      setFetchCiudades(false);
    }
  }, [fetchCiudades]);

  return (
    <>
      <div id="selectCity">
      <>
          <SearchCityContext.Provider value={{ selectCity, setSelectCity, setLoading }}>
            <FormSearchCity />
          </SearchCityContext.Provider>
        </>
        
        <>
          <SelectCityContext.Provider value={{ selectCity, setSelectCity, selectCities, setLoading }}>
            <Select />
          </SelectCityContext.Provider>
        </>

        {showWeather ? 
          <DataContext.Provider value={weatherData}>
            {loading ? <h2>Devolviendo datos del servidor</h2> : <ShowWeather />}
          </DataContext.Provider> : false
        }
      </div>
    </>
  )
}