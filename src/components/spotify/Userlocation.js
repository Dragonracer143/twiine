import React, { useState } from 'react';
import useGeolocation from "react-hook-geolocation";
import Geocode from "react-geocode";

const Userlocation = () => {
  Geocode.setApiKey("AIzaSyCs_vWBakIDqhPl1Hu1T9EK-smqYkj9N7Y");
  Geocode.setLanguage("en");
  Geocode.setRegion("es");
  Geocode.setLocationType("ROOFTOP");
  Geocode.enableDebug();

  const geolocation = useGeolocation();
  const [locate , setLocate] = useState("");
  console.log("loacte", locate)
  const lattitudeValue =geolocation.latitude
  const langitudeValue =geolocation.longitude

  const getLoaction = ()=>{
    setLocate(langitudeValue)
  }
  Geocode.fromLatLng(lattitudeValue, langitudeValue).then(
    (response) => {
      const address = response.results[0].formatted_address;
      console.log("address",address);
    },
    (error) => {
      console.error(error);
    }
  );
  console.log("lattitude",lattitudeValue)
  console.log("longitude",langitudeValue)
  return (
  <>
  <div className='Userlocation_main'>
    <div className='Userlocation_main_inner'>
    <img className='twiinevblack_logo' src="./img/twiineblack.png"/>
      <div className='heading' onClick={(e)=>getLoaction(e)}>
      Can we use your location to generate results near you?
      </div>

      <div className='yes_btn'>
      <button className='btn' type="button">Yes</button>
      </div>
      <div className='no_btn'>
      <button className='btn' type="button">No</button>
      </div>
      <div className='text'>
        Just a heads up! Clicking on “no” will generate results not near you.
      </div>
    </div>
  </div>  
  </>
  )
}

export default Userlocation