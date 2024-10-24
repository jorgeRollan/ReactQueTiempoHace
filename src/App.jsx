import { useState } from 'react';
import SelectCities from './components//selectCities/SelectCities';
import CityLocation from './components/CityLocation';
import { CleanContext, MapContext, Fetch30Context } from './context/Contexts';
import Mapa from './components/Mapa';
import Navigator from './components/navigator/Navigator';

import './App.css';
import Weather30Days from './components/Weather30Days';

function App() {
  // estado para controlar si hay que quitar el panel de ubicacion o mostrarlo lo cambio cuando elijo una ciudad del select o si pulso el boton ubicacion
  const [clean, setClean] = useState(true);
  const [position, setPosition] = useState(null);
  const [showWeather, setShowWeather] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [fetch30, setFetch30] = useState(null);

  /*
  Pongo un context para pasar el clean y la funcion handle a selectCiudades
  si clean es true quito ciudadUbicacion y creo un boton para reactivar

  
      
  */
  return (
    <div>
      <h1>UNIT 1. API Weather</h1>
      <Navigator/>
      {clean ?
        <button onClick={() => { setClean(false); setShowWeather(false) }}>Clima por ubicación</button>
        : <MapContext.Provider value={{ position, setPosition, weatherData, setWeatherData }}>
          <CityLocation />
        </MapContext.Provider>}

      <CleanContext.Provider value={{ setClean, showWeather, setShowWeather, setPosition, weatherData, setWeatherData }}>
        <SelectCities />
      </CleanContext.Provider>
      {position && weatherData ?
        <MapContext.Provider value={{ position, weatherData }}>
          <Mapa />
        </MapContext.Provider> : false
      }
      <>
        <Fetch30Context.Provider value={{ fetch30, setFetch30, weatherData, setWeatherData }}>
          <Weather30Days />
        </Fetch30Context.Provider>
      </>
    </div>
  );
}

export default App;