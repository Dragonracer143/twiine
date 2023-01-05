import axios from "axios";
import { SPOTIFY_REFRESH_TOKEN, SECRET_ID, CLIENT_ID } from "./Config";
const axiosApiInstance = axios.create();

const refreshAccessToken = async () => {

  const basic = btoa(`${CLIENT_ID}:${SECRET_ID}`);
  // header paremeter
  const config = {
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const data = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: localStorage.getItem("refresh_token"),
  }).toString();
  const response = await axios.post(SPOTIFY_REFRESH_TOKEN, data, config);
  return response.data;
};

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const access_token = await refreshAccessToken();

      localStorage.setItem("token", access_token.access_token.toString());
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + access_token.access_token;

      return axiosApiInstance(originalRequest);
    }
    window.location.reload();
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
