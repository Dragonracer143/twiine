import React from 'react'
import { customFilterDataApi } from '../Shared/Services'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";

const Result = (props) => {
  const [filteredData, setFilteredData] = React.useState([])
  const [tempFilteredData, setTempFilteredData] = React.useState([])
  const [i, setI] = React.useState(0)
  const handleClick = (e) => {
    props.setProcess(props.process - 9)
  }
  React.useEffect(() => {
    console.log(props.collectedData)
    customFilterDataApi(props.collectedData)
      .then(function (response) {
        console.log(response.data);
        setFilteredData([...response.data])
        setTempFilteredData([...response.data])
      })
      .catch(function (error) {
        console.log(error);
      });
  },[])
  return (
    <>
      <div className="result">
        <div className="inner">
          <div className="content">
            <h1><img src="./img/twiine2.png" alt="" /> Recommends...</h1>
          </div>

          {filteredData.length > 0 ?
          <>
            {/* {filteredData.slice(i*4,(i*4)+3).map((item, index) => { */}
            {filteredData.map((item, index) => {
             return <>
                <div key={index} className="cartt">
                  <p className="fire_content">{index===0&&'Highly Recommended'}</p>
                  <div className="row">
                    <div className="column1">
                      <img src={item.image1} alt="" />
                    </div>
                    <div className="column2">
                      <div className="title">
                        <h1>{item.bussiness_name}</h1><a href={item.yelpURL}><button className="Visit_btn">Visit Yelp Page</button></a>

                      </div>
                      <div className="visit_help_page">
                        <p>{item.city}</p>
                      </div>
                      <p className='dollor'>{item.price?item.price:''}
                      </p>
                      <div className="yes_no">
                        <p>Do you like this recommendation?</p>
                        <div className="buttons">
                          <button className="yes_no_btn1">Yes</button>
                          <button className="yes_no_btn2"
                          onClick={()=>{
                            setFilteredData((old)=>{
                              old.splice(index,1)
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
            {/* {filteredData.length > 0 ?<button className="Visit_btn"
            onClick={()=>{
              setI((old)=>{
                let nextI=old+1
                if(nextI>=Math.ceil(filteredData.length/3)){
                  nextI=old
                  alert("No More Data")
                } 
                return nextI

              })
            }}
            >get 3 More Result</button>
            :''} */}
            </>
            :
            <>
              "No recommendation"
              <button  className='Visit_btn'
              onClick={()=>{
                setFilteredData([...tempFilteredData])
              }}
              >View Again</button>
            </>}
         
        </div>
        <button onClick={handleClick} className="exit_btn" type="button">Exit</button>
      </div>
    </>
  )
}

export default Result