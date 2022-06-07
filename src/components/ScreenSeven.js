import React from 'react'

const ScreenSeven = (props) => {
    const handleClick = (e) => {
        props.setProcess(props.process + 1)
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

export default ScreenSeven