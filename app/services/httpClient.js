import axios from 'axios';

// export const BASE_URL = 'https://inapps.sentulcity.co.id/msales/';
export const BASE_URL = 'http://10.10.21.39:8080/msales/';
import { store } from '@store';

const getToken = () => store.getState().auth?.user?.token;
const request = async function (
  options,
  isHeader = true,
  custom_url = BASE_URL,
) {
  let authHeader = null;

  if (getToken() !== null) {
    authHeader = getToken();
  }

  let optDefault = {
    baseURL: custom_url,
    headers: { 
      'Authorization': 'Bearer ' + authHeader
    },
    timeout: 60000,
    maxContentLength: 150 * 1000 * 1000,
  };

  const client = axios.create(optDefault);

  const onSuccess = function (response) {
    return response.data;
  };

  const onError = function (error) {
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
