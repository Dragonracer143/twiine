import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDetailsApi } from "../../Services/Services";
import Geocode from "react-geocode";
import { getDistance, getPreciseDistance } from "geolib";
import CircularIndeterminate from "./Loader";
import useGeolocation from "react-hook-geolocation";
import { toPng } from "html-to-image";
import { useCallback } from "react";
import Instagramstory from "./Instagramstory";

const Musicyoulike = (props) => {
  const [filterdata, setFilterData] = useState();
  const refs = document.getElementById("id");
  const [story, setStory] = useState(false);
  const [notfilterdata, setNofilterdata] = useState();
  const [updatedata, setUpdatedata] = useState();

  Geocode.setApiKey("AIzaSyCLpRelH01xoapkwWD7w4chtFMQvjQPWn4");

  const navigate = useNavigate();

  const getGeners = () => {
    let path = "/Resultbreakdown";
    navigate(path);
  };
  React.useEffect(() => {
    setTimeout(() => {
      getAllDetailsApi()
        .then((res) => {
          let dupdata = [...res.data];
          props.setRest(dupdata);
        })
        .catch((e) => {
          console.log(e);
        });
    }, 3000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      const localData = JSON.parse(localStorage.getItem("filterResturant"));

      setFilterData(localData);
    }, 3000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      const localDatafiler = JSON.parse(localStorage.getItem("Withoutfilter"));

      setNofilterdata(localDatafiler);
    }, 3000);
  }, []);

  useEffect(() => {
    const localDatafilter = localStorage.getItem("unfilterstate");
    const Datafilter = JSON.parse(localStorage.getItem("filterstate"));
    if (localDatafilter) {
      setUpdatedata(localDatafilter);
    } else {
      setUpdatedata(Datafilter);
    }
  });
  const getStories = () => {
    setStory(true);
    // console.log("refs", refs)
  };
  const geolocation = useGeolocation();
  const lattitudeValue = geolocation.latitude;
  const longitudeValue = geolocation.longitude;
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

  useEffect(() => {
    if (story == true) {
      setTimeout(() => {
        onButtonClick();
      }, 1000);
    }
  });
  // console.log("refs", refs)

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
        setTimeout(() => {
          setStory(false);
        }, 1000);
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
          {filterdata?.length >= 0 ? (
            <div className="row cards Musicyoulikes">
              {filterdata?.slice(0, 3).map((ele, key) => (
                <div className="col-12 col-md-4" key={key}>
                  <div className="Musicyoulike_card_blue">
                    <img className="img" src={ele?.image1} />
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
                          {ele.MusicVibe1 ? ele.MusicVibe1 : "Jazz"}{" "}
                        </span>{" "}
                        &nbsp;
                        <span className="gener-name">
                          {ele.MusicVibe2 ? ele.MusicVibe2 : "Pop"}
                        </span>
                      </p>
                    </div>
                    <button className="Moreinfo btn" type="button">
                      <a href={ele.yelpURL} target="_blank">
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
          {notfilterdata?.length >= 0 ? (
            <div className="row cards Musicyoulikes">
              {notfilterdata?.slice(0, 3).map((ele, key) => (
                <div className="col-12 col-md-4" key={key}>
                  <div className="Musicyoulike_card_blue">
                    <img className="img" src={ele?.image1} />
                    <div className="card_content">
                      <p style={{ paddingTop: "1rem" }} className="businnes">
                        {ele?.businessName} <span>{ele?.price}</span>
                      </p>
                      <p>Location : {ele?.city}</p>
                      <p>
                        Vibes :&nbsp;{" "}
                        <span className="gener-name">
                          {" "}
                          {ele.MusicVibe1 ? ele.MusicVibe1 : "Jazz"}{" "}
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

      {story == true ? <p className="download "> ...downloading</p> : null}
      {story == true ? (
        <Instagramstory
          rest={props.rest}
          story={story}
          filterdata={filterdata}
          notfilterdata={notfilterdata}
          updatedata={updatedata}
        />
      ) : null}
    </div>
  );
};

export default Musicyoulike;
