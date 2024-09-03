import about from "./dummyApiRoutes/about";
import errors from "./dummyApiRoutes/errors";
import blog from "./dummyApiRoutes/blog";
import projects from "./dummyApiRoutes/projects";
import contact from "./dummyDBRoutes/contact";

const router = {
    "/api/about":about,
    "/api/errors":errors,
    "/api/blog":blog,
    "/api/projects":projects,
    "/api/contact":contact
};

const callDummyAPI = async ({
    route,
    data,
    httpMethod
})=>{
    const childRoute = route.substring(route.lastIndexOf("/"), route.length);

    let resp = null;

    if(data){
        resp = await router[httpMethod][route][childRoute](data)
    }else{
        resp = await router[httpMethod][route][childRoute]();
    }

    return resp;
}

export default callDummyAPI;