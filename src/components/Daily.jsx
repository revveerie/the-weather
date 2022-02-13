import React from "react";

const Daily = ({ dt, icon, tempDay, tempNight }) => {
  return (
    <>
      <div className="daily__temp-wrapper">
        <div className="daily__temp"><p className="daily__temp-text">{tempDay}</p></div>
        {/* <div className="daily__temp"><p className="daily__temp-text">{tempNight}</p></div> */}
      </div>
      
      {icon}
      <div className="daily__time"><p className="daily__time-text">{dt}</p></div>
    </>
  );
};

export default Daily;
