import db from "../dummyDB";
import APIErrorHandler from "../../errorHandlers/apiErrorHandlers";
import searchPostsByFields from "../dummyAPIHelpers/searchPostsByFields";
import getPostsByLatestDates from "../dummyAPIHelpers/getPostsByLatestDates";
import getPostsByCategory from "../dummyAPIHelpers/getPostsByCategory";
import validateAllIncommingApiFields from "../dummyAPIHelpers/dummyApiFieldErrorChecker";

const projects = {
    GET:{
        "/getLatestProjects":function(data){
            return new Promise((resolve,reject)=>{
                const currentData = db.projects.projectsData;
                const hasData = db.projects.projectsData.length > 0;

                if(hasData){
                    /*
                        This needs to be an sql stored proc
                        ==========================================================
                        Study search algorithms for creating an optimal stored proc
                        for this.
                    */
                        const filteredData =getPostsByLatestDates({
                            arrayToSearch:currentData,
                            howManyProjectsBackFromLatestDate:2
                        });

                        resolve({response:filteredData});
                    /*
                        ==========================================================
                        Study search algorithms for creating an optimal stored proc
                        for this.
                    */
                }else{
                    // reject(HandleError({
                    //     resCode:404,
                    //     errorMessage:"Could Not Find Any Data"
                    // }));
                }
            });
        },
        "/searchProjects":function(data){
            return new Promise((resolve,reject)=>{
                const currentData = db.projects.projectsData;
                const hasData = db.projects.projectsData.length > 0;

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
                            searchText:data.searchText,
                            fieldsToSearchBy:[]
                        });

                        resolve({response:filteredData});
                    }else{
                        resolve({response:currentData});
                    }
                   /*
                        ==========================================================
                        Study search algorithms for creating an optimal stored proc
                        for this.
                    */
                }else{
                    // reject(HandleError({
                    //     resCode:404,
                    //     errorMessage:"Could Not Find Any Data"
                    // }));
                }
            });
        },
        "/getProjectsByCategory":function(data){
            return new Promise((resolve,reject)=>{
                const currentData = db.projects.projectsData;
                const hasData = db.projects.projectsData.length > 0;

                if(hasData){
                    /*
                        This needs handled by entity framework relations
                        ==========================================================
                    */
                        const filteredData = getPostsByCategory({
                            arrayToSearch:currentData,
                            postCategories:data.postCategories
                        });

                        resolve({response:filteredData});
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
        "/getProjectCategories":function(data){
            return new Promise((resolve,reject)=>{
                const currentData = db.projects.categories;
                const hasData = db.projects.categories > 0;

                if(hasData){
                    resolve({response:currentData});
                }else{
                    reject(HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getProjectComments":function(data){
            return new Promise((resolve,reject)=>{
                const currentData = db.projects.projectsData;
                const hasData = db.projects.projectsData.length > 0;

                if(hasData){
                    const filteredData = searchPostsByFields({
                        arrayToSearch:currentData,
                        searchText:data.postId,
                        fieldsToSearchBy:["id"]
                    });

                    resolve({response:filteredData.projectComments});
                }else{
                    reject(HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getSingleProjectPost":function(data){
            return new Promise((resolve, reject)=>{
                const currentData = db.projects.categories;
                const hasData = db.projects.categories > 0;

                if(hasData){
                    const getProject = currentData.find((project)=>project.id === data.projectId);
                    if(getProject !== null){
                        resolve({response:getProject});
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
        "/getSearchableFields":function(data){
            return new Promise((resolve, reject)=>{
                const currentData = db.projects.searchableFieldsTypes;
                const hasData = db.projects.searchableFieldsTypes > 0;

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
        "/requestAddProjectComment":function(data){
            return new Promise((resolve, reject)=>{
                const hasData = Object.keys(data).length > 0;
                
                data.id = GenerateRandomIdInt(9999999999999999999999);

                if(hasData){
                    console.log("Comment request sent to post project comment", data);
                    resolve();
                }else{
                    reject(HandleError({
                        resCode:404,
                        errorMessage:"Comment does not have any data"
                    }));
                }
            });       
        },
        "/addProject":function(data){
            return new Promise((resolve,reject)=>{
                const hasData = db.projects.projectsData.length > 0;
                const validateIncommingData = validateAllIncommingApiFields({
                    dataObject:data,
                    rules:{
                        aboutProject:(field)=> field !== null && field !== undefined && field !== "",
                        title:(field)=> field !== null && field !== undefined && field !== "",
                        projectImage:(field)=> field !== null && field !== undefined && field !== "",
                    }
                });

                if(hasData && validateIncommingData){
                    db.projects.projectsData.push({
                        id:GenerateRandomIdInt(99999999999999999),
                        ...data,
                        projectComments:[],
                        categories:[]
                    });
                }else{
                    reject(HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
    },
    PUT:{
        "/editProject":function(data){
            return new Promise((resolve,reject)=>{
                const hasData = db.projects.projectsData.length > 0;

                if(hasData){
                     let currentObject = db.projects.projectsData.find((item) => item.id === data.id);

                     currentObject.aboutProject = data.aboutProject;
                     currentObject.title = data.title;
                     currentObject.projectImage = data.projectImage;

                }else{
                    reject(HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
    },
    HandleError({
        resCode,
        errorMessage
    }){
        console.log(errorMessage);
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

export default projects;