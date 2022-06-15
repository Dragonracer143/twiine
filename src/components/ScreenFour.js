import React, { useState } from 'react'
import data from "./Activity.json"

const ScreenFour = (props) => {
 
 const handleClick = (e) => {
        props.setProcess(props.process + 2)
      }


     const activityType= (e)=>{
      const value= e.target.value;
      props.setActivity(value);
     };

console.log("act:", props.activity)


  return (
    <div className="Screen_4">
    <div className="inner">
      <div className="content">
        <h1>4. What kind of activities would you like to do?</h1>
        <p>
          We need an activity preference to recommend the best possible spots around you.
        </p>
      </div>
      <div className="Activity_Choice">
      <p>Activity Choice </p>
      <form className="form">
        <select
         className="Activity_choice_dropdown" 
         name="Activity" 
         id="Activity"
         value={props?.activity}
         onChange={(e) => activityType(e)}
         >
          {data?.map((ele)=>
          <option >{ele?.activity}</option>    
          )}
        </select>
        <button onClick={handleClick} type="button"><img src="./img/Arrow_button.png" alt="" /></button>
      </form>
    </div>
    </div>
  </div>
  )
}

export default ScreenFour;