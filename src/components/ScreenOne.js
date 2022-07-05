import React from "react";
import data from "./City.json";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllDetailsApi } from "../Shared/Services";

const ScreenOne = (props) => {
  let navigate = useNavigate();
  const [dataToShow, setDataToShow] = useState([]);
  const [loaderState, setLoaderState] = useState(true);
  const handleClick = (e) => {
    if (!props.city) {
      alert("Select city");
      return;
    }
    props.setProcess(props.process + 1);
  };

  const cityName = (e) => {
    props.setCity(e.target.value);
  };
  React.useEffect(() => {
    console.log(props.city);
  }, [props.city]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [vall, setVall] = useState([]);
  const [address, setAddress] = useState({
    city: null,
    state: null
  })
  function check(state, val = vall) {
    let test = [];
    val.forEach((des) => {
      if (des.state == state) {
        test.push(des);
      }
    });
    setAddress((address)=>{
      return{
        ...address,
        state:state
      }
    })
    let dupChars = getUniqueListBy(test, "city");
    setCity(dupChars);
  }
const selectCity = (value) =>{
  setAddress((address)=>{
    return{
      ...address,
    city:value
    }
  })
} 

  React.useEffect(() => {
    // let ac_token = localStorage.getItem("access_token");
    // if (!ac_token) {
    //   navigate("/admin");
    // } else {
      getAllDetailsApi()
        .then((res) => {
          setDataToShow([...res.data]);
          let dupState = getUniqueListBy(res.data, "state");
          let dupCity = getUniqueListBy(res.data, "city");
          setVall(res.data)
          setState(dupState);
          setCity(dupCity);
          setLoaderState(false);
        })
        .catch((e) => {
          console.log(e);
          navigate("/admin");
        });
    // }
  }, []);
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }
  return (
    <>
      <div className="Screen_1">
        <div className="inner">
          <div className="content">
            <h1>1. What city do you want to explore?</h1>
            <p>
              We need a location to curate the best possible spots around you.
            </p>
          </div>
          <div className="form">
            <form>
              <label htmlFor="State">State</label>
              <select
                className="City"
                name="s"
                id="State"
                
                value={address.state}
                onChange={(e) => check(e.target.value)}
              >
                {state?.map((ele, i) => (
                  <option key={i} >{ele.state}</option>
                ))}{" "}
              </select>
              <label htmlFor="City">City</label>
              <select
                className="City"
                type="text"
                id="City"
                placeholder="Enter city name"
                name="City"
                value={address.city}
                onChange={(e) => selectCity(e.target.value)}
              >
                {city?.map((ele, i) => (
                  <option key={i} >{ele.city}</option>
                ))}
              </select>
              <button onClick={handleClick} type="button">
                <img src="./img/Arrow_button.png" alt="" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenOne;
