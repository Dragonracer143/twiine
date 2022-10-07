import React, { useEffect, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Userlocation = (props) => {
  const [apple, setApple] = useState("");
  console.log("apple", apple);
  /* Get current location */
  let token = localStorage.getItem("id_token");
  console.log("id token ", token);
  const onGetdata = async (e) => {
  axios
      .get("https://api.music.apple.com/v1/storefronts", {
        headers: {
          "Access-Control-Allow-Origin": "https://twine-new.vercel.app/",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          Authorization:
            "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllIS0xLSk5ZRDMifQ.eyJpYXQiOjE2NjUxNjg0MTIsImV4cCI6MTY4MDcyMDQxMiwiaXNzIjoiTllMVDdCVzg3UiJ9.qM3UV0c7KZiEXMVGkEWXgkEiEcP52WiMz_z71zMD5vnX6V1zOnZJl0jN9VH_4niJnzbYV_s9MhvWwmkC0h29bw",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("myresponse", response);
      })
      .catch((err) => {
        console.log("eroor", err);
      });
  };

  useEffect(() => {
    onGetdata();
  }, []);

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
