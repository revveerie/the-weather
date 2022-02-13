import React from "react";

const MainScreen = ({ dt, timezone, temp, icon, weather }) => {
  return (
    <>
      <div className="main-screen__date"><p className="main-screen__date-text">{dt}</p></div>
      <div className="main-screen__location"><p className="main-screen__location-text">{timezone}</p></div>
      {icon}
      <div className="main-screen__temp"><p className="main-screen__temp-text">{temp}</p></div>
      {weather}
    </>
  );
};

export default MainScreen;
