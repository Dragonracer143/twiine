import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDetailsApi } from '../../Services/Services';

const Musicyoulike = (props) => {
    const navigate = useNavigate()
      
     const getGeners = () =>{
        let path ="/Resultbreakdown"
        navigate(path)
     }
     React.useEffect(() => {
    
          getAllDetailsApi()
            .then((res) => {
              let dupdata = [...res.data];
              props.setRest(dupdata);
            })
            .catch((e) => {
              console.log(e);
            });
      }, []);
      const getStories = () =>{ 
        navigate("/instagramstory")
      }
      
      
  return (
  <>

    <div className='Musicyoulike'>
        <img className='twiinevblack_logo' src="./img/twiineblack.png"/>
      <div className='heading'>
      Based on your<span style={{color:"#00FF19",marginLeft:"15px"}}>music taste</span>, <br/>we think these will be a good fit...
      </div>
      </div>

      <div className='row cards Musicyoulikes'>

        {props.rest?.slice(0,3).map((ele)=>
        
        <div className='col-12 col-md-4'>
            <div className='Musicyoulike_card_blue'>
            <img className='img' src={ele?.image2}/>
            <div className='card_content'>
                <p style={{paddingTop:"1rem"}}>{ele?.businessName}</p>
                <p>{ele?.city}</p>
                <p>Vibes: <span>{ele?.vibe1} </span> &nbsp;<span>{ele?.vibe2}</span>&nbsp;<span>{ele?.vibe3}</span></p>
            </div>
            <button class="Moreinfo btn" type="button">More Info</button>
            </div>
        </div>)}
        {/* <div className='col-12 col-md-4'>
            <div className='Musicyoulike_card_blue'>
            <img className='img' src="./img/dummy_card.png"/>
            <div className='card_content'>
                <p style={{paddingTop:"1rem"}}>The American Bar $$</p>
                <p>Distance: 13.2 mi</p>
                <p>Location: Los Angeles, CA</p>
                <p>Vibes: <span>Country </span><span>Blues</span></p>
            </div>
            <button class="Moreinfo btn" type="button">More Info</button>
            </div>
        </div>
        <div className='col-12 col-md-4'>
            <div className='Musicyoulike_card_blue'>
            <img className='img' src="./img/dummy_card.png"/>
            <div className='card_content'>
                <p style={{paddingTop:"1rem"}}>The American Bar $$</p>
                <p>Distance: 13.2 mi</p>
                <p>Location: Los Angeles, CA</p>
                <p>Vibes: <span>Country </span><span>Blues</span></p>
            </div>
            <button className="Moreinfo btn" type="button">More Info</button>
            </div>
        </div> */}

    <div className='share_buttons'>
    <button className="btn" type="button" onClick={getGeners}>See your Genre Breakdown</button>
    <button className="btn light_blue" type="button" onClick={getStories}>Share on Social Media</button>
    </div>
    <div className='share_buttons'>
    <button className="btn red" type="button">Subscribe for product updates</button>
    </div>
      </div>
 
  </>
  )
}

export default Musicyoulike