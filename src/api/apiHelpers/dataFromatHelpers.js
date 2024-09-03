const formatterHelpers = {
    json:{
        contentTypeHeader:"application/json",
        formatter:async (resp)=>await resp.json()
    },
    xml:{
        contentTypeHeader:"application/xml",
        formatter:async (resp)=>{
            //TBD
        }
    }
};

export default formatterHelpers;