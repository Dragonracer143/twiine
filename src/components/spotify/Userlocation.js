import React, { useState } from 'react';
import useGeolocation from "react-hook-geolocation";
import { useNavigate } from 'react-router-dom';
const Userlocation = () => {
  const geolocation = useGeolocation();
  const [locate , setLocate] = useState("");
  const lattitudeValue =geolocation.latitude
  const langitudeValue =geolocation.longitude

  const navigate = useNavigate( )
  const getLocation = () =>{ 
    let path = `/musicyoulike`; 
    navigate(path);
  }
  const logout = () => {
    // setToken("");
    window.localStorage.removeItem("token");
    let path = `/Musiclogin`; 
    navigate(path);
  };

  console.log("lattitude",lattitudeValue)
  console.log("longitude",langitudeValue)
  return (
  <>
  <div className='Userlocation_main'>
    <div className='Userlocation_main_inner'>
    <img className='twiinevblack_logo' src="./img/twiineblack.png"/>
      <div className='heading'  >
      Can we use your location to generate results near you?
      </div>

      <div className='yes_btn'>
      <button className='btn' type="button" 
      onClick={getLocation}
      >Yes</button>
      </div>
      <div className='no_btn'>
      <button className='btn' type="button" onClick={logout}>No</button>
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