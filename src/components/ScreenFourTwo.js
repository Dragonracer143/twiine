import React from 'react';
import data from "./Food.json";

const ScreenFourTwo = (props) => {

 
    const handleClick = (e) => {
        props.setProcess(props.process + 1)
      };


      const foodtype= (e) => {
        const value = e.target.value;
        props.setFoods(value);
      };
      
console.log("foodval", props.foods )
 

return (
    <div className="Screen_4_two">
      <div className="inner">
        <div className="content">
          <h1>4. What kind of food do you like?</h1>
          <p>
            We need a cuisine preference to recommend the best possible spots around you.
          </p>
        </div>
        <div className="Food_Choice">
        <p>Food Choice </p>
        <form className="form">
          <select
           className="Food_Choice_dropdown" 
           name="food"
            id="food"
            type="text"
            // value={props?.foods}
            onChange={(e) => foodtype(e)}
            >
            {data?.food?.map((ele)=>
            <option>{ele}</option>
            )}
            <option></option>
          </select>
          <button onClick={handleClick} type="button"><img src="./img/Arrow_button.png" alt="" /></button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default ScreenFourTwo;