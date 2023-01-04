import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { ArcElement } from "chart.js";
import "../../../src/App.css";
import { Chart as ChartJS, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import useGeolocation from "react-hook-geolocation";
import { getDistance } from "geolib";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Instagramstory = (props) => {
  const [genernames, setGenernames] = useState([]);
  const [genervalues, setGenervalues] = useState([]);
  const [playlist, setPlaylist] = useState();
  let token = localStorage.getItem("token");
  const geolocation = useGeolocation();
  let navigate = useNavigate();

  /*This array stores the colors of various genres*/
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
      name: "desi hip hop",
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
      name: "american",
      color: "#DAB762",
    },
    {
      id: 25,
      name: "EDM",
      color: "#030200",
    },
  ];

  let generss = genernames?.slice(0, 6);

  /*if genre color are not matched then it picks the color from below array*/
  let colorss = ["#9ac3c3", "#05e6fd", "#24d58b", "#032416", "#5e5617"];

  /*loops matches the genre name with above array(colorArray) */
  for (let i = 0; i < generss?.length; i++) {
    for (let j = 0; j < colorArray?.length; j++) {
      if (colorArray[j]?.name === generss[i]) {
        colorss[i] = colorArray[j].color;
      }
    }
  }

  /* data variable for shows the genre name in pie chart */

  const filtergener = ["pop", "jazz", "rock", "filmy", "Hip hop"];
  const generSample = [6, 4, 14, 4, 8];
  const data = {
    labels:
      genernames?.length <= 0
        ? filtergener.slice(0, 5)
        : genernames?.slice(0, 5),
    type: "pie",
    indexLabel:
      genernames?.length <= 0
        ? filtergener?.slice(0, 5)
        : genernames?.slice(0, 5),
    indexLabelPlacement: "inside",
    datasets: [
      {
        data: genervalues == "" ? generSample : genervalues?.slice(0, 5),
        backgroundColor: colorss,
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
      tooltip: {
        enabled: false,
      },
      datalabels: {
        formatter: function (value, context) {
          return context.chart.data.labels[context.dataIndex];
        },
        labels: {
          title: {
            font: {
              size: "14",
            },

            color: "white",
          },
        },
        rotation: [0, 20, 19, 20, 77],
      },
    },
  };

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
    let newVal = [];
    for (let i in vall) {
      let counter = 0;
      for (let j in vall) {
        if (!newVal.includes(vall[i]) && vall[i] === vall[j]) {
          counter++;
        }
      }
      newVal.push(vall[i]);
      let counter2 = 0;
      for (let k in newVal) {
        if (newVal[k] === vall[i]) {
          counter2++;
        }
      }
      if (counter2 == 1) {
        newarray.push(new Array(vall[i], counter));
      }
    }

    function compareSecondColumn(a, b) {
      if (a[1] === b[1]) {
        return 0;
      } else {
        return b[1] < a[1] ? -1 : 1;
      }
    }

    newarray.sort(compareSecondColumn);
    let genername = [];

    for (let i = 0; i < newarray.length; i++) {
      const element = newarray[i][0];
      genername.push(element);
    }
    let genervalue = [];
    for (let i = 1; i < newarray.length; i++) {
      const element = newarray[i][1];
      genervalue.push(element);
    }
    setGenernames(genername);
    setGenervalues(genervalue);
  };
  useEffect(() => {
    onGetdata();
  }, []);
  /* get the top 5 songs of user */
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
  const lattitudeValue = geolocation.latitude;
  const longitudeValue = geolocation.longitude;
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

    return dis;
  };
  const [recent, setRecent] = useState([]);
  useEffect(() => {
    onGetrecent();
  }, []);
  const onGetrecent = async (e) => {
    const { data } = await axios
      .get(
        "https://api.spotify.com/v1/me/player/recently-played?offset=0&limit=5",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .catch((err) => {
        console.log(err.response.status);
        if (err?.response?.status == 401) {
          localStorage.clear();
          navigate("/");
        }
      });
    setRecent(data.items);
  };

  return (
    <>
      <div className={props.story == true ? "display-insta" : "hide"}>
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
                <div className="head-title">
                  <p>Your top 5 songs right now</p>
                  <img className="img-fluids" src="./img/Spotify.png"></img>
                </div>{" "}
                {recent?.map((ele, key) => (
                  <a href={ele?.track?.external_urls?.spotify} target="_blank">
                    <div key={key} className="song_one mt-2">
                      <div className="song_no">
                        <p>{key + 1}.</p>
                      </div>
                      <div className="song_detail">
                        <p className="song-name">{ele?.track?.name}</p>
                        <p className="artist">{ele?.track?.artists[0]?.name}</p>
                      </div>
                      <img
                        className="song_img"
                        src={ele?.track?.album?.images[1]?.url}
                      />
                    </div>
                  </a>
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
          <div className="row cards Musicyoulikes insta">
            {props.filterdata.data.slice(0, 3).map((ele, key) => (
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
                    <p>
                      Distance:{" "}
                      {getDistanceFromCurrent(ele?.location?.coordinates)} miles
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Instagramstory;
