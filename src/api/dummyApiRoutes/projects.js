import db from "../dummyDB";
import APIErrorHandler from "../../errorHandlers/apiErrorHandlers";
import searchPostsByFields from "../dummyAPIHelpers/searchPostsByFields";
import getPostsByLatestDates from "../dummyAPIHelpers/getPostsByLatestDates";
import getPostsByCategory from "../dummyAPIHelpers/getPostsByCategory";
import getAllPostFieldValuesByFieldType from "../dummyAPIHelpers/getAllPostFieldValuesByFieldType";
import validateAllIncommingApiFields from "../dummyAPIHelpers/dummyApiFieldErrorChecker";

const projects = {
    GET:{
        "/getLatestProjects":function(data){
            return new Promise((resolve,reject)=>{
                const currentData = [...db.projects.projectsData];
                const hasData = currentData.length > 0;

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
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/searchProjects":function(data){
            return new Promise((resolve,reject)=>{
                const currentData = [...db.projects.projectsData];
                const hasData = currentData.length > 0;

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

                        console.log("PROJECTS SEARCH RESULTS", filteredData, data.searchText);

                        if(filteredData.length < 1){
                            reject(this.HandleError({
                                resCode:404,
                                errorMessage:"Could Not Find Requested Blog Post"
                            }));
                        }

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
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getProjectsByCategory":function(data){
            return new Promise((resolve,reject)=>{
                const currentData = [...db.projects.projectsData];
                const hasData = currentData.length > 0;

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
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getProjectCategories":function(data){
            return new Promise((resolve,reject)=>{
                const currentData = [...db.projects.categories];
                const hasData = currentData.length > 0;

                if(hasData){
                    resolve({response:currentData});
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getProjectComments":function(data){
            return new Promise((resolve,reject)=>{
                const currentData = [...db.projects.projectComments];
                const hasData = currentData.length > 0;

                if(hasData){
                    const filteredData = searchPostsByFields({
                        arrayToSearch:currentData,
                        searchText:parseInt(data.projectId),
                        fieldsToSearchBy:["projectId"]
                    });

                    resolve({response:filteredData});
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getSingleProjectPost":function(data){
            return new Promise((resolve, reject)=>{
                const currentData = [...db.projects.projectsData];
                const hasData = currentData.length > 0;

                if(hasData){
                    const getProject = currentData.find((p)=>p.id === parseInt(data.projectId));
                    if(getProject !== null){
                        resolve({response:getProject});
                    }else{
                        reject(this.HandleError({
                            resCode:404,
                            errorMessage:"Could Not Find Any Data"
                        }));
                    }
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
        },
        "/getSearchableFields":function(data){
            return new Promise((resolve, reject)=>{
                const currentData = [...db.projects.searchableFieldsTypes];
                const hasData = currentData.length > 0;

                if(hasData){
                    resolve(currentData);
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could not get data"
                    }));
                }
            });
        },
        "/getProjectFieldValues":function(data){
            return new Promise((resolve, reject)=>{
                const currentData = [...db.projects.searchableFieldsTypes];
                const hasData = currentData.length > 0;

                const postFieldValues = getAllPostFieldValuesByFieldType({
                    itemsArray:currentData,
                    fieldName:data.fieldName
                });

                if(hasData){
                    if(postFieldValues.length > 1){
                        resolve({response:postFieldValues})
                    }else{
                        reject(this.HandleError({
                            resCode:404,
                            errorMessage:"Could Not Get Data For Selected Field"
                        }));
                    }
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Get Data For Selected Field"
                    }));
                }
            });
        },
        "/searchProjectsByFilters":function(data){
            return new Promise((resolve, reject)=>{
                const currentData = [...db.blog.blogData];
                const hasData = currentData.length > 0;

                if(hasData){
                    
                    const filteredData = searchPostsByFieldsAndValues({ 
                        arrayToSearch:currentData, 
                        fieldsToSearchBy:data
                    });

                    if(filteredData.length < 1){
                        reject(this.HandleError({
                            resCode:404,
                            errorMessage:"Could Not Find Requested Blog Post"
                        }));
                    }

                    resolve({response:filteredData});
                }else{
                    reject(this.HandleError({
                        resCode:404,
                        errorMessage:"Could Not Find Any Data"
                    }));
                }
            });
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
        },
        GenerateRandomIdInt(max) {
            return Math.floor(Math.random() * max);
        }
    },
    POST:{
        "/requestAddProjectComment":function(data){
            return new Promise((resolve, reject)=>{
                const hasData = Object.keys(data).length > 0;
                
                data.id = this.GenerateRandomIdInt(9999999999999999999999);

                if(hasData){
                    resolve({response:{success:true}});
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
        HandleError({
            resCode,
            errorMessage
        }){
            const errorHandler = new APIErrorHandler({
                resCode,
                errorMessage
            });
            return errorHandler;
        },
        GenerateRandomIdInt(max) {
            return Math.floor(Math.random() * max);
        }
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
        HandleError({
            resCode,
            errorMessage
        }){
            const errorHandler = new APIErrorHandler({
                resCode,
                errorMessage
            });
            return errorHandler;
        },
        GenerateRandomIdInt(max) {
            return Math.floor(Math.random() * max);
        }
    },
};

export default projects;