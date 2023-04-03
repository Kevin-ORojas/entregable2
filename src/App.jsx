import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import Weather from "./components/Weather";
import Loader from "./components/Loader";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [query, setQuery] = useState("");

  const success = (pos) => {
    const currentCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    };
    setCoords(currentCoords);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=85d120f22496ee878abb78c593d3c3a4`;

      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const fahrenheit = (celsius * (9 / 5) + 32).toFixed(1);
          const newTemps = {
            celsius,
            fahrenheit,
          };
          setTemp(newTemps);
          setQuery(""); // Limpia la barra de búsqueda después de realizar la búsqueda.
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=85d120f22496ee878abb78c593d3c3a4`;

      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 288.17).toFixed(1);
          const fahrenheit = (celsius * (9 / 5) + 32).toFixed(1);
          const newTemps = {
            celsius,
            fahrenheit,
          };
          setTemp(newTemps);
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-[url('/images/bg.jpg')] bg-cover px-3">
      <form onSubmit={handleSearch} className="w-full max-w-md mt-8">
        <div className="flex items-center border-b-2 border-blue-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full dark:text-black font-bold mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Buscar clima de otra ciudad..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Buscar
          </button>
        </div>
      </form>
    {
      
 weather ? (
          <Weather weather={weather} temp={temp} />
        ) : (
          <Loader />
        )
     }
    </div>
  
  );

  
}
export default App;
