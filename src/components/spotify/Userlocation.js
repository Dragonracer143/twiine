import React, { useEffect, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Userlocation = (props) => {
const [apple , setApple] = useState('')
console.log("apple", apple)
  /* Get current location */
  let codetoken = localStorage.getItem("code");

  const onGetdata = async (e) => {
    const { data } = await axios
      .get("https://api.music.apple.com/v1/me/storefront", {
        headers: {
          Authorization: `Bearer ${codetoken}`,
        },
      })
      .catch((err) => {
        console.log(err.response.status);
      });
      setApple(data);
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
