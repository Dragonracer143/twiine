import React from 'react'

const Home = (props) => {

  const handleClick = (e) => {
    props.setProcess(props.process + 1)
  }
 
  return (
    <div className="Background_color">
    <div className="inner">
      <div className="content">
        <h1>Welcome to <img src="./img/twiine2.png" /></h1>
        <p>
          Take a quick 10 question quiz to find the best thing to do for you.
        </p>
      </div>
      <div className="lets_do_it">
        <p>What’s going to happen?</p>
        <ul>
          <li>
            You will fill out your interests through a quick questionnaire.
          </li>
          <li>
            Twiine will recommend the best spots for you to visit based on
            your desires.
          </li>
        </ul>
      </div>
      <div className="button_letsdoit">
        <button onClick={handleClick} type="button">Let’s do it</button>
      </div>
    </div>
  </div>
  )
}

export default Home