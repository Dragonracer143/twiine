import React from 'react'

const ScreenFourTwo = (props) => {
    const handleClick = (e) => {
        props.setProcess(props.process + 1)
      }
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
          <select className="Food_Choice_dropdown" name="cars" id="State">
            <option value="volvo">Food Choice</option>
            <option value="saab">Food Choice</option>
            <option value="saab">Food Choice</option>
          </select>
          <button onClick={handleClick} type="button"><img src="./img/Arrow_button.png" /></button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default ScreenFourTwo