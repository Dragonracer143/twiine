import React from 'react'

const ScreenThree = (props) => {
    const handleClick = (e) => {
        props.setProcess(props.process + 1)
      }
      const Click = (e) => {
        props.setProcess(props.process + 2)
      }
  return (
    <div className="Screen_3">
    <div className="inner">
      <div className="content">
        <h1>3. Are you Hungry?</h1>
        <p>
          We need a distance preference to recommend the best possible spots
          around you.
        </p>
      </div>
      <form className="form">
        <button onClick={handleClick} type="button">YES</button>
        <button onClick={Click} type="button">NO</button>
      </form>
    </div>
  </div>
  )
}

export default ScreenThree