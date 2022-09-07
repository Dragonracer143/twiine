import React, { useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../Services/Config";
const Userlocation = () => {
  const geolocation = useGeolocation();
  const lattitudeValue =geolocation.latitude
  const longitudeValue =geolocation.longitude

  const navigate = useNavigate();
  const getLocation = () => {
    let path = `/musicyoulike`;
   const localUrl = "http://localhost:3000/"
    const data = axios.get(
      `${baseUrl}filterResturants?lat=${lattitudeValue}&long=${longitudeValue}`
    );
    console.log("data", data);

    navigate(path);
  };
  const logout = () => {
    // setToken("");
    window.localStorage.removeItem("token");
    let path = `/`;
    navigate(path);
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
            <button className="btn" type="button" onClick={getLocation}>
              yes, please!
            </button>
          </div>
          <div className="no_btn">
            <button className="btn" type="button" onClick={logout}>
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

export default Userlocation;
