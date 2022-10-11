import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  scopes,
  CLIENT_ID,
  REDIRECT_URI,
  AUTH_ENDPOINT,
  RESPONSE_TYPE,
} from "../../Services/Config";
// import AppleLogin from 'react-apple-login'
import { appleAuthHelpers } from "react-apple-signin-auth";
import AppleSignin from "react-apple-signin-auth";
const MusicKit = window.MusicKit;

const Musiclogin = () => {
  const [token, setToken] = useState("");
  const [appletoken, setAppletoken] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const search = window.location.search;
    let params = new URLSearchParams(search);
    let tokenapple = params.get('id_token');
    localStorage.setItem("code", tokenapple);

    if (!tokenapple ) {

      localStorage.setItem("code", tokenapple);
    }
    if (tokenapple) {
      /* if the token is saved then navigate page to this end point*/
      navigate("/userlocation");
    }
    /* Save user token in localstorage to get the data of spotify account */
    setAppletoken(tokenapple);
  }, []);
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      localStorage.setItem("token", token);
    }
    if (token) {
      /* if the token is saved then navigate page to this end point*/
      navigate("/userlocation");
    }
    /* Save user token in localstorage to get the data of spotify account */
    setToken(token);
  }, []);



     const apple_auth="https://appleid.apple.com/auth/authorize?"
     const appl_id = "com.twine.name"
     const redirect_uria = "https://twine-new.vercel.app"
     const response_type_apple = "code id_token"
  const TeamID = " NYLT7BW87R"
  const Loginapi = async () =>{
    await MusicKit.configure({
      developerToken: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllIS0xLSk5ZRDMifQ.eyJpYXQiOjE2NjU0OTkzOTQsImV4cCI6MTY4MTA1MTM5NCwiaXNzIjoiTllMVDdCVzg3UiJ9.kowm5_kjHPqpovZV1u1tffpztEMt4_wf2t9NojoNg6koNKqRhnM2noVQTI_ISv-tGvdPH2wwIptSWheRBASQjQ',
      app: {
        name: 'Twine LLC',
        build: '1978.4.1',
      },
    });
    const music = await MusicKit.getInstance();
    const musicAuthorize = await music.authorize()
    console.log("musiCauthorize", musicAuthorize)
    localStorage.setItem("musicUsertoken", musicAuthorize)
  }
  

  return (
    <>
      <div className="musiclogin_main">
        <div className="mausiclogin_main_inner">
          <img className="twiinevblack_logo" src="./img/twiineblack.png" />
          <div className="heading">
            Get recommended spots to eat based on your{" "}
            <span style={{ color: "#FE3C3C" }} className="music-taste">
              music taste!
              <img className="Vector_logo" src="./img/Vector.png" />
            </span>
          </div>

          <div className="spotify_btn">
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
                "%20"
              )}&response_type=${RESPONSE_TYPE}&show_dialog=true`}
            >
              <button className="btn" type="button">
                <img className="spotify_logo" src="./img/Spotify.png" />
                Log in with Spotify{" "}
              </button>
            </a>
          </div>
          <div className="applemusic_btn">

          {/* <a href={`${apple_auth}client_id=${appl_id}&redirect_uri=${redirect_uria}&response_type=${response_type_apple}`}> */}

            <button onClick={()=>Loginapi()} className="btn" type="button">
              <img className="apple_logo" src="./img/AppleLogo.png" />
              Log in with Apple Music
      
            </button>
            {/* </a> */}
          </div>
          <p className="text-white mt-4">
            Heads up! By choosing "no thanks", we will just generate results
            that aren't near you.
          </p>
        </div>

      </div>
    </>
  );
};

export default Musiclogin;
