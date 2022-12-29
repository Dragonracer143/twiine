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
  const geolocation = useGeolocation();
  const [lattitudeValue, setLattitudeValue] = useState("");
  const [longitudeValue, setLongitudeValue] = useState("");

  const [when, setWhen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (geolocation?.latitude != null && geolocation?.longitude != null) {
      setLattitudeValue(geolocation.latitude);
      setLongitudeValue(geolocation.longitude);
    } else if (geolocation?.error?.code) {
      setLattitudeValue(null);
      setLongitudeValue(null);
    }
  }, [geolocation])

  /*Go to Resultbreakdown page */
  const getGeners = () => {
    let path = "/Resultbreakdown";
    navigate(path);
  };
  useEffect(() => {
    if (lattitudeValue == null && longitudeValue == null) {
      getDatawithoutlocation()
    } else {
      getDataBytLocation();
    }
  }, [usergeners, getmile]);
  useEffect(() => {
    getDataByGener();
  }, [usergeners]);
  useEffect(() => {
    let datamile = localStorage.getItem("selectedMile");
    setGetmile(datamile);
  }, []);
  // useEffect(()=>{
  //   getDatawithoutlocation()
  // },[usergeners, getmile])


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

  const getDatawithoutlocation = async () => {
    const data = await axios.get(
      `${baseUrl}filterResturants?lat=37.229564&long=-120.047533
    `,

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
        if (Filterbymiles?.length != 0) {
          if (usergeners?.length != 0) {
            /* get data by matching the geners*/
            usergeners.forEach((element) => {
              const findData = Filterbymiles.filter(
                (x) =>
                  x.MusicVibe1== element.toLowerCase() ||
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
        else {
          setFilterData(dupdata)
        }

      });


  }

  /* get data by location */
  const getDataBytLocation = async () => {

    const data = await axios.get(
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
        if (Filterbymiles?.length != 0) {
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
        else {
          setFilterData(dupdata.reverse())
        }

      });


  };

  /* get data without location matching genres names*/
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
              /* if gnere are not match its show the random data from database*/
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

  /* function for not getting duplicate data*/
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  useEffect(() => {
    getGenerslist();
  }, []);
  /* This function is used for to get the gneres of user */
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
    setUsergeners(genername);
  };
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
                          {ele.MusicVibe3 ? ele.MusicVibe3 : usergeners}{" "}
                        </span>{" "}
                        &nbsp;
                        <span className="gener-name">
                          {ele.MusicVibe2 ? ele.MusicVibe2 : usergeners}
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
      <Instagramstory
        rest={props.rest}
        story={story}
        filterdata={filterdata}
        notfilterdata={notfilterdata}
        updatedata={updatedata}
      />
    </div>
  );
};

export default Musicyoulike;
