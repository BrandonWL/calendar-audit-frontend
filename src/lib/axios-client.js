import axios from "axios";
import jwt_decode from "jwt-decode";

const authRequestInterceptor = (config) => {
  const id_token = localStorage.getItem("id_token");

  // No refresh token
  if (id_token === "null") {
    window.location.replace(`${window.location.origin}/login`);
    return;
  }

  // Refresh token expired
  const claims = jwt_decode(id_token);
  if (claims.exp * 1000 < Date.now()) {
    window.location.replace(`${window.location.origin}/login`);
    return;
  }

  config.headers.authorization = `${id_token}`; // eslint-disable-line no-param-reassign
  config.headers.Accept = "application/json"; // eslint-disable-line no-param-reassign
  return config;
};

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
});

axiosClient.interceptors.request.use(authRequestInterceptor);

export const axiosClientNoAuth = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
});
