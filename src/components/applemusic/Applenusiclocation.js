import React, { useEffect, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const MusicKit = window.MusicKit;
const Userlocations = (props) => {
  /* Get current location */
  let token = localStorage.getItem("id_token");


  const geolocation = useGeolocation();
  const navigate = useNavigate();

  /*  get data by current Location */
  const yesDataByLocation = () => {
    let path = `/selectedmile`;
    props.setRandomdata("0");

    localStorage.setItem("filterstate", "0");

    navigate(path);
  };
  /* get data by generes Location */
  const noDataByGener = () => {
    let path = `/likemusic`;
    navigate(path);
    localStorage.setItem("filterstate", "1");
  };

  return (
    <>
      <div className="Userlocation_main">
        <div className="Userlocation_main_inner">
          <img className="twiinevblack_logo" src="./img/twiineblack.png" />
          <div className="heading">
            Can we use your{" "}
            <span className="location">
              location
              <img className="Location_Vector_logo" src="./img/Vector.png" />
            </span>{" "}
            to find food spots near you?
          </div>

          <div className="yes_btn">
            <button className="btn" type="button" onClick={yesDataByLocation}>
              yes, Please!
            </button>
          </div>
          <div className="no_btn">
            <button className="btn" type="button" onClick={noDataByGener}>
            no thanks
            </button>
          </div>
          <div className="text">
            Just a heads up! Clicking on “no” will generate results not near
            you.
          </div>
        </div>
      </div>
    </>
  );
};

export default Userlocations;
