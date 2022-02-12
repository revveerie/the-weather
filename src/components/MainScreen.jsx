import React from "react";

const MainScreen = ({ dt, timezone, temp, feelsLike, humidity, uvi, windSpeed, icon, weather }) => {
  return (
    <>
      <div>Date: {dt}</div>
      <div>Name: {timezone}</div>
      <div>Temperature: {temp}</div>
      <div>Feels like: {feelsLike}</div>
      <div>Humidity: {humidity}</div>
      <div>UV index: {uvi}</div>
      <div>Wind: {windSpeed}</div>
      <div>{icon}</div>
      <div>{weather}</div>
    </>
  );
};

export default MainScreen;
