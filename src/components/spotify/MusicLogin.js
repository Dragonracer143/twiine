import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Musiclogin = () => {
  const [token, setToken] = useState("");
  const [playlist, setPlaylist] = useState();
  const [user, setUser] = useState([]);
  const [recent, setRecent] = useState([]);
  const [geners, setGeners] = useState(false);
  const [tracks, setTracks] = useState(false);
  const [final, setFinal] = useState([]);
  const navigate = useNavigate();

  recent.forEach(function (x) {
    final[x] = (final[x] || 0) + 1;
  });

  let genereArray = Object.entries(final);
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

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-follow-modify",
    "user-library-read",
    "user-top-read",
    "user-library-modify",
    "user-follow-read",
    "user-read-playback-position",
    "user-read-playback-state",
    "user-read-recently-played",
    "user-modify-playback-state",
    "user-read-currently-playing",
  ];

  const CLIENT_ID = "f01e78664fc6407e815de229d1616785";
  const REDIRECT_URI = "http://localhost:3000/userLocation";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";


  console.log("recent", recent);
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
