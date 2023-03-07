import request from './httpClient';

function callApi(urlParam, methodParam, param=null) {
    return request({
        url: urlParam,
        method: methodParam,
        data: param
    }, false)
}

const CommonServices = {
    callApi
}

export default CommonServices;