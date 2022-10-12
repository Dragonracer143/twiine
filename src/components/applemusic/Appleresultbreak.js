import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArcElement } from "chart.js";
import { Chart as ChartJS, Tooltip, Legend } from "chart.js";
import CircularIndeterminate from "../spotify/Loader";
import Appleresultbreakstory from '../applemusic/Appleresultbreakstory'
import { toPng } from "html-to-image";
import { useCallback } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
const AppleResultBreak = (props) => {
  const refs = document.getElementById("id");
  const [playlist, setPlaylist] = useState();
  const [updata, setUpdata] = useState();
  const [instagram, setInstagram] = useState(false);
  let token = localStorage.getItem("token");
  const [genernames, setGenernames] = useState([]);
  const [genervalues, setGenervalues] = useState([])

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
      name: "abs",
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
  const data = {
    labels: genernames?.slice(0, 5),
    type: "pie",
    indexLabel: genernames?.slice(0, 5),
    indexLabelPlacement: "inside",
    indexLabelFontSize: 15,
    indexLabelMaxWidth: 53,
    datasets: [
      {
        data: genervalues?.slice(0,5),
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

  /* This useeffect the get the value from localstorage to shows actual data */
  useEffect(() => {
    const localDatafilter = localStorage.getItem("unfilterstate");
    const Datafilter = JSON.parse(localStorage.getItem("filterstate"));
    if (localDatafilter) {
      setUpdata(localDatafilter);
    } else {
      setUpdata(Datafilter);
    }
  });

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

        setPlaylist(response.data.data);

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
        let values = Object.values(counts);
        values.sort(function(a, b){return b-a});
        setGenervalues(values)
        var keysSorted = Object.keys(counts).sort(function (a, b) {
          return counts[b] - counts[a];
        });
        setGenernames(keysSorted);
      })
      .catch((err) => {
        console.log("eroor", err);
      });
  };

  useEffect(() => {
    onGetdata();
  }, []);
  /*Back to musicyoulike page */
  const goBack = () => {
    let path = "/likemusic";
    navigate(path);
  };

  /* shareOnsocial button for downlod the image */
  const shareOnsocial = () => {
    setInstagram(true);
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
        setInstagram(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refs]);
console.log("playlist", playlist)
  return (
    <>
      <div className={instagram == true ? "download-image" : ""}>
        <div className="ResultBreakdown">
          <img className="twiinevblack_logo" src="./img/twiineblack.png" />
          <div className="heading mb-4">
            *drum roll* Here's your{" "}
            <span className="img-result-down">
              genre breakdown:{" "}
              <img className="img-result" src="./img/Vector.png"></img>
            </span>
          </div>
          {playlist?.length !== 0 ? (
            <div className="row results">
              <div className="col-12 col-md-6">
                <div className="right_table">
                <div className="head-title">
                  <p>Your top 5 songs right now</p>
                  <img className="img-flui" src="./img/applemusics.png"></img>
                </div>                    {playlist?.slice(0,5)?.map((ele, key) => (
                    <a href={ele?.attributes?.url} target="_blank">
                    <div key={key} className="song_one mt-2">
                      <div className="song_no">
                        <p>{key + 1}.</p>
                      </div>
                      <div className="song_detail">
                        <p className="song-name">{ele?.attributes?.name}</p>
                        <p className="artist">{ele?.attributes?.artistName}</p>
                      </div>
                      <img
                        className="song_img"
                        src={ele?.attributes?.artwork?.url.replace("{w}x{h}bb.jpg", "/270x270bb-60.jpg")}
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
          ) : (
            <CircularIndeterminate />
          )}

          <div className="go-back-share">
            <button className="Go_Back btn" onClick={goBack} type="button">
              <img className="back" src="./img/back-arrow.png" />
              Go Back
            </button>
            <button
              className="Go_Back btn"
              onClick={shareOnsocial}
              type="button"
            >
              <img className="genere-image" src="./img/share.png" />
              Share on social media{" "}
            </button>
          </div>
          <br />
          <br />
          <br />
        </div>
        {instagram == true ? (
          <div className="download">
            <CircularIndeterminate />
          </div>
        ) : null}

        <Appleresultbreakstory instagram={instagram} updata={updata} />
      </div>
    </>
  );
};

export default AppleResultBreak;
