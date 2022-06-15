import React from 'react'

const ScreenThree = (props) => {


    const handleClick = (value) => {
      props.setHungry(value);
        props.setProcess(props.process + 2);
      }
  console.log("hunger:", props.hungry)



    const Click = (value) => {
      props.setHungry(value);
        props.setProcess(props.process + 1)
      }


      const yes= [
        {value:"Yes"}
      ] 

      const no= [
        {value:"No"}
      ] 

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

        {yes?.map((ele)=>
        <button 
        onClick={(e) => handleClick(ele.value)} 
        type="button"
        >{ele.value}
        </button>
        )}
        
        {no?.map((ele)=>
        <button 
        onClick={(e) => Click(ele.value)} 
        type="button"
       >{ele.value}
       </button>
        )}
        
      </form>
    </div>
  </div>
  )
}

export default ScreenThree;