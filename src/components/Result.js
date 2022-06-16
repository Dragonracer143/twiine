import React from 'react'
import { customFilterDataApi } from '../Shared/Services'
import loader from './../img/loader.webp'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";

import { increasePopularityApi } from '../Shared/Services';

const Result = (props) => {
  const [filteredData, setFilteredData] = React.useState([])
  const [tempFilteredData, setTempFilteredData] = React.useState([])
  const [clickedBtnIndexes, setClickedBtnIndexes] = React.useState([])
  const [loaderState, setLoaderState] = React.useState(true)
  const [i, setI] = React.useState(0)
  const handleClick = (e) => {
    props.setProcess(props.process - 9)
  }
  const popularIncrement = (id, index) => {
    increasePopularityApi(id)
      .then(function (response) {
        console.log(response.data);
        setClickedBtnIndexes((old) => {
          old.push(index)
          return [...old]
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  React.useEffect(() => {
    console.log(props.collectedData)
    customFilterDataApi(props.collectedData)
      .then(function (response) {
        console.log(response.data);
        setFilteredData([...response.data])
        setLoaderState(false)
        setTempFilteredData([...response.data])
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])
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
                    <p className="fire_content">{index === 0 && 'Highly Recommended'}</p>
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
                            {
                              clickedBtnIndexes.indexOf(index) < 0 ?
                                <>
                                  <button className="yes_no_btn1"
                                    onClick={() => {
                                      popularIncrement(item._id, index)
                                    }}
                                  >Yes</button>
                                </>
                                :
                                <>
                                  <button className="yes_no_btn1"
                                  >Yes</button>
                                </>
                            }
                            <button className="yes_no_btn2"
                              onClick={() => {
                                setI((old) => {
                                  let nexti = old - 1
                                  if (nexti < 0) {
                                    nexti = old
                                  }
                                  return nexti
                                })
                                let indexValue = filteredData.indexOf(item)
                                console.log(indexValue)
                                setFilteredData((old) => {
                                  old.splice(indexValue, 1)
                                  return [...old]
                                })
                              }}
                            >No</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </>
              })}
              {filteredData.length > 4 ? <button className="Visit_btn"
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
              >get 3 More Result</button>
                : ''}
            </>
            :
            <>
              <center className="noRecommendations"
              style={{"display":loaderState?"block":"flex"}}
              >
                {loaderState ?
                  <>
                  <img  src={loader}/>
                  </>
                  :
                  <>
                    <h3>No recommendation</h3>
                    {tempFilteredData.length>0 &&
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