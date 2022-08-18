import React, { useState } from "react";
import axios from "axios";
import { createRecordApi } from './../Shared/Services'
import { MultiSelect } from "react-multi-select-component";
import { getDetailByIdApi, updateDetailApi, getAllPlacenames } from './../Shared/Services'
import { useNavigate, Link } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import Maindashboard from "./Maindashboard";

const ListingForm = () => {
  let navigate = useNavigate()
  const paramsObject = useParams()
  const [yelpURL, setYelpURL] = useState(null)
  const [food, setFood] = useState(null)
  const [selected, setSelected] = useState([]);
  const [repos, setRepos] = React.useState([]);
  const [updateSelected, setUpdateSelected] = useState([])
  const vibeOptions = [
    { label: "Chill", value: "Chill" },
    { label: "Adventure", value: "Adventure" },
    { label: "Contemporary", value: "Contemporary" },
    { label: "Charming", value: "Charming" },
    { label: "Cute", value: "Cute" },
    { label: "Relaxing", value: "Relaxing" },
    { label: "Energetic", value: "Energetic" },
    { label: "Fun", value: "Fun" },
    { label: "Quiet", value: "Quiet" },
    { label: "Aesthetic", value: "Aesthetic" },
    { label: "Simple", value: "Simple" },

  ]
  const [dataObject, setDataObject] = useState({
    yelpURL: '',
    businessName: '',
    streetAddress: '',
    city: '',
    zipCode: '',
    state: '',
    price: '',
    vibe1: '',
    vibe2: '',
    vibe3: '',
    typeOfRestaurant: '',
    typeofActivity: '',
    resturantOrActivity: 'Restaurant',
    popularOrhiddenGem: 'Popular',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    genres:'',
    lattitude:'',
    longitude:'',
  })

  const [updateDataObject, setUpdateDataObject] = useState({
    yelpURL: '',
    businessName: '',
    streetAddress: '',
    city: '',
    zipCode: '',
    state: '',
    price: '',
    vibe1: '',
    vibe2: '',
    vibe3: '',
    typeOfRestaurant: '',
    typeofActivity: '',
    resturantOrActivity: 'Restaurant',
    popularOrhiddenGem: 'Popular',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    genres:'',
    lattitude:'',
    longitude:'',

  })
  const [updateMode, setUpdateMode] = useState(false)


  const changeInputField = (objectKey, value) => {
    setDataObject((old) => {
      old[objectKey] = value
      return { ...old }
    })
  }

  const changeUpdateInputField = (objectKey, value) => {
    setUpdateDataObject((old) => {
      old[objectKey] = value
      return { ...old }
    })
  }




  const handleSubmit = () => {
    let data = dataObject
    // for (let i = 0; i <= 3; i++) {
    //   data['vibe' + i] = selected[i].value
    // }
    // console.log(data)
    createRecordApi(data)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const citesArray = [
    "Los Angeles",
    "Huntington Park",
    "Hollywood",
    "West Hollywood",
    "Universal City",
    "Beverly Hills",
    "Santa Monica",
    "Glendale",
    "Culver City",
    "Inglewood",
    "Marina del Rey",
    "Van Nuys",
    "South El Monte",
    "Pasadena",
    "Burbank",
    "Malibu",
    "Calabasas",
    "Sylmar",
    "Venice",
    "Manhattan Beach",
    "Sherman Oaks",
    "Topanga",
    "Arcadia",
    "Bellflower",
    "Lebec",
    "Rancho Palos Verdes",
    "Lake Arrowhead",
    "Long Beach",
    "Artesia",
    "West Hills",
    "Garden Grove",
    "Northridge",
    "Fullerton",
    "Calabasas",
    "Santa Barbara",
    "City Of Industry",
    "Pacific Palisades",
    "Altadena",
    "Rolling Hills",
    "Redondo Beach",
    "Chatsworth",
    "La Puente",
    "Tarzana",
    "Paramount",
    "Carson",
    "Norwalk",
    "Buena Park",
    "Rosemead",
    "Hermosa Beach",
    "Sierra Madre",
    "Rowland Heights",
    "Torrance",
    "Torrance",
    "San Gabriel",
    "Palos Verdes Estates",
    "Lomita",
    "Panorama City",
    "Vernon",
    "Studio City",
    "Alhambra",
    "San Marino",
    "Baldwin Park",
    "Irwindale",
    "La Mirada",
    "Lake Hughes",
    "Monrovia",
    "West Covina",
    "Oak View",
    "Duarte",
    "Monrovia",
    "Monterey Park",
    "El Monte",
    "Perris",
    "Fullerton"
  ];

  const updateDetail = () => {
    let data = updateDataObject
      if (updateSelected.length) {
        for (let i = 0; i <= 3; i++) {
          data['vibe' + i] = updateSelected[i].value
        }
      }
    let ac_token = localStorage.getItem('access_token')
    updateDetailApi(updateDataObject._id, ac_token, updateDataObject)
      .then(function (response) {
        alert(response.data.message)
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  React.useEffect(() => {
    let ac_token = localStorage.getItem('access_token')
    if (!ac_token) {
      navigate('/admin')
    } else {
      console.log(paramsObject)
      let paramsObjectKeys = Object.keys(paramsObject)
      if (paramsObjectKeys.length > 0) {
        console.log("yes")

        let id = paramsObject.id.split(':')[1]

        if (id) {
          getDetailByIdApi(id, ac_token)
            .then(function (response) {
              setUpdateDataObject({ ...response.data.result })
              setUpdateMode(true)
            })
            .catch(function (error) {
              alert("Somwthing went wrong")
              navigate('/dashboard')
              console.log(error)
            });
        } else {
          navigate('/dashboard')
        }
      }
      // let id = paramsObject.id.split(':')[1]

      // if (id) {
      //   getDetailByIdApi(id, ac_token)
      //     .then(function (response) {
      //       console.log(response.data);
      //       setUpdateDataObject({ ...response.data.result })
      //       setUpdateMode(true)
      //     })
      //     .catch(function (error) {
      //       alert("Somwthing went wrong")
      //       navigate('/dashboard')
      //       console.log(error)
      //     });
      // } else {
      //   navigate('/dashboard')
      // }


    }
  }, [])
  const [vall, setVall] = useState([])
  const [selectcity, setSelectcity] = useState([])


  React.useEffect(() => {
    console.log(updateSelected)

  }, [updateSelected])
  // const baseUrl = 'http://localhost:8000/'
   const baseUrl = 'https://agile-plateau-96207.herokuapp.com/'
  function check(state, val = vall) {
    let test = []
    val.forEach(des => {
      if (des.state == state) {
        test.push(des)
      }
    }
    )
    let dupChars = getUniqueListBy(test, "city")
    setSelectcity(dupChars)
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(baseUrl + 'getplaces');
      let dupChars = getUniqueListBy(response.data, "state")
      setVall(response.data)
      setRepos(dupChars);
      setSelectcity(dupChars);
    }
    fetchData();
  }, []);
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }
  return (
    <>
      <Maindashboard />
      {/* <div className="Background_color"> */}
      <div className="inner list-wrappers">
        <div className="content">
          <div className="post-form">
            <form action="#" />
            <div className="mb-3 mt-3">
              <label htmlFor="text">Business Name</label>
              <input
                type="text"
                className="form-control"
                id="text"
                placeholder="Business"
                name="text"
                value={updateMode ? updateDataObject.businessName && updateDataObject.businessName : dataObject.businessName && dataObject.businessName}
                onChange={(e) => {
                  if (updateMode) {
                    changeUpdateInputField('businessName', e.target.value)
                  } else {
                    changeInputField('businessName', e.target.value)
                  }
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="text">Street Address</label>
              <input
                type="text"
                className="form-control"
                id="text"
                placeholder="Address"
                name="text"
                value={updateMode ? updateDataObject.streetAddress && updateDataObject.streetAddress : dataObject.streetAddress && dataObject.streetAddress}
                onChange={(e) => {
                  if (updateMode) {
                    changeUpdateInputField('streetAddress', e.target.value)
                  } else {
                    changeInputField('streetAddress', e.target.value)
                  }
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="states"> Select State</label>
              <select name="states" id="states" className="form-control"
                onChange={(e) => {
                  if (updateMode) {
                    check(e.target.value)
                    changeUpdateInputField('state', e.target.value)
                  } else {
                    check(e.target.value)
                    changeInputField('state', e.target.value)
                  }
                }}
              >
                {repos?.map((item, i) => (
                  <option key={i}>
                    {item.state} </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="cities"> Select City</label>
              <select name="cities" id="cities" className="form-control"
                onChange={(e) => {
                  if (updateMode) {
                    changeUpdateInputField('city', e.target.value)
                  } else {
                    changeInputField('city', e.target.value)
                  }
                }}
              >

                {selectcity?.map((item, i) => (
                  <option key={i}>
                    {item?.city} </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="text">Zipcode</label>
              <input
                id="zip"
                name="zip"
                className="form-control zipcode-number"
                min={1}
                max={5}
                type="number"
                value={updateMode ? updateDataObject.zipCode && updateDataObject.zipCode : dataObject.zipCode && dataObject.zipCode}
                onChange={(e) => {
                  if (updateMode) {
                    changeUpdateInputField('zipCode', e.target.value)
                  } else {
                    changeInputField('zipCode', e.target.value)
                  }
                }}
              />
            </div>
            {/* TOGGLE */}
            <div className="mb-4">
              <span>Restaurant</span>
              <label className="switch">
                <input type="checkbox" checked={updateMode ? updateDataObject.resturantOrActivity === "Activity" : ''}
                  onClick={() => {
                    if (updateMode) {
                      if (updateDataObject.resturantOrActivity === 'Restaurant') {
                        changeUpdateInputField('resturantOrActivity', 'Activity')
                      }
                      else {
                        changeUpdateInputField('resturantOrActivity', 'Restaurant')
                      }
                    } else {

                      if (dataObject.resturantOrActivity === 'Restaurant') {
                        changeInputField('resturantOrActivity', 'Activity')
                      }
                      else {
                        changeInputField('resturantOrActivity', 'Restaurant')
                      }
                    }

                  }}
                />
                <span className="slider"></span>
              </label>
              <span>Activity</span>
            </div>

            <div className="price mb-3">
              <label htmlFor="price">Price</label>
              <select name="price" id="price" className="form-control"
                onChange={(e) => {
                  if (updateMode) {
                    changeUpdateInputField('price', e.target.value)
                  } else {
                    changeInputField('price', e.target.value)
                  }
                }}
              >
                <option value="jQuery10">$</option>
                <option value="$20">$$</option>
                <option value="$30">$$$</option>
                <option value="$40">$$$$</option>
                <option value="$40">N/A</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="text">Yelp URL</label>
              <input
                type="url"
                className="form-control"
                id="text"
                placeholder="URL"
                name="text"
                value={updateMode ? updateDataObject.yelpURL && updateDataObject.yelpURL : dataObject.yelpURL && dataObject.yelpURL}
                onChange={(e) => {
                  if (updateMode) {
                    changeUpdateInputField('yelpURL', e.target.value)
                  } else {
                    changeInputField('yelpURL', e.target.value)
                  }
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="text">Lattitude</label>
              <input
                type="text"
                className="form-control"
                id="text"
                placeholder="31.1254"
                name="Lattitude"
                value={updateMode ? updateDataObject.lattitude && updateDataObject.lattitude : dataObject.lattitude && dataObject.lattitude}
                onChange={(e) => {
                  if (updateMode) {
                    changeUpdateInputField('lattitude', e.target.value)
                  } else {
                    changeInputField('lattitude', e.target.value)
                  }
                }}
                
              />
            </div>
            <div className="mb-3">
              <label htmlFor="text">Longitude</label>
              <input
                type="text"
                className="form-control"
                id="text"
                placeholder="-70.1254"
                name="Longitude"
                value={updateMode ? updateDataObject.longitude && updateDataObject.longitude : dataObject.longitude && dataObject.longitude}
                onChange={(e) => {
                  if (updateMode) {
                    changeUpdateInputField('longitude', e.target.value)
                  } else {
                    changeInputField('longitude', e.target.value)
                  }
                }}
                
              />
            </div>
            <div className="mb-3">
              <label htmlFor="text">Genres</label>
              <input
                type="text"
                className="form-control"
                id="text"
                placeholder="Sad, Hip Hop"
                name="genres"
                value={updateMode ? updateDataObject.genres && updateDataObject.genres : dataObject.genres && dataObject.genres}
                onChange={(e) => {
                  if (updateMode) {
                    changeUpdateInputField('genres', e.target.value)
                  } else {
                    changeInputField('genres', e.target.value)
                  }
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="food">Food Options</label>
              <select name="food" id="food" className="form-control"
                onChange={(e) => {
                  if (updateMode) {
                    changeUpdateInputField('typeOfRestaurant', e.target.value)
                  } else {
                    changeInputField('typeOfRestaurant', e.target.value)
                  }
                }}
              >
                <option value="American">American</option>
                <option value="Chinese">Chinese</option>
                <option value="Korean">Korean</option>
                <option value="Japanese">Japanese</option>
                <option value="Latin American">Latin American</option>
                <option value="Fusion">Fusion</option>
                <option value="Boba & Tea">Boba & Tea</option>
                <option value="Coffee & Tea">Coffee & Tea</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Mexican">Mexican</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="Filipino">Filipino</option>
                <option value="Hawaiian">Hawaiian</option>
                <option value="Italian">Italian</option>
                <option value="Thai">Thai</option>
                <option value="Indian">Indian</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="Activity">Activity Type</label>
              <select name="Activity" id="Activity" className="form-control"
                onChange={(e) => {
                  if (updateMode) {
                    changeUpdateInputField('typeofActivity', e.target.value)
                  } else {
                    changeInputField('typeofActivity', e.target.value)
                  }
                }}
              >
                <option value="Low Energy">Low Energy</option>
                <option value="Mid Energy">Mid Energy</option>
                <option value="High Energy">High Energy</option>
                <option value="Adrenaline Junky">Adrenaline Junky</option>
              </select>
            </div>

            {/* Toggle */}

            <div className="mb-4">
              <span>Popular</span>
              <label className="switch">
                <input type="checkbox" checked={updateMode ? updateDataObject.popularOrhiddenGem === "Hidden" : ''}
                  onClick={() => {
                    if (updateMode) {
                      if (updateDataObject.popularOrhiddenGem === 'Popular') {
                        changeUpdateInputField('popularOrhiddenGem', 'Hidden')
                      }
                      else {
                        changeUpdateInputField('popularOrhiddenGem', 'Popular')
                      }
                    } else {
                      if (dataObject.popularOrhiddenGem === 'Popular') {
                        changeInputField('popularOrhiddenGem', 'Hidden')
                      }
                      else {
                        changeInputField('popularOrhiddenGem', 'Popular')
                      }
                    }


                  }}
                />
                <span className="slider"></span>
              </label>
              <span>Hidden</span>
            </div>

            <div className="mb-3">
              <label htmlFor="Images">Images</label>
              <input
                type="text"
                className="form-control"
                id="text"
                placeholder="Upload File"
                name="text"
                value={updateMode ? updateDataObject.image1 && updateDataObject.image1 : dataObject.image1 && dataObject.image1}
                onChange={(e) => {
                  changeInputField('image1', e.target.value)
                }}
              />
              <input
                type="text"
                className="form-control"
                id="text"
                placeholder="Upload File"
                name="text"
                value={updateMode ? updateDataObject.image2 && updateDataObject.image2 : dataObject.image2 && dataObject.image2}
                onChange={(e) => {
                  changeInputField('image2', e.target.value)
                }}
              />
              <input2
                type="text"
                className="form-control"
                id="text"
                placeholder="Upload File"
                name="text"
                value={updateMode ? updateDataObject.image3 && updateDataObject.image3 : dataObject.image3 && dataObject.image3}
                onChange={(e) => {
                  changeInputField('image3', e.target.value)
                }}
              />
              <input
                type="text"
                className="form-control"
                id="text"
                placeholder="Upload File"
                name="text"
                value={updateMode ? updateDataObject.image4 && updateDataObject.image4 : dataObject.image4 && dataObject.image4}
                onChange={(e) => {
                  changeInputField('image4', e.target.value)
                }}
              />

            </div>
            <div className="mb-3">
              <label htmlFor="Vibe">Vibe</label>
              <MultiSelect
                options={vibeOptions}
                value={updateMode ? updateSelected : selected}
                onChange={updateMode ? setUpdateSelected : setSelected}
                labelledBy="Select"
              />
            </div>



            <button type="submit" className="btn btn-primary" onClick={updateMode ? updateDetail : handleSubmit}>
              Submit
            </button>
            <form />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingForm;
