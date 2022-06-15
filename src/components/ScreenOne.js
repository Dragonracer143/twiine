import React from "react";
import data from "./City.json";

const ScreenOne = (props) => {


  const handleClick = (e) => {
    props.setProcess(props.process + 1);
  };

  const cityName = (e) => {
    const value = e.target.value;
    props.setCity(() => ({
      name: value,
    }));
  };
  
  console.log("city:", props?.city?.name)


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
              <select className="City" name="" id="State">
                <option selected>California</option>
              </select>
              <label htmlFor="City">City</label>
              <select
                className="City"
                type="text"
                id="City"
                placeholder="Enter city name"
                name="City"
                alue={props?.city}
                onChange={(e) => cityName(e)}
                > 
                {data.cities?.map((ele)=>
                <option>{ele}</option>
                )}        
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
