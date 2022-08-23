import React from "react";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
});
