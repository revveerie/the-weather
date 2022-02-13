import React from "react";

const Hourly = ({ dt, icon, temp }) => {
  return (
    <>
      <div className="hourly__temp"><p className="hourly__temp-text">{temp}</p></div>
      {icon}
      <div className="hourly__time"><p className="hourly__time-text">{dt}</p></div>
    </>
  );
};

export default Hourly;
