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
    var axios = require('axios');
    var config = {
      method: 'get',
    //   url: baseUrl+`customFilterData?cityName=${objectForFilter.city.name}&hungry=${objectForFilter.hungry}`,
      url: baseUrl+`customFilterData?cityName=Los Angeles&hungry=yes&vibe1=Fun&vibe2=Energetic&foodtype=Fusion&budget=30&activity=Nightlife`,
      headers: { }
    };
    
    return axios(config)


}

