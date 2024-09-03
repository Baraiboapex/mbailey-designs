import about from "./dummyApiRoutes/about";
import errors from "./dummyApiRoutes/errors";
import blog from "./dummyApiRoutes/blog";
import home from "./dummyApiRoutes/home";
import projects from "./dummyApiRoutes/projects";
import contact from "./dummyDBRoutes/contact";

const router = {
    "/api/home":about,
    "/api/errors":errors,
    "/api/blog":blog,
    "/api/home":home,
    "/api/projects":projects,
    "/api/contact":contact
}

const callDummyAPI = ({
    route,
    data,
    httpMethod
})=>{
    const childRoute = route.substring(route.lastIndexOf("/"), route.length);
    if(data){
        router[httpMethod][route][childRoute](data)
    }else{
        router[httpMethod][route][childRoute]();
    }
}

export default callDummyAPI;