import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { spacing } from "@mui/system";
import { useCallback } from "react";
import { toPng } from "html-to-image";
import axios from "axios";
const Instagramstory = (props) => {
  const [genernames, setGenernames] = useState([]);
  const [genervalues, setGenervalues] = useState([]);
  const refs = document.getElementById("id");
  let token = localStorage.getItem("token");

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
    labels: genernames.slice(0, 6),
    indexLabel: genernames.slice(0, 6),
    datasets: [
      {
        data: genervalues.slice(0, 6),
        backgroundColor: [
          "rgb(201, 134, 73)",
          "rgb(70, 136, 236)",
          "rgb(255, 154, 98)",
          "rgb(217, 155, 255)",
          "rgb(228, 169, 81)",
        ],
        hoverOffset: 8,
        spacing: 20,
        borderRadius: 18,
        borderColor: "#000",
        borderWidth: 1,
      },
    ],

  };

  const options = {
    plugins: {
      datalabels: {
        formatter: function (value, context) {
          return context?.chart?.data?.labels[context.dataIndex];
        },
      },
      legend: {
        display: false,
      },
    },
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
        console.log("d",i)
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
  return (
    <>
      <div className="Instagramstory" id="id">
        <div className="download-button">
          <i
            onClick={onButtonClick}
            className="fa fa-download"
            aria-hidden="true"
          ></i>
        </div>

        <div className="heading">
          My <span style={{ color: "#FE3C3C" }}>music</span> Breakdown:
        </div>

        <div className="chart">
          <Doughnut data={data} options={options} />
        </div>
        <div className="content">
          Based on my <span style={{ color: "#FE3C3C" }}>music taste</span>,
          twiine recommended me to visit:
        </div>

        <div className="row cards mt-4 mb-5">
          {props?.rest?.slice(0, 3).map((ele) => (
            <div className="col-12 col-md-6 mt-5">
              <div className="Instagramstory_card_blue">
                <img className="img" src={ele?.image2} />
                <div className="card_content">
                  <p style={{ paddingTop: "1rem" }}>{ele?.businessName}</p>
                  <p>{ele?.city}</p>
                  <p>
                    Vibes: <span>{ele?.vibe1} </span> &nbsp;
                    <span>{ele?.vibe2}</span>&nbsp;<span>{ele?.vibe3}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* <div className="col-12 col-md-6">
            <div className="Instagramstory_card_blue">
              <img className="img" src="./img/dummy_card.png" />
              <div className="card_content">
                <p style={{ paddingTop: "1rem" }}>The American Bar $$</p>
                <p>Distance: 13.2 mi</p>
                <p>Location: Los Angeles, CA</p>
                <p>
                  Vibes: <span>Country </span>
                  <span>Blues</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-4">
            <div className="Instagramstory_card_blue">
              <img className="img" src="./img/dummy_card.png" />
              <div className="card_content">
                <p style={{ paddingTop: "1rem" }}>The American Bar $$</p>
                <p>Distance: 13.2 mi</p>
                <p>Location: Los Angeles, CA</p>
                <p>
                  Vibes: <span>Country </span>
                  <span>Blues</span>
                </p>
              </div>
            </div>
          </div> */}
        </div>

        <div className="powerby_btn">
          <button className="poweredby_btn btn" type="button">
            Powered by: <img src="./img/twiineblack.png" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Instagramstory;
