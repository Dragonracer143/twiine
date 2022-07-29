import axios from "axios";
// const baseUrl = 'https://agile-plateau-96207.herokuapp.com/'
const baseUrl = 'http://localhost:8000/'
// const baseUrl = 'http://192.168.1.37:8000/'


export const Addplaces = (dataObject) => {
  var data = JSON.stringify(dataObject);
  var config = {
    method: 'post',
    url: baseUrl + 'createPlacename',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  return axios(config)
}
 export const Addwaitlist = (dataObject) =>{
  var data = JSON.stringify(dataObject);
  var config = {
    method: 'post',
    url: baseUrl + 'joinwaitlist',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  return axios(config)

 }
export const AddRating = (dataObject) => {
  var data = JSON.stringify(dataObject);

  var config = {
    method: 'post',
    url: baseUrl + 'rating-add',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)


}
export const createRecordApi = (dataObject) => {

  var data = JSON.stringify({
    "data": dataObject
  });
  var config = {
    method: 'post',
    url: baseUrl + 'create',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)


}

export const getAllDetailsApi = (token) => {

  var config = {
    method: 'post',
    url: baseUrl + 'getAlldetails',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  return axios(config)
}

export const customFilterDataApi = (objectForFilter) => {
  // console.log(objectForFilter.city.name)
  var axios = require('axios');
  var config = {
    method: 'get',
    url: baseUrl + `customFilterData?cityName=${objectForFilter.city}&hungry=${objectForFilter.hungry}&vibe1=${objectForFilter.vibe1}&vibe2=${objectForFilter.vibe2}`,
    //   url: baseUrl+`customFilterData?cityName=Los Angeles&hungry=yes&vibe1=Fun&vibe2=Energetic&foodtype=Fusion&budget=30&activity=Nightlife`,
    headers: {}
  };

  return axios(config)


}

export const increasePopularityApi = (id, setcount) => {
  var data = JSON.stringify({
    "id": id,
    "setcount": setcount

  });

  var config = {
    method: 'post',
    url: baseUrl + 'increasePopularity',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)

}

export const adminLoginApi = (userObject) => {
  var data = JSON.stringify(userObject);

  var config = {
    method: 'post',
    url: baseUrl + 'adminlogin',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)

}

export const notInterstedApi = (id) => {
  var data = JSON.stringify({
    "id": id
  });

  var config = {
    method: 'post',
    url: baseUrl + 'notIntersted',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)

}

export const getDetailByIdApi = (id, ac_token) => {
  var data = JSON.stringify({
    "id": id,
    "ac_token": ac_token
  });

  var config = {
    method: 'post',
    url: baseUrl + 'getdetail',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)


}
// export const getPlacenames = (id, ac_token) => {
//   var data = JSON.stringify({
//     "id": id,
//     "ac_token": ac_token
//   });

//   var config = {
//     method: 'post',
//     url: baseUrl + 'createPlacename',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     data: data
//   };

//   return axios(config)


// }

export const updateDetailApi = (id,ac_token,dataObject) => {
  var data = JSON.stringify({
    "id": id,
    "data": dataObject,
    "ac_token": ac_token
  });

  var config = {
    method: 'post',
    url: baseUrl+'updateDetails',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)
    
}

