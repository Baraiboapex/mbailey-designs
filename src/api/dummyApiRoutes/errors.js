import db from "../dummyDB";
import APIErrorHandler from "../../errorHandlers/apiErrorHandlers";
import getPostsByLatestDates from "../dummyAPIHelpers/getPostsByLatestDates";
import searchPostsByFields from "../dummyAPIHelpers/searchPostsByFields";

const error = {
    GET:{
        "/getLatestErrors":(data)=>{
            return new Promise((resolve,reject)=>{
                const currentData = db.errors.errorData;
                const hasData = db.errors.errorData.length > 0;

                if(hasData){
                    const filteredData = getPostsByLatestDates({
                        arrayToSearch:currentData,
                        howManyProjectsBackFromLatestDate:2
                    });
                    return filteredData;
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/searchErrors":(data)=>{
            return new Promise((resolve,reject)=>{
                const currentData = db.errors.errorData;
                const hasData = db.errors.errorData.length > 0;

                if(hasData){
                    const filteredData = searchPostsByFields({
                        arrayToSearch:currentData,
                        searchText:data.searchText,
                    });

                    return filteredData;
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        }
    },
    POST:{
        "/addError":(data)=>{
            return new Promise((resolve,reject)=>{
                const hasData = db.errors.errorData.length > 0;
                const validateIncommingData = validateAllIncommingApiFields({
                    dataObject:data,
                    rules:{
                        message:(field)=> field !== null && field !== undefined && field !== "",
                        datePosted:(field)=> field !== null && field !== undefined && field !== ""
                    }
                });

                if(hasData && validateIncommingData ){
                    db.errors.errorData.push({
                        id:GenerateRandomIdInt(99999999999999999999),
                        ...data
                    });
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
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
    },
    GenerateRandomIdInt(max) {
        return Math.floor(Math.random() * max);
    }
};

export default error;