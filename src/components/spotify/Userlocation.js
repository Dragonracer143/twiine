import React, { useEffect, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Userlocation = (props) => {
const [apple , setApple] = useState('')
console.log("apple", apple)
  /* Get current location */
  let token = localStorage.getItem("id_token");
  console.log("id token ", token)
  const onGetdata = async (e) => {
    const  data  = await axios
      .get("https://api.music.apple.com/v1", {
        headers: {
          "Access-Control-Allow-Origin": "https://twine-new.vercel.app",
          Authorization: `Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlU3NzgyRlI0WFoifQ.eyJpYXQiOjE2NjUwNzQ3MjEsImV4cCI6MTY4MDYyNjcyMSwiaXNzIjoiTllMVDdCVzg3UiJ9.jplpYfRtRrCg47s3JwZWzYhRSrSp5m2QKsedT565UcER20qRlGfK53kR_fYiDqemEC-fVEq4o9VfmhmN9AFkCg`,
        "Content-Type": "application/json"
        },
      })
      .then(function (response) {
        console.log("response",response);
      });
  
  };

useEffect(()=>{
  onGetdata()
},[])


  const geolocation = useGeolocation();
  const navigate = useNavigate();

  /*  get data by current Location */
  const yesDataByLocation = () => {
    let path = `/Selectmiles`;
    props.setRandomdata("0");

    localStorage.setItem("filterstate", "0");

    navigate(path);
  };
  /* get data by generes Location */
  const noDataByGener = () => {
    let path = `/musicyoulike`;
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
              yes, please!
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

export default Userlocation;
