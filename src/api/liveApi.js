
import formatHelper from "./apiHelpers/dataFromatHelpers";

function callApi({
    url,
    body,
    headers,
    otherConfig,
    requestContentType,
    extraDataManipulator
}){
    return new Promise(async (resolve, reject)=>{
        const currentConfig = {
            url,
        }

        if(body) currentConfig = {...currentConfig, body};
        if(headers) currentConfig = {...currentConfig, headers};
        if(otherConfig) currentConfig = {...currentConfig, ...otherConfig};

        fetch(url, currentConfig)
        .then((resp)=>getResponseData({
            resp,
            dataFormatter:formatHelper[requestContentType]
        }))
        .then((data)=>{
            if(extraDataManipulator){
                resolve(extraDataManipulator(data));
            }else{
                resolve(data);
            }
        })
        .catch()
    });
}

function getResponseData({resp, dataFormatter}){
    return new Promise(async (resolve, reject)=>{
        if(resp.ok){
            const formattedData = dataFormatter(resp);
            resolve(formattedData);
        }
    });
}

export default {
    get:({
        url,
        headers,
        otherConfig
    })=>callApi({
        url,
        body:null,
        headers,
        otherConfig
    }),
    post:({
        url,
        body,
        headers,
        otherConfig
    })=>callApi({
        url,
        body,
        headers,
        otherConfig
    }),
    put:({
        url,
        body,
        headers,
        otherConfig
    })=>callApi({
        url,
        body,
        headers,
        otherConfig
    })
}