import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [token, setToken] = useState("");
  const [playlist, setPlaylist] = useState();
  const [user, setUser] = useState([]);
  const [recent, setRecent] = useState([]);
  const [geners, setGeners] = useState(false);
  const [tracks, setTracks] = useState(false);
  const [final, setFinal] = useState([]);

  recent.forEach(function (x) {
    final[x] = (final[x] || 0) + 1;
  });

  let genereArray = Object.entries(final);
  console.log("sddsdsd",genereArray);
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
  const REDIRECT_URI = "http://localhost:3000/logindashboard";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const onGetdata = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?offset=0&limit=5",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setPlaylist(data.items);
    setTracks(true);
  };
  // console.log("Top Tracks", playlist);

  useEffect(() => {
    getrecentlyplayed();
  }, []);
  const getrecentlyplayed = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?offset=0&limit=10",
      // "https://api.spotify.com/v1/me/tracks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let vall = [];
    data.items.map((first) => {
      first.genres.forEach((valdata) => vall.push(valdata));
    });
    console.log("vall", vall);
    setRecent(vall);
    setGeners(true);
  };

  console.log("recent", recent);
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
                  Top Tracks
                </button>
                {tracks ? (
                  <>
                    <br />
                    <br />
                    <br />

                    <h1>Your Current Top 5  Songs: </h1>

                    {playlist.map((item, key) => (
                      <>
                        <p key={key}>
                          song name - {item.name} By {item.artists[0].name}
                        </p>
                      </>
                    ))}
                  </>
                ) : null}
                <br />

                <br />

                <button
                  className="mt-5 btn-success"
                  onClick={(e) => getrecentlyplayed(e)}
                >
                  {" "}
                  Top geners
                </button>
                <p>{final}</p>
                {geners ? (
                  <>
                    <h1>Your Current Top Geners </h1>
                    <p>
                      {genereArray.slice(0,4).map((item) => (
                        <p>{item.join(" = ")}</p>
                      ))}
                    </p>
                  </>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
