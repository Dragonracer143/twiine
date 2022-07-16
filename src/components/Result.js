import React, { useState } from 'react'
import { customFilterDataApi } from '../Shared/Services'
import loader from './../img/loader.webp'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { AddRating } from '../Shared/Services';
import { increasePopularityApi, notInterstedApi } from '../Shared/Services';
import { Stars } from '@mui/icons-material';
import axios from 'axios';


const Result = (props) => {
  const [filteredData, setFilteredData] = React.useState([])
  const [tempFilteredData, setTempFilteredData] = React.useState([])
  const [clickedBtnIndexes, setClickedBtnIndexes] = React.useState([])
  const [loaderState, setLoaderState] = React.useState(true)
  const [i, setI] = React.useState(0)
  const [starsrate, setStarrate] = useState({
    rating: ""
  })
  console.log("star", starsrate)
  const handleClick = (e) => {
    props.setProcess(props.process - 9)
  }
  const baseUrl = 'http://localhost:8000/'
  const popularIncrement = (id) => {
    // console.log(id)
    increasePopularityApi(id)
      .then(function (response) {
        // console.log(response.data);
        setClickedBtnIndexes((old) => {
          old.push(id)
          return [...old]
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const notInterstedIncrement = (id) => {
    notInterstedApi(id)
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  const AddRatinghandler = async (e) => {
    try {
      const starrating = await axios.post(baseUrl + "rating-add", {
        rating: starsrate
      }).then(function (response) {
        alert(starsrate + " Star rating added")
      })
    }
    catch (err) {
      console.log(err)
    }

  }


  React.useEffect(() => {
    customFilterDataApi(props.collectedData)
      .then(function (response) {
        setFilteredData([...response.data])
        setLoaderState(false)
        setTempFilteredData([...response.data])
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])
  const secondExample = {
    size: 40,
    count: 5,
    isHalf: false,
    value: 2,
    color: "rgb(133 106 107)",
    activeColor: "white",
    onChange: rating => {
      {
        console.log(`Example 3: new value is ${starsrate.rating}`);
        setStarrate(rating)
      }
    }
  };

  return (
    <>
      <div className="result">
        <div className="inner">
          <div className="content">
            <h1><img src="./img/twiine2.png" alt="" /> Recommends...</h1>
          </div>

          {filteredData.length > 0 ?
            <>
              {filteredData.slice(i, i + 3).map((item, index) => {
                // {filteredData.map((item, index) => {
                return <>
                  <div key={index} className="cartt">
                    <p className="fire_content">{index === 0 && ' Highly Recommended'}</p>
                    <div className="cartt2InnerDiv">
                      <div className="column1">
                        <img src={item.image1} alt="" />
                      </div>
                      <div className="column2">
                        <div className="title">
                          <h2 className='nameHeading'>{item.businessName ? item.businessName : 'No name'}</h2><a href={item.yelpURL}><button className="Visit_btn">Visit Yelp Page</button></a>

                        </div>
                        <div className="visit_help_page">
                          <p>{item.city}</p>
                        </div>
                        <p className='dollor'>{item.price ? item.price : ''}
                        </p>
                        <div className="yes_no">
                          <p>Do you like this recommendation?</p>
                          <div className="buttons">
                            {/* {
                              clickedBtnIndexes.indexOf(item._id) < 0 ?
                                <> */}
                            <button className="yes_no_btn1"
                              onClick={() => {
                                popularIncrement(item._id)
                              }}
                            >Yes</button>
                            {/* </>
                                :
                                <>
                                  <button className="yes_no_btn1"
                                  >Yes</button>
                                </>
                            } */}
                            {clickedBtnIndexes.indexOf(item._id) < 0 ?
                              <>
                                <button className="yes_no_btn2"
                                  onClick={() => {
                                    notInterstedIncrement(item._id)
                                    let indexValue = filteredData.indexOf(item)
                                    if (indexValue === filteredData.length - 1 && index === 0) {
                                      setI((old) => {
                                        let nexti = old - 1
                                        if (nexti < 0) {
                                          nexti = old
                                        }
                                        return nexti
                                      })
                                    }
                                    // console.log(indexValue) 
                                    setFilteredData((old) => {
                                      old.splice(indexValue, 1)
                                      return [...old]
                                    })
                                  }}
                                >No</button>
                              </> :
                              <>
                                <button className="yes_no_btn2 disabled"

                                >No</button>
                              </>
                            }

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              })}
              {filteredData.length > 3 ?
                <div className='get-three-more'>
                  <button className="Visit_btn more_result_btn fw-bold"
                    onClick={() => {
                      setI((old) => {
                        let nexti = old + 3
                        if (nexti >= filteredData.length) {
                          nexti = old
                          alert("no more data")
                        }
                        return nexti

                      })
                    }}
                  >
                    <span className='text-dark fw-bold'>Not satisfied?</span><br />
                    Get <span className='fst-italic  text-dark'>3</span> more recommendation here!</button> </div>
                : ''}
              <div className='join-our-waitlist'>
                <button className="Visit_btn more_result_btn fw-bold">
                  Like our Prototype?<span className='text-dark'> Join our waitlist!</span></button>
              </div>
              <div className='How-are-these-results'>
                <button className="how-result fw-bold">
                  How are these results?</button>
              </div>
              <div className='react-star'>
                <ReactStars {...secondExample} />

              </div>
              <div className='How-are-these-results'>
                <button type='submit' className="rating-submit fw-bold" onClick={(e) => { AddRatinghandler(e) }}>
                  Submit</button>
              </div>
            </>
            :
            <>
              <center className="noRecommendations"
                style={{ "display": loaderState ? "block" : "flex" }}
              >
                {loaderState ?
                  <>
                    <img className='result_loader' src={loader} />
                  </>
                  :
                  <>
                    <h3>No recommendation</h3>
                    {tempFilteredData.length > 0 &&
                      <>
                        <button className='Visit_btn viewAgainbtn'
                          onClick={() => {
                            setFilteredData([...tempFilteredData])
                          }}
                        >View Again</button>
                      </>
                    }
                  </>
                }
              </center>
            </>}


        </div>
        <button onClick={handleClick} className="exit_btn" type="button">Exit</button>
      </div>
    </>
  )
}

export default Result