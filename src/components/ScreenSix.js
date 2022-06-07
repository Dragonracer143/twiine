import React from 'react'

const ScreenSix = (props) => {
    const handleClick = (e) => {
        props.setProcess(props.process + 1)
      }
  return (
    <div className="Screen_6">
      <div className="inner">
        <div className="content">
          <h1>6. What is kind of vibes are you going for?</h1>
          <p>
            Studies show that vibes have an impact on the outcome of an outing
          </p>
        </div>
        <div className="form">
          <form>
            <label for="State">Preference 1</label>
            <select className="City" name="cars" id="State">
              <option value="volvo">Vibe Preference </option>
              <option value="saab">Vibe Preference </option>
              <option value="saab">Vibe Preference </option>
            </select>
            <label htmlFor="State">Preference 2</label>
            <select className="City" name="cars" id="State">
              <option value="volvo">Vibe Preference </option>
              <option value="saab">Vibe Preference </option>
              <option value="saab">Vibe Preference </option>
            </select>
            <button onClick={handleClick} type="button"><img src="./img/Arrow_button.png" /></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ScreenSix