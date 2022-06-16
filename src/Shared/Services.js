import axios from "axios";
const baseUrl = 'http://localhost:8000/'

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

export const getAllDetailsApi = () => {
    var axios = require('axios');

    var config = {
        method: 'get',
        url: baseUrl+'getAlldetails',
        headers: {}
    };

    return axios(config)
}

export const customFilterDataApi = (objectForFilter) => {
    console.log(objectForFilter.city.name)
    var axios = require('axios');
    var config = {
      method: 'get',
      url: baseUrl+`customFilterData?cityName=${objectForFilter.city}&hungry=${objectForFilter.hungry}&vibe1=${objectForFilter.vibe1}&vibe2=${objectForFilter.vibe2}`,
    //   url: baseUrl+`customFilterData?cityName=Los Angeles&hungry=yes&vibe1=Fun&vibe2=Energetic&foodtype=Fusion&budget=30&activity=Nightlife`,
      headers: { }
    };
    
    return axios(config)


}

export const importApi =()=>{
console.log("/")
}

