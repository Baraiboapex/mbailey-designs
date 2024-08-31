import dayjs from "dayjs";
import db from "../dummyDB";
import APIErrorHandler from "../../errorHandlers/apiErrorHandlers";

const projects = {
    GET:{
        "/getLatestProjects":(data)=>{

        },
        "/searchProjects":(data)=>{

        },
        "/getProjectsByCategory":(data)=>{

        },
        "/getProjectCategories":(data)=>{

        },
        "/getProjectComments":(data)=>{

        },
    },
    POST:{
        "/addProject":(data)=>{

        },
    },
    PUT:{
        "/editProject":(data)=>{

        },
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

export default projects;