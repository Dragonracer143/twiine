import React, { useState } from 'react'

const ScreenOne = (props) => {
    const handleClick = (e) => {
        props.setProcess(props.process + 1)
      
    }
     
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
            <label htmlFor="City">City</label>
            <input
              className="City"
              type="text"
              id="City"
              placeholder="Irvine"
              name="City"
            />
            <label htmlFor="State">State</label>
            <select className="City" name="cars" id="State">
              <option >California</option>
              <option >Sierra Madre</option>
              <option >Arcadia</option>
            </select>
            <button onClick={handleClick} type="button"><img src="./img/Arrow_button.png" /></button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default ScreenOne