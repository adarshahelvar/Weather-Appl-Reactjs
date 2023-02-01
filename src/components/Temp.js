import React, { useState, useEffect } from "react";
import "./temptyle.css";
import WeatherCard from "./WeatherCard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Bangalore");
  const [tempInfo, setTempInfo ] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=3f0f5ed309a85bb2d6387faffe43ea1c`;
      const res = await fetch(url);
      const resData = await res.json();
      //  console.log(resData);

      const { temp, humidity, pressure } = resData.main;
      // console.log(temp,humidity,pressure);
      const { main: weathermood } = resData.weather[0];
      // console.log(weathermood)
      const name = resData.name;
      // console.log(name);
      const { speed } = resData.wind;
      // console.log(speed);
      const { country, sunset } = resData.sys;
      // console.log(country,sunset);

      const fullWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
    };

    setTempInfo(fullWeatherInfo);
    console.log(fullWeatherInfo);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="Search..."
            id="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      <WeatherCard tempInfo={tempInfo}/>
    </>
  );
};

export default Temp;
