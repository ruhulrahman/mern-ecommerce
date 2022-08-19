import axios from 'axios'
import { baseURL } from '../urlConfig';

const token = window.localStorage.getItem('token')

const RestApi = axios.create({
    baseURL: baseURL,
    // timeout: 1000,
    headers: {
        // 'Accept': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        // 'Access-Control-Allow-Origin': '*',
        // 'X-Custom-Header': 'foobar'
    }
  });

export default RestApi