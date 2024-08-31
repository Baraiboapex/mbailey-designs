import dayjs from "dayjs";
import db from "../dummyDB";
import APIErrorHandler from "../../errorHandlers/apiErrorHandlers";

const contactInfo = {
    GET:{
        "/getLatesContactInfo":(data)=>{
            
        },
    },
    POST:{
        "/submitContactInfo":(data)=>{

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

export default contactInfo;