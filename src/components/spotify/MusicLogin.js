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
const Musiclogin = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
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
      navigate("/userlocation");
    }
    setToken(token);
  }, []);

  return (
    <>
      <div className="musiclogin_main">
        <div className="mausiclogin_main_inner">
          <img className="twiinevblack_logo" src="./img/twiineblack.png" />
          <div className="heading">
            Get recommended spots to eat based on your{" "}
            <span style={{ color: "#FE3C3C" }}>music taste</span>
          </div>

          <div className="applemusic_btn">
            <button className="btn" type="button">
              Log in with Apple Music
            </button>
          </div>
          <div className="spotify_btn">
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
                "%20"
              )}&response_type=${RESPONSE_TYPE}&show_dialog=true`}
            >
              <button className="btn" type="button">
                Log in with Spotify{" "}
                <img className="spotify_logo" src="./img/Spotify.png" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Musiclogin;
