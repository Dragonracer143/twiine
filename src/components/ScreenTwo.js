import React from 'react';



const ScreenTwo = (props) => { 

    const handleClick = (e) => {
        props.setProcess(props.process + 1)
      }


  return (
    <div className="Screen_2">
      <div className="inner">
        <div className="content">
          <h1>2. How far are you willing to travel from {props?.city?.name}</h1>
        </div>
        <div className="form">
          <p className="distance">Distance</p>
          <form>
            <button  className="radio_btn" type="button">0-10 Miles</button>
            <button  className="radio_btn" type="button">11-20 Miles</button>
            <button  className="radio_btn" type="button">21-30 Miles</button>
            <button  className="radio_btn" type="button">40+ Miles</button>

            <button onClick={handleClick} className="arrow_btn" type="button">
              <img src="./img/Arrow_button.png" alt ="" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ScreenTwo;