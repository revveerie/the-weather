import React from "react";

const Daily = ({ dt, icon, tempDay, tempNight }) => {
  return (
    <>
      <div>Date: {dt}</div>
      <div>Temperature day: {tempDay}</div>
      <div>Temperature night: {tempNight}</div>
      <div>{icon}</div>
    </>
  );
};

export default Daily;
