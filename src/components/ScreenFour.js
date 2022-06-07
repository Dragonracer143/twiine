import React from 'react'

const ScreenFour = (props) => {
    const handleClick = (e) => {
        props.setProcess(props.process + 2)
      }
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
        <select className="Activity_choice_dropdown" name="cars" id="State">
          <option value="volvo">Activity Choice</option>
          <option value="saab">Activity Choice</option>
          <option value="saab">Activity Choice</option>
        </select>
        <button onClick={handleClick} type="button"><img src="./img/Arrow_button.png" /></button>
      </form>
    </div>
    </div>
  </div>
  )
}

export default ScreenFour