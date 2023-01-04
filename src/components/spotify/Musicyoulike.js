import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Geocode from "react-geocode";
import { getDistance } from "geolib";
import CircularIndeterminate from "./Loader";
import useGeolocation from "react-hook-geolocation";
import { toPng } from "html-to-image";
import { useCallback } from "react";
import Instagramstory from "./Instagramstory";
import { baseUrl } from "../../Services/Config";
import ReplayIcon from "@mui/icons-material/Replay";
import axios from "axios";
// const baseUrl = "http://localhost:8000/";
const Musicyoulike = (props) => {
  const [filterdata, setFilterData] = useState({ status: false, data: [] });
  const [userGeners, setGenerData] = useState({ status: false, data: [] });
  const [location, setLocation] = useState({
    status: false,
    latitude: "",
    longitude: "",
  });
  const [showItem, setShowItem] = useState(3);
  const [startItem, setStartItem] = useState(0);
  const refs = document.getElementById("id");
  const [story, setStory] = useState(false);

  const geolocation = useGeolocation();

  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  let datamile = localStorage.getItem("selectedMile");
  useEffect(() => {
    if (!userGeners.status) {
      getGenerslist();
    }
  }, []);

  useEffect(() => {
    if (userGeners.status && !location.status) {
      if (geolocation?.latitude && geolocation?.longitude) {
        setLocation({
          status: true,
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
        });
        getDataByLocation(geolocation?.latitude, geolocation?.longitude);
      } else {
        setLocation({ status: true, latitude: "", longitude: "" });
        getgneredata();
      }
    }
  }, [userGeners]);


  /*Go to Resultbreakdown page */
  const getGeners = () => {
    let path = "/Resultbreakdown";

    navigate(path);
  };
  const getDistanceFromCurrent = (cordinates) => {
    let dis = getDistance(
      {
        latitude: JSON.stringify(location.latitude),
        longitude: JSON.stringify(location.longitude),
      },
      { latitude: cordinates[1], longitude: cordinates[0] }
    );
    dis = (parseFloat(dis) / 1000 / 1.609).toFixed(1);

    return parseFloat(dis).toFixed(1);
  };

  /* get data by location */
  const getDataByLocation = async (latitude, longitude) => {
    const data = await axios
      .get(
        `${baseUrl}filterResturants?lat=${latitude}&long=${longitude}`,

        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        const dupdata = res.data.data;
        let dataArraydistance = dupdata.map((obj) => ({
          ...obj,
          distance: getDistanceFromCurrent(obj.location.coordinates),
        }));
        let filterDataa = [];
        if (datamile) {
          filterDataa = dataArraydistance.filter((ele) => {
            const filterArray = ele.distance <= datamile;
            return filterArray;
          });
        }

        if (filterDataa.length) {
          filterDataa = filterDataa.filter(
            (x) =>
              userGeners.data
                .slice(0, 5)
                .includes(x.MusicVibe2?.toLowerCase()) ||
              userGeners.data.slice(0, 5).includes(x.MusicVibe3?.toLowerCase())
          );
        } else {
          filterDataa = dataArraydistance.filter(
            (x) =>
              userGeners.data
                .slice(0, 5)
                .includes(x.MusicVibe2?.toLowerCase()) ||
              userGeners.data.slice(0, 5).includes(x.MusicVibe3?.toLowerCase())
          );
        }

        if (filterDataa.length)
          return setFilterData({ status: true, data: filterDataa });
        return setFilterData({ status: true, data: dataArraydistance });
      });
  };
  const getgneredata = () => {
    const data = axios
      .get(`${baseUrl}withoutfilter`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        const dupdata = res.data;
        /* condition for checking the user genre with Database genre */
        const data = dupdata.filter(
          (x) =>
            userGeners.data.slice(0, 5).includes(x.MusicVibe2?.toLowerCase()) ||
            userGeners.data.slice(0, 5).includes(x.MusicVibe3?.toLowerCase())
        );

        if (data?.length) {
          return setFilterData({ status: true, data });
        }
        return setFilterData({ status: true, data: dupdata });
      });
  };

  const getGenerslist = async (e) => {
    const { data } = await axios
      .get("https://api.spotify.com/v1/me/top/artists?offset=0&limit=10", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
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
    setGenerData({ status: true, data: genername });
  };

  /* Click function for (share on social media ) button.first run this function then it checks the story state wheather it's true or false, if state is true then onButtonClick function run.*/
  const getStories = () => {
    setStory(true);
    setTimeout(() => {
      onButtonClick();
    }, 3000);
  };

  /* Function for downloading image on click (Share on Social media) Button */
  const onButtonClick = useCallback(() => {
    if (refs === null) {
      return;
    }
    toPng(refs)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "name.png";
        link.href = dataUrl;
        link.click();
        setStory(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refs]);

  return (
    <div className={story == true ? "download-image" : ""}>
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

      {/* {localDatafilter? ( */}
      <>
        {filterdata.data.length ? (
          <div className="row cards Musicyoulikes">
            {filterdata.data?.slice(startItem, showItem).map((ele, key) => (
              <div className="col-12 col-md-4" key={key}>
                <div className="Musicyoulike_card_blue">
                  <img
                    className="img"
                    src={ele?.image1 ? ele?.image1 : ele?.image2}
                  />
                  <div className="card_content">
                    <p style={{ paddingTop: "1rem" }} className="businnes">
                      {ele?.businessName} <span>{ele?.price}</span>
                    </p>
                    {!location.latitude ? (
                      ""
                    ) : (
                      <p>
                        Distance:{" "}
                        {getDistanceFromCurrent(ele?.location?.coordinates)}{" "}
                        miles
                      </p>
                    )}
                    <p>Location : {ele?.city}</p>
                    <p>
                      Vibes :&nbsp;{" "}
                      <span className="gener-name">
                        {" "}
                        {ele?.MusicVibe3 ? ele?.MusicVibe3 : "Jazz"}{" "}
                      </span>{" "}
                      &nbsp;
                      <span className="gener-name">
                        {ele?.MusicVibe2 ? ele?.MusicVibe2 : "Rock"}
                      </span>
                    </p>
                  </div>
                  <button className="Moreinfo btn" type="button">
                    <a href={ele?.yelpURL} target="_blank">
                      see more info
                      <img
                        className="right-arrow"
                        src="./img/right-arrow.png"
                      />
                    </a>
                  </button>
                </div>
              </div>
            ))}
            {filterdata.data.length <= 3 ? (
              ""
            ) : (
              <div className="results_three_btn">
                <button
                  className="btn"
                  type="button"
                  onClick={(e) => {
                    setShowItem(showItem + 3);
                    setStartItem(startItem + 3);
                  }}
                >
                  <ReplayIcon /> Show 3 more results
                </button>
              </div>
            )}
            <div className="share_buttons">
              <button className="btn" type="button" onClick={getGeners}>
                <img className="genere-image" src="./img/31.png" />
                See your genre Breakdown
              </button>
              <button className="btn " type="button" onClick={getStories}>
                <img className="genere-image" src="./img/share.png" />
                Share on social media
              </button>
              <a
                className="btn "
                type="button"
                href="https://forms.gle/gfVL5MjSPxDUTHsw7"
                target="_blank"
              >
                <img className="genere-image" src="./img/rocket.png" />
                Subscribe for product updates
              </a>
            </div>
          </div>
        ) : (
          <CircularIndeterminate />
        )}
      </>
      {/* ) */}

      {story == true ? (
        <div className="download ">
          <CircularIndeterminate />
        </div>
      ) : null}
      <Instagramstory
        rest={props.rest}
        story={story}
        filterdata={filterdata}
      />
    </div>
  );
};

export default Musicyoulike;
