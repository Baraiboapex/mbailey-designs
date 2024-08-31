import dayjs from "dayjs";
import db from "../dummyDB";
import APIErrorHandler from "../../errorHandlers/apiErrorHandlers";

const error = {
    GET:{
        "/getLatestErrors":(data)=>{

        },
        "/searchErrors":(data)=>{
            
        }
    },
    POST:{
        "/addError":(data)=>{

        }
    },
    HandleError:({
        resCode,
        errorMessage
    })=>{
        const errorHandler = new APIErrorHandler({
            resCode,
            errorMessage
        });
        return errorHandler;
    }
};

export default error;