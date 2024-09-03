import db from "../dummyDB";
import APIErrorHandler from "../../errorHandlers/apiErrorHandlers";

const about = {
    GET:{
        "/getLatestAboutInfo":(data)=>{
            return new Promise((resolve,reject)=>{
                const currentData = db.about.aboutData;
                const hasData = db.about.aboutData.length > 0;
                
                if(hasData){
                    const filteredData = getPostsByLatestDates({
                        arrayToSearch:currentData,
                        howManyProjectsBackFromLatestDate:1
                    });
                    
                    resolve(filteredData);
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
    }
};

export default about;