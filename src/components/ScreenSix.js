import React from 'react';
import data from "./Preference.json";

const ScreenSix = (props) => {
    const handleClick = (e) => {
        props.setProcess(props.process + 1)
      }
console.log("preference1", props.pref1)

const prefer1=(e)=>{
  const value = e.target.value;
  props.setPref1(()=>{
return {
  vibe1 : value
}
  });
};

console.log("preference2", props.pref2)

const prefer2=(e)=>{
  const value = e.target.value;
  props.setPref2(()=>{
    return {
      vibe2 : value
    }
      });
    };



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
            <select
            className="City"
            name="cars"
            id="State"
            // value={props?.pref1}
            onChange={(e)=> prefer1(e)}>
              {data?.preference?.map((ele)=>
              <option >{ele}</option>
              )}
            </select>
            <label htmlFor="State">Preference 2</label>
            <select
            className="City"
            name="cars"
            id="State"
            // value={props?.pref2}
            onChange={(e) => prefer2(e)}
            >
            {data?.preference?.map((ele)=>
              <option >{ele}</option>
              )}
            </select>
            <button onClick={handleClick} type="button"><img src="./img/Arrow_button.png" alt ="" /></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ScreenSix;