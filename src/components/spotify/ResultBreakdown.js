import React from "react";
import { Doughnut } from "react-chartjs-2";
import { spacing } from "@mui/system";
import Chart from "chart.js/auto";


const ResultBreakdown = () => {
  const data = {
    labels: ["Country", "Blues", "HipHop","Jazz","EDM"],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
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
      },
    ],
  };
  const config = {
    type: "doughnut",
    data: data,
    
  };
  return (
    <>
      <div className="ResultBreakdown">
        <img className="twiinevblack_logo" src="./img/twiineblack.png" />
        <div className="heading mb-4">We saw that you like:</div>

        <div className="row results">
          <div className="col-12 col-md-6">
            <div className="map">
              <div className="leftchart">
                <Doughnut data={data} />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="right_table">
              <p>Your current top 5:</p>
              <div className="song_one">
                <img className="song_img" src="./img/song_one.png" />
                <div className="song_detail">
                  <p>She Thinks My Tractor’s Sexy</p>
                  <p>Kenny Chesney</p>
                </div>
                <div className="song_no"><p>#1</p></div>
              </div>
              <div className="song_one mt-2">
                <img className="song_img" src="./img/song_one.png" />
                <div className="song_detail">
                  <p>Heartbreak Anniversary</p>
                  <p>Giveon</p>
                </div>
                <div className="song_no"><p>#2</p></div>
              </div>
              <div className="song_one mt-2">
                <img className="song_img" src="./img/song_one.png" />
                <div className="song_detail">
                  <p>Strange Fruit</p>
                  <p>Billie Holiday</p>
                </div>
                <div className="song_no"><p>#3</p></div>
              </div>
              <div className="song_one mt-2">
                <img className="song_img" src="./img/song_one.png" />
                <div className="song_detail">
                  <p>Clarity</p>
                  <p>Zedd</p>
                </div>
                <div className="song_no"><p>#4</p></div>
              </div>
              <div className="song_one mt-2">
                <img className="song_img" src="./img/song_one.png" />
                <div className="song_detail">
                  <p>The Message</p>
                  <p>Grandmaster Flash</p>
                </div>
                <div className="song_no"><p>#5</p></div>
              </div>
            </div>
          </div>
        </div>

        <button class="Go_Back btn" type="button">Go Back</button>

      </div>
    </>
  );
};

export default ResultBreakdown;
