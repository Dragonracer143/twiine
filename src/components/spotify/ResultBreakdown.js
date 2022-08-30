import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { spacing } from "@mui/system";
import Chart from "chart.js/auto";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResultBreakdown = (props) => {
  const [playlist, setPlaylist] = useState();
  let token = localStorage.getItem("token");

  let navigate = useNavigate();

  const data = {
    labels: props?.genernames.slice(0, 6),
    indexLabel: props?.genernames.slice(0, 6),
    datasets: [
      {
        data: props?.genervalues.slice(0, 6),
        backgroundColor: [
          "rgb(201, 134, 73)",
          "rgb(70, 136, 236)",
          "rgb(255, 154, 98)",
          "rgb(217, 155, 255)",
          "rgb(228, 169, 81)",
        ],
        hoverOffset: 8,
        spacing: 18,
        borderRadius: 18,
        borderColor: "#000",
        borderWidth: 1,
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
        <div className="heading mb-4">We saw that you like:</div>

        <div className="row results">
          <div className="col-12 col-md-6">
            <div className="map">
              <div className="leftchart">
                <Doughnut data={data} options={options}></Doughnut>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="right_table">
              <p>Your current top 5:</p>
              {playlist?.map((ele, key) => (
                <div key={key} className="song_one mt-2">
                  <img className="song_img" src={ele?.album?.images[1]?.url} />
                  <div className="song_detail">
                    <p>{ele?.name}</p>
                    <p>{ele?.artists[0]?.name}</p>
                  </div>
                  <div className="song_no">
                    <p>#{key + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="Go_Back btn" onClick={goBack} type="button">
          Go Back
        </button>
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default ResultBreakdown;
