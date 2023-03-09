import request from './httpClient';

function callApi(urlParam, methodParam, param=null, content=null) {
    return request({
        url: urlParam,
        method: methodParam,
        data: param,
        content: content
    }, false)
}

const CommonServices = {
    callApi
}

export default CommonServices;