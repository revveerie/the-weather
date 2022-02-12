import React from "react";
import { useEffect, useState } from "react";

import MainScreen from "./MainScreen.jsx";
import Hourly from "./Hourly.jsx";
import Daily from "./Daily.jsx";

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
          return <div key={index}>Icon: {currentIcon.icon}</div>;
        })}
        weather={currentWeather.map((currentIcon, index) => {
          return <div key={index}>Weather: {currentIcon.main}</div>;
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
                  return <div key={index}>Icon: {hourlyIcon.icon}</div>;
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
                  return <div key={index}>Icon: {dailyIcon.icon}</div>;
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
