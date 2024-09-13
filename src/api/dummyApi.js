
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
        let currentConfig = {
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
            console.log("DATA",data);
            if(extraDataManipulator){
                resolve(extraDataManipulator(data));
            }else{
                console.log("TEST",data);
                resolve(data);
            }
        })
        .catch((err)=>{
            console.log("ERROR: ",err);
        })
    });
}

function dummyFetch(url, config){
    return new Promise(async (resolve, reject)=>{

        window.setTimeout(async ()=>{
            const callAPI = await callDummyAPI({
                route:url,
                data:(config.body ? config.body : null),
                httpMethod:(config.method ? config.method : "get")
            });
            
        console.log("CURRENT CONFIG:");
            console.log(callAPI);
            if(callAPI.response){
                resolve({
                    ok:true,
                    json:()=>new Promise ((resolve)=>{
                        const preStringify = JSON.stringify(callAPI);
                        console.log(preStringify);
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
    get:async({
        url,
        headers,
        otherConfig,
        requestContentType,
        extraDataManipulator
    })=>{
        try{
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
            
            const data = await callApi({
                url,
                body:(hasSearchParamEntries ? searchParamsQueryObject : null),
                headers,
                otherConfig,
                requestContentType,
                extraDataManipulator
            });
    
            console.log(data);
    
            return data;   
        }catch(err){
            console.log(err);
        }
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