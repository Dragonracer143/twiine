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
      /* if the token is saved then navigate page to this end point*/
      navigate("/userlocation");
    }
    /* Save user token in localstorage to get the data of spotify account */
    setToken(token);
  }, []);

  // appleAuthHelpers.signIn({
  //   authOptions: {
  //     clientId: "com.twine.name",
  //     redirectURI: "https://twine-new.vercel.app/test",
  //     state: "state",
  //     nonce: "nonce",
  //     usePopup: true,
  //     className: "abc",
  //   },
  //   onSuccess: (response) => console.log("respnse",response),
  //   onError: (error) => console.error("erro",error),
  // });
  // const response = appleAuthHelpers.signIn({
  //   authOptions: {
  //     clientId: "com.twine.name",
  //     redirectURI: "https://twine-new.vercel.app/test",
  //     state: "state",
  //     nonce: "nonce",
  //     usePopup: true,
  //     className: "abc",
  //   },
  //   onError: (error) => console.error(error),
  // });

  // if (response) {
  //   console.log(response);
  // } else {
  //   console.error("Error performing apple signin.");
  // }
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
            {/* <button className="btn" type="button"> */}
              {/* <img className="apple_logo" src="./img/AppleLogo.png" />
              Log in with Apple Music */}
              <AppleSignin
                authOptions={{
                  clientId: "com.twine.name",
                  redirectURI: "https://twine-new.vercel.app/userlocation",
                  state: "state",
                  nonce: "nonce",
                  // usePopup: true,
                  className: "abc",
                }}
                onSuccess={(response) => console.log("res", response)}
                onError={(error) => console.error("err", error)}
                buttonExtraChildren="Log in with Apple Music"

              />
              {/* <AppleLogin className="abc" clientId="com.twine.name" responseType="code" redirectURI="https://twine-new.vercel.app/test" /> */}
            {/* </button> */}
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
