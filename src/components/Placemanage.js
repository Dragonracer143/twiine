import React, { useState } from 'react'
import data from './Place.json'
import { Addplaces } from '../Shared/Services'
import Maindashboard from './Maindashboard'
import { useNavigate } from 'react-router-dom'
const Placemanage = () => {
  const [val, setVal] = useState([0])
  const [showcity, setShowcity] = useState([])
  const [placeObject, setPlaceObject] = React.useState({
    state: "",
    city: ""
  })
  let navigate = useNavigate()
  const placemanagefunc = (value) => {
    const findCities = data.find((x) => x.state_name == value)
    if (findCities) {
      const findIndex = data.indexOf(findCities)
      setVal(findIndex)
      setPlaceObject((placeObject) => {
        return {
          ...placeObject,
          state: value,
        }
      })
    }
  };
  const changeCities = (value) => {
    setPlaceObject((placeObject) => {
      return {
        ...placeObject,
        city: value,
      }
    })
  }
  const placemanagesubmit = (e) => {
    e.preventDefault()
    Addplaces(placeObject)
      .then(function (response) {
        localStorage.setItem("access_token", response.data.result)
        // alert("place added")
        navigate('/form-listing')


      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status == 500) {
          console.log(error);
        } else {
          alert(error.response.data.message)
        }
      });
  }



  return (<>
<Maindashboard/>
    <div className="listing-table list-wrappers">
      <div className="table-card">
        <div className="table-head pb-4 d-flex justify-content-end">
          <form className='container' onSubmit={(e) => { placemanagesubmit(e) }}>
            <div className="mb-3 mt-3">
              <select
                className="state"
                type="text"
                id="state"
                placeholder="Enter city name"
                name="state"
                value={placeObject.state}
                onChange={(e) => placemanagefunc(e.target.value)}
              >
                {data?.map((ele) =>
                  <option value={ele.state_name}>{ele.state_name}</option>
                )}
              </select>

              <select
                className="City"
                type="text"
                id="City"
                placeholder="Enter city name"
                name="city"
                value={placeObject.city}
                onChange={(e) => changeCities(e.target.value)}
              >
                {data[val]?.city_name?.map((ele) =>
                  <option value={ele}>{ele}</option>
                )}
              </select>
            </div>
            <button type='submit' className='btn btn-success'>Add</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Placemanage
