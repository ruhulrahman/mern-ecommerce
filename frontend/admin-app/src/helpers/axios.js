import axios from "axios";
import { baseURL } from "../urlConfig";
import store from "../store";
import { authConstants } from "../actions/constants";

const token = window.localStorage.getItem("token");

const RestApi = axios.create({
  baseURL: baseURL,
  // timeout: 1000,
  headers: {
    // 'Accept': 'application/json',
    Authorization: token ? `Bearer ${token}` : "",
    // 'Access-Control-Allow-Origin': '*',
  },
});

// Add a request interceptor
RestApi.interceptors.request.use(function (req) {
  // Do something before request is sent
  const { auth } = store.getState()
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`
  }
  return req;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
RestApi.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;

}, function (error) {
  console.log(error.response)
  const { status } = error.response
  if (status === 500) {
    localStorage.clear()
    store.dispatch({ 
        type: authConstants.LOGOUT_SUCCESS,
        message: 'Logout success',
    })
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default RestApi;
