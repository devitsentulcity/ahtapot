import axios from 'axios';

export const BASE_URL = 'https://inapps.sentulcity.co.id/msales/';
// export const BASE_URL = 'http://10.10.20.36/oss/oss_be/';

const request = async function (
  options,
  isHeader = true,
  custom_url = BASE_URL,
) {
  let authHeader = null;

  if (isHeader) {
    authHeader = GetString('x-token', false);
  }

  let optDefault = {
    baseURL: custom_url,
    headers: {'x-token': authHeader},
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
