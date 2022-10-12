import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Geocode from "react-geocode";
import { getDistance } from "geolib";
import CircularIndeterminate from "../spotify/Loader";
import useGeolocation from "react-hook-geolocation";
import { toPng } from "html-to-image";
import { useCallback } from "react";
import Appleinsta from "./Appleinsta";
import { baseUrl } from "../../Services/Config";
import ReplayIcon from "@mui/icons-material/Replay";
import axios from "axios";
// const baseUrl = "http://localhost:8000/";
const Applemuicyoulike = (props) => {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  const geolocation = useGeolocation();
  const [filterdata, setFilterData] = useState();


  const [showItem, setShowItem] = useState(3);
  const [startItem, setStartItem] = useState(0);
  const [notfilterdata, setNofilterdata] = useState();
  const refs = document.getElementById("id");

  const [story, setStory] = useState(false);
  const [updatedata, setUpdatedata] = useState();
  const [usergeners, setUsergeners] = useState([]);
  const [getmile, setGetmile] = useState("7859.3");
  let token = localStorage.getItem("token");
  const lattitudeValue = geolocation.latitude;
  const longitudeValue = geolocation.longitude;
  const navigate = useNavigate();

  /*Go to Resultbreakdown page */
  const getGeners = () => {
    let path = "/Appleresult";
    navigate(path);
  };
  useEffect(() => {
    getDataBytLocation();
  }, [usergeners, getmile]);

  useEffect(() => {
    let datamile = localStorage.getItem("selectedMile");
    setGetmile(datamile);
  }, []);


 /* Function for get distance between to lattitude and longitude */
  const getDistanceFromCurrent = (cordinates) => {
    let dis = getDistance(
      {
        latitude: JSON.stringify(lattitudeValue),
        longitude: JSON.stringify(longitudeValue),
      },
      { latitude: cordinates[1], longitude: cordinates[0] }
    );
    dis = (parseFloat(dis) / 1000 / 1.609).toFixed(1);

    return parseFloat(dis).toFixed(1);
  };

  /* get data by location */
  const getDataBytLocation = async () => {
    const data = await axios
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

        let dataArraydistance = dupdata.map((obj) => ({
          ...obj,
          distance: getDistanceFromCurrent(obj.location.coordinates),
        }));
        let test = [];
        let dbmile = dataArraydistance?.map((ele) => {
          return ele.distance;
        });
        const Filterbymiles = dataArraydistance.filter((ele) => {
          const filterArray = ele.distance <= getmile;
          return filterArray;
        });
        if (Filterbymiles ?.length!=0)
        {
        if (usergeners?.length != 0) {
          /* get data by matching the geners*/
          usergeners.forEach((element) => {
            const findData = Filterbymiles.filter(
              (x) =>
                x.MusicVibe2 == element.toLowerCase() ||
                x.MusicVibe3 == element.toLowerCase()
            );
            if (findData?.length != 0) {
              test.push(...findData);
            } else {
              test.push(...Filterbymiles.reverse());
            }
            let dupChars = getUniqueListBy(test, "businessName");

            setFilterData(test);
          });
        } else {
          /* if a new user (does not have music list to identify genere, following data will be visible)*/
          setFilterData(Filterbymiles.reverse());
        }
      }
      else{
        setFilterData(dupdata)
      }

      });
  };


  /* function for not getting duplicate data*/
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }


  /* useEffect for to get (updatedata) state value. if value is 0 it renders the data by location otherwise it render data by generes*/
  useEffect(() => {
    const localDatafilter = localStorage.getItem("unfilterstate");
    const Datafilter = JSON.parse(localStorage.getItem("filterstate"));
    if (localDatafilter) {
      setUpdatedata(localDatafilter);
    } else {
      setUpdatedata(Datafilter);
    }
  });

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
  let appletoken = localStorage.getItem("music-user_token");

  const onGetdata = async (e) => {
    axios
      .get("https://api.music.apple.com/v1/me/recent/played/tracks", {
        headers: {
          "Access-Control-Allow-Origin": "https://twine-new.vercel.app/",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          Authorization:
            "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllIS0xLSk5ZRDMifQ.eyJpYXQiOjE2NjUxNjg0MTIsImV4cCI6MTY4MDcyMDQxMiwiaXNzIjoiTllMVDdCVzg3UiJ9.qM3UV0c7KZiEXMVGkEWXgkEiEcP52WiMz_z71zMD5vnX6V1zOnZJl0jN9VH_4niJnzbYV_s9MhvWwmkC0h29bw",
          "Music-User-Token": `${appletoken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        let array = [];
        response.data.data.forEach((element) => {
          array.push(element.attributes.albumName);
        });

        let genernamesapple = [];
        response.data.data.forEach((element) => {
          genernamesapple.push(element.attributes.genreNames);
        });
        var newArr = [];
        for (var i = 0; i < genernamesapple.length; i++) {
          newArr = newArr.concat(genernamesapple[i]);
        }
        let counts = {};

        for (let i = 0; i < newArr.length; i++) {
          if (counts[newArr[i]]) {
            counts[newArr[i]] += 1;
          } else {
            counts[newArr[i]] = 1;
          }
        }
      var  keysSorted = Object.keys(counts).sort(function(a,b){return counts[b]-counts[a]})
      setUsergeners(keysSorted)
      })
      .catch((err) => {
        console.log("eroor", err);
      });
  };

  useEffect(() => {
    onGetdata();
  }, []);
  useEffect(() => {
    getDataByGener();
  }, [usergeners]);
  const getDataByGener = () => {
    const data = axios
      .get(`${baseUrl}withoutfilter`, {
        headers: {
          "Access-Control-Allow-Origin": "https://twine-new.vercel.app/",
        },
      })
      .then((res) => {
        const dupdata = res.data;
        let test = [];
        /* condition for checking the user genre with Database genre */
        if (usergeners?.length > 0) {
          usergeners.forEach((element) => {
            const findData = dupdata.filter(
              (x) => x.MusicVibe2 == element || x.MusicVibe3 == element
            );
            /*if user genre matches then goes to if condition otherwise it goes in else condition */
            if (findData?.length != 0) {
              test.push(...findData);
              let dupChars = getUniqueListBy(test, "businessName");
              setNofilterdata(dupChars);
            } else {
              /* if gnere are not matched its show the random data from database*/
              test.push(...dupdata);
              setNofilterdata(test);
            }
          });
          /*if user have new login in spotify and it has no gnere then this conditon run.*/
        } else {
          setNofilterdata(test);
        }
      });
  };

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

      {updatedata == 0 ? (
        <>
          {filterdata?.length > 0 ? (
            <div className="row cards Musicyoulikes">
              {filterdata?.slice(startItem, showItem).map((ele, key) => (
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
                      <p>
                        Distance:{" "}
                        {getDistanceFromCurrent(ele?.location?.coordinates)}{" "}
                        miles
                      </p>
                      <p>Location : {ele?.city}</p>
                      <p>
                        Vibes :&nbsp;{" "}
                        <span className="gener-name">
                          {" "}
                          {ele?.MusicVibe3 ? ele?.MusicVibe3 : "Jazz"}{" "}
                        </span>{" "}
                        &nbsp;
                        <span className="gener-name">
                          {ele?.MusicVibe2 ? ele?.MusicVibe2 : "Pop"}
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
      ) : (
        <>
          {notfilterdata?.length > 0 ? (
            <div className="row cards Musicyoulikes">
              {notfilterdata?.slice(startItem, showItem).map((ele, key) => (
                <div className="col-12 col-md-4" key={key}>
                  <div className="Musicyoulike_card_blue">
                    <img
                      className="img"
                      src={ele?.image1 ? ele?.image3 : ele?.image4}
                    />
                    <div className="card_content">
                      <p style={{ paddingTop: "1rem" }} className="businnes">
                        {ele?.businessName} <span>{ele?.price}</span>
                      </p>
                      <p>Location : {ele?.city}</p>
                      <p>
                        Vibes :&nbsp;{" "}
                        <span className="gener-name">
                          {" "}
                          {ele.MusicVibe3 ? ele.MusicVibe3 : "Jazz"}{" "}
                        </span>{" "}
                        &nbsp;
                        <span className="gener-name">
                          {ele.MusicVibe2 ? ele.MusicVibe2 : "Pop"}
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
      )}

      {story == true ? (
        <div className="download ">
          <CircularIndeterminate />
        </div>
      ) : null}
      <Appleinsta
        rest={props.rest}
        story={story}
        vivek="dbjkb"
        filterdata={filterdata}
        notfilterdata={notfilterdata}
        updatedata={updatedata}
        test={"sdsdsdsd"}
      />
    </div>
  );
};

export default Applemuicyoulike;
