import React from "react";
import { useEffect, useState } from "react";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import dateFormatCurrent from "../helpers/dateFormatCurrent.js";
import dateFormatHourly from "../helpers/dateFormatHourly.js";
import dateFormatDaily from "../helpers/dateFormatDaily.js";
import tempFormat from "../helpers/tempFormat.js";

import MainScreen from "./MainScreen.jsx";
import Now from "./Now.jsx";
import Hourly from "./Hourly.jsx";
import Daily from "./Daily.jsx";

const Homepage = () => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    swipeToSlide: true
  };

  const [currentInfo, setCurrentInfo] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [hourlyInfo, setHourlyInfo] = useState([]);
  const [dailyInfo, setDailyInfo] = useState([]);
  const [cityName, setCityName] = useState([]);
  let cleanupFunction = false;
  useEffect(() => {
    const API_KEY = "76de2e175fe2b2a951e9d9be8908fc9c";
    window.onload = function () {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log(`Lat :${position.coords.latitude}, Lang :${position.coords.longitude}`);
          let BASE_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=alerts&appid=${API_KEY}`;
          let CITY_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`;
          // let SEARCH_URL = `https://api.openweathermap.org/data/2.5/weather?q=Brest&appid=${API_KEY}`;
          fetch(BASE_URL)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);
              if (!cleanupFunction) {
                setCurrentInfo(data.current);
                setCurrentWeather(data.current.weather);
                setHourlyInfo(data.hourly);
                setDailyInfo(data.daily);
              }
            });
          fetch(CITY_URL)
            .then(function (response2) {
              return response2.json();
            })
            .then(function (data2) {
              console.log(data2);
              if (!cleanupFunction) {
                setCityName(data2.name);
              }
            });
          // fetch(SEARCH_URL)
          //   .then(function (response3) {
          //     return response3.json();
          //   })
          //   .then(function (data3) {
          //     console.log(data3);
          //     if (!cleanupFunction) {
          //     }
          //   });
          return () => (cleanupFunction = true);
        });
      } else {
        console.log("Browser doesn't support geolocation!");
      }
    };
  });
  return (
    <div className="homepage">
      <div className="main-screen">
        <div><b>Main screen</b></div>
        <MainScreen
          dt={dateFormatCurrent(currentInfo.dt)}
          timezone={cityName}
          temp={tempFormat(currentInfo.temp)}
          icon={currentWeather.map((currentIcon, index) => {
            return (
              <div key={index}>
                <img
                  src={`https://raw.githubusercontent.com/vvyysotskaya/the-weather/main/src/assets/images/${currentIcon.icon}.png`}
                />
              </div>
            );
          })}
          weather={currentWeather.map((currentIcon, index) => {
            return <div key={index}>Weather: {currentIcon.main}</div>;
          })}
        />
      </div>
      <div className="additional-info">
        <div className="now">
          <div><b>Now</b></div>
          <Now
            feelsLike={tempFormat(currentInfo.feels_like)}
            windSpeed={currentInfo.wind_speed}
            humidity={currentInfo.humidity}
            uvi={currentInfo.uvi}
          />
        </div>
        <div className="hourly">
          <div><b>Hourly</b></div>
          <div>
            <Slider {...settings}>
            {hourlyInfo.map((hourly, index) => {
              return (
                <div key={index} className="news-card">
                  <Hourly
                    dt={dateFormatHourly(hourly.dt)}
                    temp={tempFormat(hourly.temp)}
                    icon={hourly.weather.map((hourlyIcon, index) => {
                      return (
                        <div key={index}>
                          <img
                            src={`https://raw.githubusercontent.com/vvyysotskaya/the-weather/main/src/assets/images/${hourlyIcon.icon}.png`}
                          />
                        </div>
                      );
                    })}
                  />
                </div>
              );
            })}
            </Slider>
          </div>
        </div>
        <div className="daily">
          <div><b>Daily</b></div>
          <div>
          <Slider {...settings}>
            {dailyInfo.map((daily, index) => {
              return (
                <div key={index} className="news-card">
                  <Daily
                    dt={dateFormatDaily(daily.dt)}
                    tempDay={tempFormat(daily.temp.day)}
                    tempNight={tempFormat(daily.temp.night)}
                    icon={daily.weather.map((dailyIcon, index) => {
                      return (
                        <div key={index}>
                          <img
                            src={`https://raw.githubusercontent.com/vvyysotskaya/the-weather/main/src/assets/images/${dailyIcon.icon}.png`}
                          />
                        </div>
                      );
                    })}
                  />
                </div>
              );
            })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
