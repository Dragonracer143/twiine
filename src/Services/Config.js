//Live Url
//
export const baseUrl = process.env.REACT_APP_API_BASE_URL;

// Local URL

// export const baseUrl = "http://localhost:8000/"

// spotify api data

export const scopes = [process.env.REACT_APP_SPOTIFY_SCOPES];
export const CLIENT_ID = process.env.REACT_APP_CLIENT_SPOTIFY_ID;
// export const REDIRECT_URI = "http://localhost:3000/";
export const REDIRECT_URI  = process.env.REACT_APP_REDIRECT_URI;
export const AUTH_ENDPOINT = process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT;
export const RESPONSE_TYPE = process.env.REACT_APP_SPOTFY_RESPONSE_TYPE
