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
      .get("https://api.music.apple.com/v1/me/storefront", {
        headers: {
          "Access-Control-Allow-Origin": "https://twine-new.vercel.app/",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          Authorization:
            "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllIS0xLSk5ZRDMifQ.eyJpYXQiOjE2NjUxNjg0MTIsImV4cCI6MTY4MDcyMDQxMiwiaXNzIjoiTllMVDdCVzg3UiJ9.qM3UV0c7KZiEXMVGkEWXgkEiEcP52WiMz_z71zMD5vnX6V1zOnZJl0jN9VH_4niJnzbYV_s9MhvWwmkC0h29bw",
            "Music-User-Token":"eyJraWQiOiJZdXlYb1kiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLnR3aW5lLm5hbWUiLCJleHAiOjE2NjUyNTY4MjEsImlhdCI6MTY2NTE3MDQyMSwic3ViIjoiMDAxNTMzLjIwOTkyOGVjYzgyMjQ1YTQ4NDk1YTQ3Mzc3MDljZjY4LjE5MjAiLCJjX2hhc2giOiJqNnVOTmxtUnJlOVhreFJzSldQdTNRIiwiYXV0aF90aW1lIjoxNjY1MTcwNDIxLCJub25jZV9zdXBwb3J0ZWQiOnRydWV9.LDcpLhhBps87tKBq0ZbQeGajN1m4_5XfUuY8ds8rAkWxAywAcKLDZtv-ffnGuIJ2ksPrt7oigTSCHzIsHP0OlwjsW5oIHIZVcYPF5iIg0TiYc6xnYQfO70AeYMHIz2uZSF7i7sQz3aSRb4rmvfdUjTKJ3QPVqMexouAd5ejYZYx_DVbUCuYJ5fo7Jk37nuvwuu3C_zSvWY-KYA6kyZjzMIaZskEl1A5_2orJqT9w5hBFy0hR-v00wdVQ9NMF1Y0-3QclPSgVlGdo9HXgiYanFbeOuhQOAFTQWzdmK02G8SykTuKl4tC6pM1YUixxNKLpcN8PDS_1LvLLqjPA9UVO3g",
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
  const tokenDev = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllIS0xLSk5ZRDMifQ.eyJpYXQiOjE2NjU0MjA5NDcsImV4cCI6MTY4MDk3Mjk0NywiaXNzIjoiTllMVDdCVzg3UiJ9.yADms8Ucvf6RP-KzHkFG2ATh2TT8fZQT58H9jFIp85Zi5u6oDbQGb2Bq3QD6qoIWhXXFlie_WW9HO_fZlCDLBw"
    const setupMusicKit = new Promise((resolve) => {
      document.addEventListener("musickitloaded", () => {
        console.log("mus", tokenDev)
        const musicKitInstance = window.MusicKit.configure({
          developerToken:tokenDev,

          app: {
            name: "MusicKit Web App",
            build: "1.0.0",
          },
        });
        delete window.MusicKit; // clear global scope
        console.log("music", musicKitInstance)
        resolve(musicKitInstance);
      });
    })
    setupMusicKit.then(async (musicKit) => {
      try {
    await musicKit.authorize(); 
console.log("Authorize", musicKit)
      // await musicKit.unauthorize(); 
      } catch(error) {
        // Handle cases when authorization fails
      }
  })
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
