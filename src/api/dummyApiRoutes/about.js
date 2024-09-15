import db from "../dummyDB";
import APIErrorHandler from "../../errorHandlers/apiErrorHandlers";
import getPostsByLatestDates from "../dummyAPIHelpers/getPostsByLatestDates";

const about = {
    GET:{
        "/getLatestAboutInfo":function(data){
            return new Promise((resolve,reject)=>{
                const currentData = db.about.aboutData;
                const hasData = db.about.aboutData.length > 0;
                
                if(hasData){
                    const filteredData = getPostsByLatestDates({
                        arrayToSearch:currentData,
                        howManyProjectsBackFromLatestDate:1
                    });
                    
                    resolve({response:filteredData});
                }else{
                    // reject(HandleError({
                    //     resCode:404,
                    //     errorMessage:"Could Not Find Any Data"
                    // }));
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

export default about;