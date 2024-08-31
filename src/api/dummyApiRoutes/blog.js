import dayjs from "dayjs";
import db from "../dummyDB";
import APIErrorHandler from "../../errorHandlers/apiErrorHandlers";

const blog = {
    GET:{
        "/getLatestBlogPosts":(data)=>{

        },
        "/searchPosts":(data)=>{
            
        },
        "/getPostsByCategory":(data)=>{
            
        },
        "/getPostCategories":(data)=>{
            
        },
        "/getPostComments":(data)=>{

        }
    },
    POST:{
        "/addPosts":(data)=>{

        }
    },
    PUT:{
        "/editPosts":(data)=>{

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

export default blog;