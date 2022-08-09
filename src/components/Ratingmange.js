import React, { useEffect, useState } from "react";
import data from "./Place.json";
import { Addplaces } from "../Shared/Services";
import Maindashboard from "./Maindashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Filter } from "@mui/icons-material";
const Ratingmanage = () => {
  const [startData, setStarData] = useState([]);
  const baseUrl = "http://localhost:8000/";
  // const baseUrl = "https://agile-plateau-96207.herokuapp.com/";
  const getALlratingdata = async () => {
    const getstarvar = await axios.get(baseUrl + "getstar").then(data);
    setStarData(getstarvar.data).catch((error) => console.log(error));
  };

  useEffect(() => {
    getALlratingdata();
  }, []);

  const startCountHandler = (val) => {
    let data = startData.filter((x) => x.rating == val);
    if (data) {
      return data.length;
    }
  };

  const avarageRatingCount = () => {
    let oneStar = startCountHandler(1);
    let twoStar = startCountHandler(2);
    let threeStar = startCountHandler(3);
    let fourStar = startCountHandler(4);
    let fiveStar = startCountHandler(5);

    let avarageRating =
      (1 * oneStar +
        2 * twoStar +
        3 * threeStar +
        4 * fourStar +
        5 * fiveStar) /
      startData.length;
    avarageRating = parseFloat(avarageRating).toFixed(1);
    return avarageRating;
  };

  return (
    <>
      <Maindashboard />
      <div className="listing-table list-wrappers">
        <div className="table-card">
          <div className="table-head pb-4 d-flex ">
            <h1>Overall Ratings</h1>
          </div>
          <p>
            Average rating - {avarageRatingCount()}
            <i class="fa fa-star rate" aria-hidden="true"></i>
          </p>
        </div>
      </div>
    </>
  );
};

export default Ratingmanage;
