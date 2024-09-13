import db from "../dummyDB";
import APIErrorHandler from "../../errorHandlers/apiErrorHandlers";
import searchPostsByFields from "../dummyAPIHelpers/searchPostsByFields";
import getPostsByLatestDates from "../dummyAPIHelpers/getPostsByLatestDates";
import getPostsByCategory from "../dummyAPIHelpers/getPostsByCategory";
import validateAllIncommingApiFields from "../dummyAPIHelpers/dummyApiFieldErrorChecker";

import {v4} from "uuid";

const blog = {
    GET:{
        "/getLatestBlogPosts":function(data){
            return new Promise((resolve,reject)=>{
                const currentData = db.blog.blogData;
                const hasData = db.blog.blogData.length > 0;

                if(hasData){
                    /*
                        This needs to be an sql stored proc
                        ==========================================================
                        Study search algorithms for creating an optimal stored proc
                        for 
                    */
                        const filteredData = getPostsByLatestDates({
                            arrayToSearch:currentData,
                            howManyProjectsBackFromLatestDate:2
                        });
                        
                        resolve(filteredData);
                    /*
                        ==========================================================
                        Study search algorithms for creating an optimal stored proc
                        for 
                    */
                }else{
                    reject(HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/searchPosts":function(data){
            return new Promise((resolve,reject)=>{
                const currentData = db.blog.blogData;
                const hasData = db.blog.blogData.length > 0;

                if(hasData){
                    /*
                        This needs to be an sql stored proc
                        ==========================================================
                        Study search algorithms for creating an optimal stored proc
                        for 
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
                    reject(HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getPostsByCategory":function(data){
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
                    reject(HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getPostCategories":function(data){
            return new Promise((resolve,reject)=>{
                const currentData = db.blog.categories;
                const hasData = db.blog.categories.length > 0;

                if(hasData){
                    return currentData;
                }else{
                    reject(HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getPostComments":function(data){
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
                    reject(HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getSingleBlogPost":function(data){
            return new Promise((resolve, reject)=>{
                const currentData = db.blog.blogData;
                const hasData = db.blog.blogData.length > 0;

                if(hasData){
                    const getPost = currentData.find((blogPost)=>blogPost.id === data.blogPostId);
                    if(getPost !== null){
                        resolve(getPost);
                    }else{
                        reject(HandleError({
                            resCode:404,
                            errorMessage:"Could Not Find Any Data"
                        }));
                    }
                }else{
                    reject(HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/requestAddPostComment":function(data){
            return new Promise((resolve, reject)=>{
                const hasData = Object.keys(data).length > 0;

                data.id = v4();

                if(hasData){
                    console.log("Comment request sent to post blog comment", data);
                    resolve();
                }else{
                    reject(HandleError({
                        resCode:404,
                        errorMessage:"Comment does not have any data"
                    }));
                }
            });
        },
        "/getSearchableFields":function(data){
            return new Promise((resolve, reject)=>{
                const currentData = db.blog.searchableFieldsTypes;
                const hasData = db.blog.searchableFieldsTypes > 0;

                if(hasData){
                    resolve(currentData);
                }else{
                    reject(HandleError({
                        resCode:404,
                        errorMessage:"Could not get data"
                    }));
                }
            });
        },
    },
    POST:{
        "/addPosts":function(data){
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
                    reject(HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        }
    },
    PUT:{
        "/editPosts":function(data){
            return new Promise((resolve,reject)=>{
                const hasData = db.blog.blogData.length > 0;

                if(hasData){
                    let currentObject = db.blog.blogData.find((item) => item.id === data.id);

                     currentObject.content = data.content;
                     currentObject.title = data.title;

                     resolve(data);
                }else{
                    reject(HandleError({
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