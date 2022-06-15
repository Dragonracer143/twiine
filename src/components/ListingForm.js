import React, { useState } from "react";
import axios from "axios";
import { createRecordApi } from './../Shared/Services'
import { MultiSelect } from "react-multi-select-component";

const ListingForm = () => {
  const [yelpURL, setYelpURL] = useState(null)
  const [food, setFood] = useState(null)
  const [selected, setSelected] = useState([]);
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
    bussiness_name: '',
    street_address: '',
    city: '',
    zip_code: '',
    state: '',
    price: '',
    foodOptions: '',
    activityType: '',
    resturant_or_activite: 'Restaurant',
    popularOrHidden: 'Popular',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
  })

  const changeInputField = (objectKey, value) => {
    setDataObject((old) => {
      old[objectKey] = value
      return { ...old }
    })
  }




  const handleSubmit = () => {
    let data = dataObject
    let vibes = []
    for (let x of selected) {
      vibes.push(x.value)
    }
    data['vibe'] = vibes
    console.log(data)
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

  React.useEffect(()=>{
    console.log(dataObject)
  },[dataObject])

  return (
    <>
      {/* <div className="Background_color"> */}
      <div className="inner">
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
                value={dataObject.bussiness_name && dataObject.bussiness_name}
                onChange={(e) => {
                  changeInputField('bussiness_name', e.target.value)
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
                value={dataObject.street_address && dataObject.bussinstreet_addressess_name}
                onChange={(e) => {
                  changeInputField('street_address', e.target.value)
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="states"> Select State</label>
              <select name="states" id="states" className="form-control"
                onChange={(e) => {
                  changeInputField('state', e.target.value)
                }}
              >
                <option value="Alabama">Choose State</option>
                <option value="Alabama">California</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="cities"> Select City</label>
              <select name="cities" id="cities" className="form-control"
                onChange={(e) => {
                  changeInputField('city', e.target.value)
                }}
              >
                <option>choose city</option>
                {citesArray.map((item, i) => (
                  <option key={i}> {item} </option>
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
                value={dataObject.zip_code && dataObject.zip_code}
                onChange={(e) => {
                  changeInputField('zip_code', e.target.value)
                }}
              />
            </div>
            {/* TOGGLE */}
            <div className="mb-4">
              <span>Restaurant</span>
              <label className="switch">
                <input type="checkbox"
                  onClick={() => {
                    if (dataObject.resturant_or_activite === 'Restaurant') {
                      changeInputField('resturant_or_activite', 'Activity')
                    }
                    else {
                      changeInputField('resturant_or_activite', 'Restaurant')
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
                  changeInputField('price', e.target.value)
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
                value={dataObject.yelpURL && dataObject.yelpURL}
                onChange={(e) => {
                  changeInputField('yelpURL', e.target.value)
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="food">Food Options</label>
              <select name="food" id="food" className="form-control" value={food}
                onChange={(e) => {
                  changeInputField('foodOption', e.target.value)
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
                  changeInputField('activityType', e.target.value)
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
                <input type="checkbox"
                  onClick={() => {
                    if (dataObject.popularOrHidden === 'Popular') {
                      changeInputField('popularOrHidden', 'Hidden')
                    }
                    else {
                      changeInputField('popularOrHidden', 'Popular')
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
                value={dataObject.image1 && dataObject.image1}
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
                value={dataObject.image2 && dataObject.image2}
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
                value={dataObject.image3 && dataObject.image3}
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
                value={dataObject.image4 && dataObject.image4}
                onChange={(e) => {
                  changeInputField('image4', e.target.value)
                }}
              />

            </div>
            <div className="mb-3">
              <label htmlFor="Vibe">Vibe</label>
              <MultiSelect
                options={vibeOptions}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
              />
            </div>



            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
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