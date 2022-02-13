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
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1220,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 6
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 3
        }
      },
    ]
  };

  // window.onresize = function() {
  //   let windowInnerWidth = window.innerWidth;
  //   if (windowInnerWidth <= 1220) {
  //     var settings = {
  //       dots: false,
  //       infinite: true,
  //       speed: 500,
  //       slidesToShow: 6,
  //       slidesToScroll: 1,
  //       infinite: false,
  //       swipeToSlide: true,
  //     };
  //   } else {
  //     var settings = {
  //       dots: false,
  //       infinite: true,
  //       speed: 500,
  //       slidesToShow: 6,
  //       slidesToScroll: 1,
  //       infinite: false,
  //       swipeToSlide: true,
  //     };
  //   }
  //   console.log(settings)
  //   return settings;
  // };


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
        <MainScreen
          dt={dateFormatCurrent(currentInfo.dt)}
          timezone={cityName}
          temp={tempFormat(currentInfo.temp)}
          icon={currentWeather.map((currentIcon, index) => {
            return (
              <div key={index} className="main-screen__image">
                <img
                  src={`https://raw.githubusercontent.com/vvyysotskaya/the-weather/main/src/assets/images/${currentIcon.icon}.png`}
                />
              </div>
            );
          })}
          weather={currentWeather.map((currentIcon, index) => {
            return <div key={index} className="main-screen__weather"><p className="main-screen__weather-text">{currentIcon.main}</p></div>;
          })}
        />
      </div>
      <div className="additional-info">
        <div className="now">
          <div className="now__title">
            <b>Now</b>
          </div>
          <Now
            feelsLike={tempFormat(currentInfo.feels_like)}
            windSpeed={currentInfo.wind_speed}
            humidity={currentInfo.humidity}
            uvi={currentInfo.uvi}
          />
        </div>
        <div className="hourly">
          <div className="hourly__title">
            <b>Hourly</b>
          </div>
            <Slider {...settings}>
              {hourlyInfo.map((hourly, index) => {
                return (
                  <div key={index} className="hourly__card">
                    <Hourly
                      dt={dateFormatHourly(hourly.dt)}
                      temp={tempFormat(hourly.temp)}
                      icon={hourly.weather.map((hourlyIcon, index) => {
                        return (
                          <div key={index} className="hourly__card-image">
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
        <div className="daily">
          <div className="daily__title">
            <b>Daily</b>
          </div>
            <Slider {...settings}>
              {dailyInfo.map((daily, index) => {
                return (
                  <div key={index} className="daily__card">
                    <Daily
                      dt={dateFormatDaily(daily.dt)}
                      tempDay={tempFormat(daily.temp.day)}
                      tempNight={tempFormat(daily.temp.night)}
                      icon={daily.weather.map((dailyIcon, index) => {
                        return (
                          <div key={index} className="daily__card-image">
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
  );
};

export default Homepage;
