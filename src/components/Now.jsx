import React from "react";

import FeelsLike from "../assets/images/celsius.svg";
import WindSpeed from "../assets/images/wind.svg";
import Humidity from "../assets/images/humidity.svg";
import UVIndex from "../assets/images/uvi.svg";

const Now = ({ feelsLike, windSpeed, uvi, humidity }) => {
  return (
    <>
      <div className="now__row">
        <div className="now__item">
          <div className="now__item-image">
            <img src={FeelsLike} />
          </div>
          <div className="now__item-value">
            <p className="now__item-value-text">{feelsLike}</p>
          </div>
          <div className="now__item-name">
            <p className="now__item-name-text">Feels like</p>
          </div>
        </div>
        <div className="now__item">
          <div className="now__item-image">
            <img src={WindSpeed} />
          </div>
          <div className="now__item-value">
            <p className="now__item-value-text">{windSpeed} km/h</p>
          </div>
          <div className="now__item-name">
            <p className="now__item-name-text">Wind speed</p>
          </div>
        </div>
        <div className="now__item">
          <div className="now__item-image">
            <img src={Humidity} />
          </div>
          <div className="now__item-value">
            <p className="now__item-value-text">{uvi}</p>
          </div>
          <div className="now__item-name">
            <p className="now__item-name-text">UV index</p>
          </div>
        </div>
        <div className="now__item">
          <div className="now__item-image">
            <img src={UVIndex} />
          </div>
          <div className="now__item-value">
            <p className="now__item-value-text">{humidity} %</p>
          </div>
          <div className="now__item-name">
            <p className="now__item-name-text">Humidity</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Now;
