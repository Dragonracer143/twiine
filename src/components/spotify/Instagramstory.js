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

ChartJS.register(ArcElement, Tooltip, Legend);

const Instagramstory = (props) => {
  const [genernames, setGenernames] = useState([]);
  const [genervalues, setGenervalues] = useState([]);
  const refs = document.getElementById("id");
  let token = localStorage.getItem("token");
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
  const data = {
    labels: genernames.slice(0, 5),
    indexLabel: genernames.slice(0, 5),
    indexLabelPlacement: "inside",
    datasets: [
      {
        data:   genervalues.slice(0, 5),
        backgroundColor: [
          "#AC6E5F",
          "#978287",
          "#030200",
          "#322421",
          "#D4BCB0",
        ],
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
  return (
    <>
      {playlist?.length !== 0 ? (
        <div className="Instagramstory" id="id">
          <img className="twiinevblack_logo" src="./img/twiineblack.png" />

          <div className="download-button">
            <i
              onClick={onButtonClick}
              className="fa fa-download"
              aria-hidden="true"
            ></i>
          </div>

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

          <div className="row cards insta">
            {props?.rest?.slice(0, 3).map((ele, key) => (
              <div className="col-12 col-md-4" key={key}>
                <div className="Musicyoulike_card_blue">
                  <img className="img" src={ele?.image1} />
                  <div className="card_content">
                    <p style={{ paddingTop: "1rem" }} className="businnes">
                      {ele?.businessName} <span>{ele?.price}</span>
                    </p>
                    <p className="vives">
                      Vibes :&nbsp; <span className="gener-name">Jazz</span>{" "}
                      &nbsp;
                      <span className="gener-name">Pop</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}{" "}
          </div>
        </div>
      ) : (
        <CircularIndeterminate />
      )}
    </>
  );
};

export default Instagramstory;
