import dayjs from "dayjs";
import db from "../dummyDB";
import APIErrorHandler from "../../errorHandlers/apiErrorHandlers";

const about = {
    GET:{
        "/getLatestAboutInfo":(data)=>{
            return new Promise((resolve,reject)=>{
                const currentData = db.about.aboutData;
                const hasData = db.about.aboutData.length > 0;
                
                if(hasData){
                    const getCurrentAboutData = currentData.find((aboutData)=>{
                        return aboutData.dateCreated === dayjs();
                    });
                    resolve(getCurrentAboutData);
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }))
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