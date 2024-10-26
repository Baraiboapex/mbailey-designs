import db from "../dummyDB";
import APIErrorHandler from "../../errorHandlers/apiErrorHandlers";
import getPostsByLatestDates from "../dummyAPIHelpers/getPostsByLatestDates";
import dummyApiFieldErrorChecker from "../dummyAPIHelpers/dummyApiFieldErrorChecker";

const contactInfo = {
    GET:{
        "/getLatesContactInfo":function(data){
            return new Promise((resolve,reject)=>{
                const currentData = [...db.about.aboutData];
                const hasData = currentData.length > 0;

                if(hasData){
                    const filteredData = getPostsByLatestDates({
                        arrayToSearch:currentData,
                        howManyProjectsBackFromLatestDate:1
                    });

                    resolve({response:filteredData});
                }else{
                    reject(HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
    },
    POST:{
        "/submitContactInfo":function(data){
            return new Promise((resolve,reject)=>{
                const checkEmailObject = dummyApiFieldErrorChecker({
                    dataObject:data,
                    rules:{
                        name:(field)=> field !== null && field !== undefined && field !== "",
                        email:(field)=> field !== null && field !== undefined && field !== "",
                        phoneNumber:(field)=> field !== null && field !== undefined && field !== ""
                    }
                });

                if(checkEmailObject){
                    console.log(
                        "EMAIL SENT TO " + 
                        data.emailAddress + 
                        " Using the email template" + 
                        data.emailTemplate
                    );
                }else{
                    reject(HandleError({
                        resCode:400,
                        errorMessage:"Could Not Send Contact Data"
                    }));
                }
            });
        }
    },
    HandleError({
        resCode,
        errorMessage
    }){
        const errorHandler = new APIErrorHandler({
            resCode,
            errorMessage
        });
        return errorHandler;
    }
};

export default contactInfo;