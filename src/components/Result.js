import React from 'react'

const Result = (props) => {
    const handleClick = (e) => {
        props.setProcess(props.process == 0)
      }
  return (
    <>
    <div className="result">
      <div className="inner">
        <div className="content">
          <h1><img src="./img/twiine2.png" /> Recommends...</h1>
        </div>
        <div className="cartt">
        <p className="fire_content">Highly Recommended</p>
          <div className="row">
            <div className="column1">
              <img src="./img/cart.png" />
            </div>
            <div className="column2">
              <div className="title">
                <h1>Tiki Fun Boats </h1><button className="Visit_btn">Visit Yelp Page</button>
               
              </div>
              <div className="visit_help_page">
                <p>Costa Mesa</p>
              </div>
              <p className='dollor'>$$
              </p>
              <div className="yes_no">
                <p>Do you like this recommendation?</p>
                <div className="buttons">
                <button className="yes_no_btn1">Yes</button>
                <button className="yes_no_btn2">No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleClick} className="exit_btn" type="button">Exit</button>
      {/* <button className="recommend_btn" type="button">Not satisfied? <br/> Get 3 more recommendations here!</button> */}
    </div>
    </>
  )
}

export default Result