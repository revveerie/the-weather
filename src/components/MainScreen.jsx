import React from "react";

const MainScreen = ({ dt, timezone, temp, icon, weather }) => {
  return (
    <>
      <div>Date: {dt}</div>
      <div>Name: {timezone}</div>
      <div>Temperature: {temp}</div>
      <div>{icon}</div>
      <div>{weather}</div>
    </>
  );
};

export default MainScreen;
