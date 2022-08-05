import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [token, setToken] = useState("");
  const [playlist, setPlaylist] = useState();
  const [user, setUser] = useState([]);
  const [recent, setRecent] = useState([]);

  // console.log("token", token);
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

  const CLIENT_ID = "f8ce2984801049e3be24910f05cacc68";
  const REDIRECT_URI = "http://localhost:3000/logindashboard";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const onGetdata = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setPlaylist(data);
  };
  console.log("Playlist name == ", playlist)

  const getUserdata = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUser(data);
  };

  console.log("all tracks", user);
  const getrecentlyplayed = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      // "https://api.spotify.com/v1/me/player/recently-played",
      // "https://api.spotify.com/v1/me/player/currently-playing",
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRecent(data.items);
  };
  console.log("recent", recent)
  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5">Loign With Spotify</h1>

        <div className="login-setup">
          {!token ? (
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
                "%20"
              )}&response_type=${RESPONSE_TYPE}&show_dialog=true`}
            >
              Login to Spotify
            </a>
          ) : (
            <>
              <div className="logout">
                <button className="btn btn-primary" onClick={logout}>
                  Logout
                </button>
                <br />
                <button
                  className="mt-5 btn-primary"
                  onClick={(e) => onGetdata(e)}
                >
                  {" "}
                  get playlist
                </button>
                <br />

                <button
                  className="mt-5 btn-dark"
                  onClick={(e) => getUserdata(e)}
                >
                  {" "}
                  get User
                </button>
                <br />

                <button
                  className="mt-5 btn-success"
                  onClick={(e) => getrecentlyplayed(e)}
                >
                  {" "}
                  recently played
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
