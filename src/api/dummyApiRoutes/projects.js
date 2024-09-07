import db from "../dummyDB";
import APIErrorHandler from "../../errorHandlers/apiErrorHandlers";
import searchPostsByFields from "../dummyAPIHelpers/searchPostsByFields";
import getPostsByLatestDates from "../dummyAPIHelpers/getPostsByLatestDates";
import getPostsByCategory from "../dummyAPIHelpers/getPostsByCategory";
import validateAllIncommingApiFields from "../dummyAPIHelpers/dummyApiFieldErrorChecker";

const projects = {
    GET:{
        "/getLatestProjects":(data)=>{
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
        "/searchProjects":(data)=>{
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
        "/getProjectsByCategory":(data)=>{
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
        "/getProjectCategories":(data)=>{
            return new Promise((resolve,reject)=>{
                const currentData = db.projects.categories;
                const hasData = db.projects.categories > 0;

                if(hasData){
                    resolve(currentData);
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getProjectComments":(data)=>{
            return new Promise((resolve,reject)=>{
                const currentData = db.projects.projectsData;
                const hasData = db.projects.projectsData.length > 0;

                if(hasData){
                    const filteredData = searchPostsByFields({
                        arrayToSearch:currentData,
                        searchText:data.postId,
                        fieldsToSearchBy:["id"]
                    });

                    resolve(filteredData.projectComments);
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getSingleProjectPost":(data)=>{
            
        },
        "/requestAddProjectComment":(data)=>{
            
        },
        "/getSearchableFields":(data)=>{
            
        },
    },
    POST:{
        "/addProject":(data)=>{
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
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
    },
    PUT:{
        "/editProject":(data)=>{
            return new Promise((resolve,reject)=>{
                const hasData = db.projects.projectsData.length > 0;

                if(hasData){
                     let currentObject = db.projects.projectsData.find((item) => item.id === data.id);

                     currentObject.aboutProject = data.aboutProject;
                     currentObject.title = data.title;
                     currentObject.projectImage = data.projectImage;

                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
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
    },
    GenerateRandomIdInt(max) {
        return Math.floor(Math.random() * max);
    }
};

export default projects;