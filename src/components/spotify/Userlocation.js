import React, { useEffect, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PowerInputSharp } from "@mui/icons-material";
import { baseUrl } from "../../Services/Config";
const Userlocation = (props) => {
  const geolocation = useGeolocation();
  const lattitudeValue = geolocation.latitude;
  const longitudeValue = geolocation.longitude;
  const [musicvibe, setMusicvibe] = useState([]);
  let token = localStorage.getItem("token");

  const navigate = useNavigate();
  const getDataBytLocation = () => {
    let path = `/musicyoulike`;
    // const baseUrl = "http://localhost:8000/";
    const data = axios
      .get(
        `${baseUrl}filterResturants?lat=${lattitudeValue}&long=${longitudeValue}`,

        {
          headers: {
            "Access-Control-Allow-Origin": "https://twine-new.vercel.app/",
          },
        }
      )
      .then((res) => {
        const dupdata = res.data.data;

        let test = [];
        musicvibe.forEach((element) => {
          const findData = dupdata.filter(
            (x) =>
              x.MusicVibe1.toLowerCase() == element.toLowerCase() ||
              x.MusicVibe2.toLowerCase() == element.toLowerCase()
          );
          test.push(...findData);
        });
        let dupChars = getUniqueListBy(test, "businessName");

        localStorage.setItem("filterResturant", JSON.stringify(dupChars));
      });
    props.setRandomdata("0");

    localStorage.setItem("filterstate", "0");

    navigate(path);
  };

  const getDataByGener = () => {
    let path = `/musicyoulike`;
    // const baseUrl = "http://localhost:8000/";
    const data = axios.get(`${baseUrl}withoutfilter`).then((res) => {
      const dupdata = res.data;
      let test = [];
      musicvibe.forEach((element) => {
        const findData = dupdata.filter(
          (x) =>
            x.MusicVibe1?.toLowerCase() == element?.toLowerCase() ||
            x.MusicVibe2?.toLowerCase() == element?.toLowerCase()
        );
        test.push(...findData);
      });
      let dupChars = getUniqueListBy(test, "businessName");

      localStorage.setItem("Withoutfilter", JSON.stringify(dupChars));
    });
    props.setRandomdata("1");
    navigate(path);
    localStorage.setItem("filterstate","1");

  };

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  useEffect(() => {
    getGenerslist();
  }, []);
  const getGenerslist = async (e) => {
    const { data } = await axios
      .get("https://api.spotify.com/v1/me/top/artists?offset=0&limit=10", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err?.response?.status == 401) {
          localStorage.clear();
          navigate("/");
        }
      });
    let vall = [];
    data.items.map((first) => {
      first.genres.forEach((valdata) => {
        vall.push(valdata);
      });
    });

    let newarray = [];
    vall.forEach(function (x) {
      newarray[x] = (newarray[x] || 0) + 1;
    });
    let genereArray = Object.entries(newarray);
    function compareSecondColumn(a, b) {
      if (a[1] === b[1]) {
        return 0;
      } else {
        return b[1] < a[1] ? -1 : 1;
      }
    }

    genereArray.sort(compareSecondColumn);
    let genername = [];

    for (let i = 0; i < genereArray.length; i++) {
      const element = genereArray[i][0];
      genername.push(element);
    }
    setMusicvibe(genername);
  };
  const getNotbynear = () => {
    let path = `/musicyoulike`;
    navigate(path);
    props.setRandomdata("1");
  };

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
            <button className="btn" type="button" onClick={getDataBytLocation}>
              yes, please!
            </button>
          </div>
          <div className="no_btn">
            <button className="btn" type="button" onClick={getDataByGener}>
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
