import React from "react";

import FeelsLike from "../assets/images/celsius.svg";
import WindSpeed from '../assets/images/wind.svg';
import Humidity from '../assets/images/humidity.svg';
import UVIndex from '../assets/images/uvi.svg'; 

const Now = ({ feelsLike, windSpeed, uvi, humidity }) => {
  return (
    <>
      <div><img src={FeelsLike} /> {feelsLike}</div>
      <div><img src={WindSpeed} /> {windSpeed}</div>
      <div><img src={Humidity} /> {uvi}</div>
      <div><img src={UVIndex} /> {humidity}</div>
    </>
  );
};

export default Now;
