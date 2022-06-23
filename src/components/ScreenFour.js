import React, { useState } from 'react'
import data from "./Activity.json"

const ScreenFour = (props) => {
 
 const handleClick = (e) => {
        props.setProcess(props.process + 2)
      }


     const activityType= (value)=>{
      props.setActivity(value);
     };
     const setSelectedDiv=(value)=>{
      if(value===props.activity){
        return "showSpanSelected"
      }else{
        return "showSpan"
      }
     }

console.log("act:", props.activity)


  return (
    <div className="Screen_4">
    <div className="inner activityChoice">
      <div className="content">
        <h1>4. What kind of activities would you like to do?</h1>
        <p>
          We need an activity preference to recommend the best possible spots around you.
        </p>
      </div>
      <div className="Activity_Choice">
      <p>Energy-Level Choice </p>
      <div className='showSpanMaster '>
      <span className={setSelectedDiv("Low Energy")}
      onClick={()=>{
        activityType('Low Energy')
      }}
      >Low Energy</span>
      <span className={setSelectedDiv("Mid Energy")}
      onClick={()=>{
        activityType('Mid Energy')
      }}
      >Mid Energy</span>
      <span className={setSelectedDiv("High Energy")}
      onClick={()=>{
        activityType('High Energy')
      }}
      >High Energy</span>
      <span className={setSelectedDiv("Adrenaline Junky")}
      onClick={()=>{
        activityType('Adrenaline Junky')
      }}
      >Adrenaline Junky</span>
      </div>
        
      {/* <form className="form">
        
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
      </form> */}
      <button onClick={handleClick} type="button"><img src="./img/Arrow_button.png" alt="" /></button>
      <div className='activityDescDiv'> 
        <span className='activityDescDivHeading'> Energy-Level Key</span>
        <div className='activityDescDivKeys'>
        <span className='heading'>Low Energy</span>
        <span className='desc'>Activity Like: Walking, Sightseeing etc.</span>
        <span className='heading'>Mid Energy</span>
        <span className='desc'>Activity Like:Bowling,Mini Golf,Escape Roops etc.</span>
        <span className='heading'>High Energy</span>
        <span className='desc'>Activity Like:Playing sports, Hiking etc.</span>
        <span className='heading'>Adrenaline Junky</span>
        <span className='desc'>Activity Like:Paragliding Skydiving etc.</span>
        </div>
      </div>
    </div>
    </div>
  </div>
  )
}

export default ScreenFour;