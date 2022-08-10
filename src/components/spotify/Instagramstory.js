import React from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { spacing } from "@mui/system";

const Instagramstory = () => {
  const data = {
    labels: ["Country", "Blues", "HipHop", "Jazz", "EDM"],
    datasets: [
      {
        label: "slices",
        data: [30, 25, 20, 15, 10],
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
          return context.chart.data.labels[context.dataIndex];
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <div className="Instagramstory">
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
          <div className="col-12 col-md-6">
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
          <div className="col-12 col-md-6">
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
          </div>
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
