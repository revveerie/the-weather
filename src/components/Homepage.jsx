import React from "react";
import { useEffect, useState } from "react";

import MainScreen from "./MainScreen.jsx";
import Hourly from "./Hourly.jsx";
import Daily from "./Daily.jsx";

import d10 from "../assets/images/01d.png";
import d20 from "../assets/images/02d.png";
import d30 from "../assets/images/03d.png";
import d40 from "../assets/images/04d.png";
import d60 from "../assets/images/06d.png";
import d01 from "../assets/images/10d.png";
import d11 from "../assets/images/11d.png";
import d31 from "../assets/images/13d.png";
import d05 from "../assets/images/50d.png";

import n10 from "../assets/images/01n.png";
import n20 from "../assets/images/02n.png";
import n30 from "../assets/images/03n.png";
import n40 from "../assets/images/04n.png";
import n60 from "../assets/images/06n.png";
import n01 from "../assets/images/10n.png";
import n11 from "../assets/images/11n.png";
import n31 from "../assets/images/13n.png";
import n05 from "../assets/images/50n.png";

const Homepage = () => {
  const [currentInfo, setCurrentInfo] = useState([]);
  const [currentTimezone, setCurrentTimezone] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [hourlyInfo, setHourlyInfo] = useState([]);
  const [dailyInfo, setDailyInfo] = useState([]);
  let cleanupFunction = false;
  useEffect(() => {
    const API_KEY = "76de2e175fe2b2a951e9d9be8908fc9c";
    window.onload = function () {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log(`Lat :${position.coords.latitude}, Lang :${position.coords.longitude}`);
          fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=alerts&appid=${API_KEY}`
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);
              if (!cleanupFunction) {
                setCurrentInfo(data.current);
                setCurrentTimezone(data);
                setCurrentWeather(data.current.weather);
                setHourlyInfo(data.hourly);
                setDailyInfo(data.daily);
              }
            });
          return () => (cleanupFunction = true);
        });
      } else {
        console.log("Browser doesn't support geolocation!");
      }
    };
  });
  return (
    <>
      <div>
        <b>Main screen</b>
      </div>
      <MainScreen
        dt={currentInfo.dt}
        timezone={currentTimezone.timezone}
        temp={currentInfo.temp}
        feelsLike={currentInfo.feels_like}
        humidity={currentInfo.humidity}
        uvi={currentInfo.uvi}
        windSpeed={currentInfo.wind_speed}
        icon={currentWeather.map((currentIcon, index) => {
          return <div key={index}>Icon: {currentIcon.icon}<img src={`https://raw.githubusercontent.com/vvyysotskaya/the-weather/main/src/assets/images/${currentIcon.icon}.png`}/></div>;
        })}
        weather={currentWeather.map((currentIcon, index) => {
          return <div key={index}>
            Weather: {currentIcon.main}
          </div>;
        })}
      />
      <div>
        <b>Hourly</b>
      </div>
      <div>
        {hourlyInfo.map((hourly, index) => {
          return (
            <div key={index} className="news-card">
              <Hourly
                dt={hourly.dt}
                temp={hourly.temp}
                icon={hourly.weather.map((hourlyIcon, index) => {
                  return <div key={index}>Icon: {hourlyIcon.icon}<img src={`https://raw.githubusercontent.com/vvyysotskaya/the-weather/main/src/assets/images/${hourlyIcon.icon}.png`}/></div>;
                })}
              />
            </div>
          );
        })}
      </div>
      <div>
        <b>Daily</b>
      </div>
      <div>
        {dailyInfo.map((daily, index) => {
          return (
            <div key={index} className="news-card">
              <Daily
                dt={daily.dt}
                tempDay={daily.temp.day}
                tempNight={daily.temp.night}
                icon={daily.weather.map((dailyIcon, index) => {
                  return <div key={index}>Icon: {dailyIcon.icon}<img src={`https://raw.githubusercontent.com/vvyysotskaya/the-weather/main/src/assets/images/${dailyIcon.icon}.png`}/></div>;
                })}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Homepage;
