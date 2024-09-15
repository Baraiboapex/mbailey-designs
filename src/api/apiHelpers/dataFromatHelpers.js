const formatterHelpers = {
    "application/json":{
        contentTypeHeader:"application/json",
        formatter:async (resp)=>await resp.json()
    },
    "application/xml":{
        contentTypeHeader:"application/xml",
        formatter:async (resp)=>{
            //TBD
        }
    }
};

export default formatterHelpers;