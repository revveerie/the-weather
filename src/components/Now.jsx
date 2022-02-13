import React from "react";

const Now = ({ feelsLike, windSpeed, uvi, humidity }) => {
  return (
    <>
      <div>Feels like: {feelsLike}</div>
      <div>Wind speed: {windSpeed}</div>
      <div>UV index: {uvi}</div>
      <div>Humidity: {humidity}</div>
    </>
  );
};

export default Now;
