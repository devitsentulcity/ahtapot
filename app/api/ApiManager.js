import axios from 'axios';

const ApiManager = axios.create({
  // baseURL: 'https://inapps.sentulcity.co.id/msales/',
  baseURL: 'http://10.10.20.36/oss/oss_be/',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;
