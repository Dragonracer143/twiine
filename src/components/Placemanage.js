import React, { useState } from 'react'
import data from './Place.json'
import { getPlacenames } from '../Shared/Services'
const Placemanage = () => {
  const [val, setVal] = useState(100)
  const [placeObject, setPoginObject] = React.useState({
    state:'',
    city:''
})
  const placemanagefunc = (value) => {
    const findCities = data.find((x)=>x.state_name == value)
    if(findCities){
      const findIndex = data.indexOf(findCities)
      setVal(findIndex) 
       }
  };
  const placemanagesubmit=(e)=>{
    e.preventDefault()
    getPlacenames(placeObject)
    .then(function (response) {
        console.log(response.data);
        localStorage.setItem("access_token",response.data.result)
        // navigate('/dashboard')
      })
      .catch(function (error) {
        console.log(error);

        if(error.response.status==500){
            console.log(error);
        }else{
            alert(error.response.data.message)
        }
       
      });
}
  
  return (
    <div  className="listing-table">
        <div className="table-card">
          <div className="table-head pb-4 d-flex justify-content-end">
          <form className='container'  onSubmit={(e)=>{placemanagesubmit(e)}}>
            <div className="mb-3 mt-3">
            <select
                className="state"
                type="text"
                id="state"
                placeholder="Enter city name"
                name="state"
                onChange={(e) => placemanagefunc(e.target.value)}
                > 
                {data?.map((ele)=>
                <option value={ele.state_name}>{ele.state_name}</option>
                )}        
                  </select>
                  
               <select
                className="City"
                type="text"
                id="City"
                placeholder="Enter city name"
                name="City"
                onChange={(e) => placemanagefunc(e.target.value)}
                > 
                {data[val]?.city_name?.map((ele)=>
                <option value={ele}>{ele}</option>
                )}        
                  </select>
            </div>
            <button type='submit' className='btn btn-success'>Add</button>
            </form>
          </div>
          </div>
        </div>
  )
}

export default Placemanage