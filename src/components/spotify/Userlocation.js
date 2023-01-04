import React, { useEffect, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { useNavigate } from "react-router-dom";
const Userlocation = (props) => {
  /* Get current location */
  let token = localStorage.getItem("id_token");
  let appletoken = localStorage.getItem("musicUsertoken");



  const geolocation = useGeolocation();
  const navigate = useNavigate();

  /*  get data by current Location */
  const setDataByLoc = (e,value) => {
    e.preventDefault();
    props.setRandomdata("0");
    localStorage.setItem("filterstate",value);
    if(value){
      return navigate(`/Selectmiles`);
    }
    return navigate(`/musicyoulike`);    
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
            <button className="btn" type="button" onClick={(e)=>setDataByLoc(e,true)}>
              yes, please!
            </button>
          </div>
          <div className="no_btn">
            <button className="btn" type="button" onClick={(e)=>setDataByLoc(e,false)}>
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
