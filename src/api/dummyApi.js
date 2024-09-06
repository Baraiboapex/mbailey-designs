
import { has } from "lodash";
import formatHelper from "./apiHelpers/dataFromatHelpers";
import callDummyAPI from "./dummyApiRouter";

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

        dummyFetch(url, currentConfig)
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

function dummyFetch(url, config){
    return new Promise(async (resolve, reject)=>{
        console.log("CURRENT CONFIG:");
        console.table(config);

        window.setTimeout(()=>{
            const callAPI = callDummyAPI({
                url,
                data:(config.body ? config.body : null),
                httpMethod:(config.method ? config.method : "get")
            });

            if(callAPI.response){
                resolve({
                    ok:true,
                    json:()=>new Promise ((resolve)=>{
                        const preStringify = JSON.stringify(callAPI);
                        resolve(JSON.parse(preStringify))
                    })
                });
            }else{
                resolve({
                    ok:false,
                    message:"Could not get data"
                });
            }
        },1500);
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
        otherConfig,
        requestContentType,
        extraDataManipulator
    })=>{
        const searchParams = url.substring(url.lastIndexOf("?") + 1, url.length);
        const urlParams = new URLSearchParams(searchParams);
        const searchParamEntries = urlParams.entries();
        const hasSearchParamEntries = searchParamEntries.length > 0;
        const searchParamsQueryObject = {};

        if(hasSearchParamEntries){
            searchParamEntries.forEach((entry) => {
                const key = entry[0];
                const value = entry [1];

                searchParamsQueryObject[key] = value;
            });
        }
        
        callApi({
            url,
            body:(hasSearchParamEntries ? searchParamsQueryObject : null),
            headers,
            otherConfig,
            requestContentType,
            extraDataManipulator
        })
    },
    post:({
        url,
        body,
        headers,
        otherConfig,
        requestContentType,
        extraDataManipulator
    })=>callApi({
        url,
        body,
        headers,
        otherConfig,
        requestContentType,
        extraDataManipulator
    }),
    put:({
        url,
        body,
        headers,
        otherConfig,
        requestContentType,
        extraDataManipulator
    })=>callApi({
        url,
        body,
        headers,
        otherConfig,
        requestContentType,
        extraDataManipulator
    })
}