import axios from "axios";

const ApiManager = axios.create({
    baseURL: 'https://inapps.sentulcity.co.id/',
    responseType: 'json',
    withCredentials: true
});

export default ApiManager;