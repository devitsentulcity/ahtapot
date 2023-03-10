import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'https://inapps.sentulcity.co.id/msales/',
  // baseURL: 'http://10.10.21.39:8080/msales/',
  // baseURL: 'http://10.10.20.36/msales',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;
