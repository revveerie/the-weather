import React from "react";

import Loader from '../assets/images/loader.png';

const Preloader = () => {
  return (
    <>
      <div className="preloader">
        <div className="preloader__image">
          <img src={Loader} />
        </div>
      </div>
    </>
  );
};

export default Preloader;
