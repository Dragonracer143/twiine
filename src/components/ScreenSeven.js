import React, { useState } from 'react'

const ScreenSeven = (props) => {

  const [recommendation, setRecommendation] = useState({
    "city": props.city?props.city:'',
    "hungry": props.hungry?props.hungry:'',
    "foodtype": props.food?props.food:'',
    "activity": props.activity?props.activity:'',
    "budget": props.budget?props.budget:'',
    "vibe1": props.pref1.vibe1?props.pref1.vibe1:'',
    "vibe2": props.pref2.vibe2?props.pref2.vibe2:''
  });


  const handleClick = (e) => {
    props.setProcess(props.process + 1)
    props.setCollectedData({ ...recommendation })
  }



  return (
    <div className="Screen_7">
      <div className="inner">
        <div className="content">
          <h1>7. Do you want to visit a popular spot or a hidden gem?</h1>
          <p>Sometimes exploring lowkey spots are fun</p>
        </div>
        <form className="form">
          <button type="button">Popular</button>
          <button type="button">Hidden Gem</button>
          <button onClick={handleClick} className="submit_btn" type="button">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ScreenSeven;