import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDetailsApi } from "../../Services/Services";
import Geocode from "react-geocode";
import { getDistance, getPreciseDistance } from "geolib";
import axios from "axios";
const Musicyoulike = (props) => {
  Geocode.setApiKey("AIzaSyCLpRelH01xoapkwWD7w4chtFMQvjQPWn4");
  Geocode.fromLatLng("48.8583701", "2.2922926").then(
    (response) => {
      const address = response.results[0].formatted_address;
      // console.log("address",address);
    },
    (error) => {
      console.error(error);
    }
  );
  Geocode.fromAddress("Eiffle Tower").then((response) => {
    const { lat, lng } = response.results[0].geometry.location;
    // console.log("lat, lng ", lat, lng )
  });
  const navigate = useNavigate();

  const getGeners = () => {
    let path = "/Resultbreakdown";
    navigate(path);
  };
  React.useEffect(() => {
    getAllDetailsApi()
      .then((res) => {
        let dupdata = [...res.data];
        props.setRest(dupdata);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const getStories = () => {
    navigate("/instagramstory");
  };
  var dis = getDistance(
    { latitude: 30.8007, longitude: 76.7865 },
    { latitude: 32.3648, longitude: 75.6467 }
  );
  console.log(`Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`);

  var pdis = getPreciseDistance(
    { latitude: 30.8007, longitude: 76.7865 },
    { latitude: 32.3648, longitude: 75.6467 }
  );
  console.log(`Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`);


  return (
    <>
      <div className="Musicyoulike">
        <img className="twiinevblack_logo" src="./img/twiineblack.png" />
        <div className="heading">
          Based on your
          <span
            style={{
              color: "#4E6132",
              marginLeft: "15px",
              position: "relative",
            }}
          >
            music taste
            <img className="Location_Vector_logo" src="./img/Vector.png" />
          </span>
          , we've generated some options for you! Check out these food spots.
        </div>
      </div>

      <div className="row cards Musicyoulikes">
        {props.rest?.slice(0, 3).map((ele, key) => (
          <div className="col-12 col-md-4" key={key}>
            <div className="Musicyoulike_card_blue">
              <img className="img" src={ele?.image1} />
              <div className="card_content">
                <p style={{ paddingTop: "1rem" }} className="businnes">{ele?.businessName} <span>{ele?.price}</span></p>
                <p>Distance : 14.5 mi</p>

                <p>Location : {ele?.city}</p>
                <p>
                  Vibes :&nbsp; <span className="gener-name">Jazz</span> &nbsp;
                  <span className="gener-name"     >Popp</span>
                </p>
              </div>
              <button className="Moreinfo btn" type="button">
                see more info
                <img className="right-arrow" src="./img/right-arrow.png" />
              </button>
            </div>
          </div>
        ))}

        <div className="share_buttons">
          <button className="btn" type="button" onClick={getGeners}>
            <img className="genere-image" src="./img/31.png" />
            See your genre Breakdown
          </button>
          <button className="btn " type="button" onClick={getStories}>
            <img className="genere-image" src="./img/share.png" />
            Share on social media
          </button>
          <button className="btn " type="button">
            <img className="genere-image" src="./img/rocket.png" />
            Subscribe for product updates
          </button>
        </div>
      </div>
    </>
  );
};

export default Musicyoulike;
