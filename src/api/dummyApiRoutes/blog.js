import db from "../dummyDB";
import APIErrorHandler from "../../errorHandlers/apiErrorHandlers";
import searchPostsByFields from "../dummyAPIHelpers/searchPostsByFields";
import getPostsByLatestDates from "../dummyAPIHelpers/getPostsByLatestDates";
import getPostsByCategory from "../dummyAPIHelpers/getPostsByCategory";
import validateAllIncommingApiFields from "../dummyAPIHelpers/dummyApiFieldErrorChecker";

const blog = {
    GET:{
        "/getLatestBlogPosts":(data)=>{
            return new Promise((resolve,reject)=>{
                const currentData = db.blog.blogData;
                const hasData = db.blog.blogData.length > 0;

                if(hasData){
                    /*
                        This needs to be an sql stored proc
                        ==========================================================
                        Study search algorithms for creating an optimal stored proc
                        for this.
                    */
                        const filteredData = getPostsByLatestDates({
                            arrayToSearch:currentData,
                            howManyProjectsBackFromLatestDate:2
                        });
                        
                        resolve(filteredData);
                    /*
                        ==========================================================
                        Study search algorithms for creating an optimal stored proc
                        for this.
                    */
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/searchPosts":(data)=>{
            return new Promise((resolve,reject)=>{
                const currentData = db.blog.blogData;
                const hasData = db.blog.blogData.length > 0;

                if(hasData){
                    /*
                        This needs to be an sql stored proc
                        ==========================================================
                        Study search algorithms for creating an optimal stored proc
                        for this.
                    */
                        if(data.searchText !== "NULL"){
                            const filteredData = searchPostsByFields({
                                arrayToSearch:currentData,
                                searchText:data.searchText
                            });
                            
                            resolve(filteredData);
                        }else{
                            resolve(currentData);
                        } 
                        
                    /*
                        ==========================================================
                        Study search algorithms for creating an optimal stored proc
                        for this.
                    */
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getPostsByCategory":(data)=>{
            return new Promise((resolve,reject)=>{
                const currentData = db.blog.blogData;
                const hasData = db.blog.blogData.length > 0;

                if(hasData){
                    /*
                        This needs handled by entity framework relations
                        ==========================================================
                    */
                        const filteredData = getPostsByCategory({
                            arrayToSearch:currentData,
                            postCategories:data.postCategories
                        });
                        
                        resolve(filteredData);
                    /*
                        ==========================================================
                    */
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getPostCategories":(data)=>{
            return new Promise((resolve,reject)=>{
                const currentData = db.blog.categories;
                const hasData = db.blog.categories.length > 0;

                if(hasData){
                    return currentData;
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getPostComments":(data)=>{
            return new Promise((resolve,reject)=>{
                const currentData = db.blog.blogData;
                const hasData = db.blog.blogData.length > 0;

                if(hasData){

                    const filteredData = searchPostsByFields({
                        arrayToSearch:currentData,
                        searchText:data.postId,
                        fieldsToSearchBy:["id"]
                    });
                    
                    resolve(filteredData.blog);
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getSingleBlogPost":(data)=>{

        },
        "/addPostComment":(data)=>{
            
        }
    },
    POST:{
        "/addPosts":(data)=>{
            return new Promise((resolve,reject)=>{
                const hasData = db.blog.blogData.length > 0;
                const validateIncommingData = validateAllIncommingApiFields({
                    dataObject:data,
                    rules:{
                        content:(field)=> field !== null && field !== undefined && field !== "",
                        title:(field)=> field !== null && field !== undefined && field !== ""
                    }
                });

                if(hasData && validateIncommingData){
                    db.blog.blogData.push({
                        id:GenerateRandomIdInt(9999999999999999999999),
                        ...data,
                        categroies:[],
                        postComments:[]
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
    PUT:{
        "/editPosts":(data)=>{
            return new Promise((resolve,reject)=>{
                const hasData = db.blog.blogData.length > 0;

                if(hasData){
                    let currentObject = db.blog.blogData.find((item) => item.id === data.id);

                     currentObject.content = data.content;
                     currentObject.title = data.title;

                     resolve(data);
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

export default blog;