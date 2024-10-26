import formatHelper from "./apiHelpers/dataFromatHelpers";
import callDummyAPI from "./dummyApiRouter";
import { checkIfFieldNotAllowedAsArray } from "./dummyAPIHelpers/apiQueryFieldsConfig";
function callApi({
    url,
    body,
    headers,
    method,
    otherConfig,
    requestContentType,
    extraDataManipulator
}){
    return new Promise(async (resolve, reject)=>{
        let currentConfig = {
            url,
        }

        if(method) currentConfig = {...currentConfig, method};
        if(body) currentConfig = {...currentConfig, body};
        if(headers) currentConfig = {...currentConfig, headers};
        if(otherConfig) currentConfig = {...currentConfig, ...otherConfig};

        console.log(
            requestContentType,
                extraDataManipulator,
            {
                url,
                body,
                headers,
                method,
                otherConfig,
                requestContentType,
                extraDataManipulator
            }
        )

        dummyFetch(url, currentConfig)
        .then((resp)=>getResponseData({
            resp,
            dataFormatter:formatHelper[requestContentType].formatter
        }))
        .then((data)=>{
            if(extraDataManipulator){
                resolve(extraDataManipulator(data));
            }else{
                resolve(data);
            }
        })
        .catch((err)=>{
            console.log("ERROR: ", url, err);
            reject(err);
        })
    });
}

function dummyFetch(url, config){
    return new Promise(async (resolve, reject)=>{
        
        window.setTimeout(async ()=>{
            try{
                const callAPI = await callDummyAPI({
                    route:url,
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
                    reject({
                        ok:false,
                        message:"Could not get data"
                    });
                }
            }catch(err){
                console.log(err);
                reject({
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
        }else{
            reject();
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
            const baseUrl = url.substring(0,url.includes("?") ? url.lastIndexOf("?") : url.length);
            const searchParams = url.substring(url.lastIndexOf("?") + 1, url.length);
            const urlParams = new URLSearchParams(searchParams);
            const searchParamsQueryObject = {};

            for (const [key, value] of urlParams.entries()) {
                console.log(key);
                if(!key.includes("/")){
                    if(checkIfFieldNotAllowedAsArray(key)){
                        searchParamsQueryObject[key] = value
                    }else{
                        searchParamsQueryObject[key] = value.split(",");
                    }
                }
            }

            console.log(searchParamsQueryObject);

            const hasSearchParamEntries = Object.keys(searchParamsQueryObject).length > 0;
            
            const data = await callApi({
                url:baseUrl,
                body:(hasSearchParamEntries ? searchParamsQueryObject : null),
                headers,
                otherConfig,
                requestContentType,
                extraDataManipulator
            });

            console.log("DATA", data);

            return data;   
        }catch(err){
            console.log("NOPE",err);
            throw err;
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
        method:"post",
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
        method:"put",
        otherConfig,
        requestContentType,
        extraDataManipulator
    })
}