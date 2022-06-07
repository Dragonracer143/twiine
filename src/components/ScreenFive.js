import React from 'react'

const ScreenFive = (props) => {
  const handleClick = (e) => {
    props.setProcess(props.process + 1)
  }
  return (
    <div className="Screen_5">
      <div className="inner">
        <div className="content">
          <h1>5. What is your budget?</h1>
          <p>
            We need a budget preference to recommend the best possible spots around you.
          </p>
        </div>
        <div className="form">
          <p className="Your_Budget">Your Budget</p>
          <form>
            <button className="radio_btn" type="button">$</button>
            <button className="radio_btn" type="button">$$</button>
            <button className="radio_btn" type="button">$$$</button>
            <button className="radio_btn" type="button">$$$$</button>

            <button onClick={handleClick} className="arrow_btn" type="button">
              <img src="./img/Arrow_button.png" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ScreenFive