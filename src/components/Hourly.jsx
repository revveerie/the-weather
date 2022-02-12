import React from "react";

const Hourly = ({ dt, icon, temp }) => {
  return (
    <>
      <div>Date: {dt}</div>
      <div>Temperature: {temp}</div>
      <div>{icon}</div>
    </>
  );
};

export default Hourly;
