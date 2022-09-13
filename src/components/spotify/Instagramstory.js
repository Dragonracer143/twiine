import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { useCallback } from "react";
import { toPng } from "html-to-image";
import axios from "axios";
import { ArcElement } from "chart.js";
import "../../../src/App.css";
import { Chart as ChartJS, Tooltip, Legend } from "chart.js";
import CircularIndeterminate from "./Loader";
import { useNavigate } from "react-router-dom";
import useGeolocation from "react-hook-geolocation";
import { getDistance, getPreciseDistance } from "geolib";

ChartJS.register(ArcElement, Tooltip, Legend);

const Instagramstory = (props) => {


  const [genernames, setGenernames] = useState([]);
  const [genervalues, setGenervalues] = useState([]);
  const refs = document.getElementById("id");
  const [filterdatas, setFilterDatas] = useState([]);
  let token = localStorage.getItem("token");
  const geolocation = useGeolocation();
  let navigate = useNavigate();
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refs]);
  const colorArray = [
    {
      id: 0,
      name: "Pop",
      color: "#375F68",
    },
    {
      id: 1,
      name: "PoFolk/Acousticp",
      color: "#AC6E5F",
    },
    {
      id: 2,
      name: "Reggae",
      color: "#4D745F",
    },
    {
      id: 3,
      name: "Rock",
      color: "#322421",
    },
    {
      id: 4,
      name: "Classical",
      color: "#C0C9C8",
    },
    {
      id: 5,
      name: "Rap",
      color: "#234465",
    },
    {
      id: 6,
      name: "Hip Hop",
      color: "#98BDC5",
    },
    {
      id: 7,
      name: "Metal",
      color: "#F05745",
    },
    {
      id: 8,
      name: "pakistani hip hop",
      color: "blue",
    },
    {
      id: 9,
      name: "sufi",
      color: "#6f22af",
    },
    {
      id: 10,
      name: "klnkln",
      color: "#8ca754",
    },
    {
      id: 11,
      name: "desi pop",
      color: "#483e1e",
    },
    {
      id: 12,
      name: "ndkjb",
      color: "#42a75d",
    },
    {
      id: 13,
      name: "Easy Listening / Soft Ro",
      color: "#8A5334",
    },
    {
      id: 14,
      name: "K-Pop",
      color: "#DEB0BA",
    },
    {
      id: 15,
      name: "R & B",
      color: "#947700",
    },
    {
      id: 16,
      name: "Alternative",
      color: "#8A8D6E",
    },
    {
      id: 17,
      name: "abdc",
      color: "#D4BCB0",
    },
    {
      id: 18,
      name: "Soul",
      color: "#B27229",
    },
    {
      id: 19,
      name: "Lo-Fi",
      color: "#D0F0C0",
    },
    {
      id: 20,
      name: "Latin",
      color: "#ACA173",
    },
    {
      id: 21,
      name: "Jazz",
      color: "#978287",
    },
    {
      id: 22,
      name: "J-Pop",
      color: "#DAA762",
    },
    {
      id: 23,
      name: "australian pop",
      color: "orange",
    },
    {
      id: 24,
      name: "abs",
      color: "#DAB762",
    },
  ];
  let generss = props?.genernames.slice(0, 6);
  let colorss = ["red", "white", "yellow", "blue", "orange"];
  for (let i = 0; i < generss?.length; i++) {
    for (let j = 0; j < colorArray?.length; j++) {
      if (colorArray[j]?.name === generss[i]) {
        colorss[i]=colorArray[j].color;
      }
    }
  }
  const data = {
    labels: genernames.slice(0, 5),
    indexLabel: genernames.slice(0, 5),
    indexLabelPlacement: "inside",
    datasets: [
      {
        data: genervalues.slice(0, 5),
        backgroundColor:colorss,
        borderColor: "#000",
        display: true,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const [playlist, setPlaylist] = useState();

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
      first.genres.forEach((valdata) => vall.push(valdata));
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

    let genervalue = [];
    for (let i = 1; i < genereArray.length; i++) {
      const element = genereArray[i][1];
      genervalue.push(element);
    }
    setGenernames(genername);
    setGenervalues(genervalue);
  };
  useEffect(() => {
    onGetdata();
  }, []);
  const onGetdata = async (e) => {
    const { data } = await axios
      .get("https://api.spotify.com/v1/me/top/tracks?offset=0&limit=5", {
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
    setPlaylist(data.items);
  };
  useEffect(() => {
    setTimeout(() => {
      const localData = JSON.parse(localStorage.getItem("filterResturant"));

      setFilterDatas(localData);
    }, 3000);
  }, []);
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

    return dis;
  };
  return (
    <>
      <div className={props.story == true ? "display-insta" : ""}>
        <div className="Instagramstory" id="id">
          <img className="twiinevblack_logo" src="./img/twiineblack.png" />

          <div className="download-button"></div>

          <div className="heading">
            Check Out my current{" "}
            <span style={{ color: "#FE3C3C", position: "relative" }}>
              music rotation!
              <img className="img-insta" src="./img/Vector.png"></img>
            </span>
          </div>

          <div className="row results">
            <div className="col-12 col-md-6">
              <div className="right_table">
                <p>Your top 5 songs right now</p>
                {playlist?.map((ele, key) => (
                  <div key={key} className="song_one mt-2">
                    <div className="song_no">
                      <p>{key + 1}.</p>
                    </div>
                    <div className="song_detail">
                      <p className="song-name">{ele?.name}</p>
                      <p className="artist">{ele?.artists[0]?.name}</p>
                    </div>
                    <img
                      className="song_img"
                      src={ele?.album?.images[1]?.url}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="map">
                <div className="leftchart">
                  <Pie data={data} options={options}></Pie>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            Twine helped me decide where to eat based on{" "}
            <span style={{ color: "#FE3C3C", position: "relative" }}>
              my music taste
              <img className="Location_Vector_logo" src="./img/Vector.png" />
            </span>
            ,
          </div>
          {props.updatedata == 0 ? (
            <>
              <div className="row cards Musicyoulikes insta">
                {props?.filterdata?.slice(0, 3).map((ele, key) => (
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
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="row cards insta">
                {props?.notfilterdata?.slice(0, 3).map((ele, key) => (
                  <div className="col-12 col-md-4" key={key}>
                    <div className="Musicyoulike_card_blue">
                      <img className="img" src={ele?.image1} />
                      <div className="card_content">
                        <p style={{ paddingTop: "1rem" }} className="businnes">
                          {ele?.businessName} <span>{ele?.price}</span>
                        </p>
                        <p className="vives">
                          Vibes zncm,n :&nbsp;{" "}
                          <span className="gener-name">Jazz</span> &nbsp;
                          <span className="gener-name">Pop</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}{" "}
              </div>{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Instagramstory;
