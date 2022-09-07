import React, { useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArcElement } from "chart.js";
import { Chart as ChartJS,  Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
const ResultBreakdown = (props) => {
  const [playlist, setPlaylist] = useState();
  let token = localStorage.getItem("token");

  let navigate = useNavigate();

  const data = {
    labels: props?.genernames.slice(0, 5),
    indexLabel: props?.genernames.slice(0, 5),
    indexLabelPlacement: "inside",
    datasets: [
      {
        data: props?.genervalues.slice(0, 5),
        backgroundColor: [
          "#AC6E5F",
          "#978287",
          "#030200",
          "#322421",
          "#D4BCB0",
        ],
        hoverOffset: 8,
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


  const config = {
    type: "doughnut",
    data: data,
  };

  useEffect(() => {
    getGenerslist();
  }, []);
  const getGenerslist = async (e) => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?offset=0&limit=10",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    let genervalue = [];
    for (let i = 1; i < genereArray.length; i++) {
      const element = genereArray[i][1];
      genervalue.push(element);
    }
    props?.setGenernames(genername);
    props?.setGenervalues(genervalue);
  };

  useEffect(() => {
    onGetdata();
  }, []);
  const onGetdata = async (e) => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?offset=0&limit=5",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setPlaylist(data.items);
  };

  const goBack = () => {
    let path = "/musicyoulike";
    navigate(path);
  };

  return (
    <>
      <div className="ResultBreakdown" id="id">
        <img className="twiinevblack_logo" src="./img/twiineblack.png" />
        <div className="heading mb-4">
          *drum roll* Here's your{" "}
          <span className="img-result-down">
            genere breakdown:{" "}
            <img className="img-result" src="./img/Vector.png"></img>
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
                  <img className="song_img" src={ele?.album?.images[1]?.url} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="map">
              <div className="leftchart">
                <Pie data={data}  options={options} ></Pie>
             
              </div>
            </div>
          </div>
        </div>
        <div className="go-back-share">
          <button className="Go_Back btn" onClick={goBack} type="button">
            <img className="back" src="./img/back-arrow.png" />
            Go Back
          </button>
          <button className="Go_Back btn" onClick={goBack} type="button">
            <img className="genere-image" src="./img/share.png" />
            Share on social media{" "}
          </button>
        </div>
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default ResultBreakdown;
