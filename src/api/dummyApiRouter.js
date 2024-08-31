import about from "./dummyApiRoutes/about";
import errors from "./dummyApiRoutes/errors";
import blog from "./dummyApiRoutes/blog";
import home from "./dummyApiRoutes/home";
import projects from "./dummyApiRoutes/projects";

const router = {
    "/api/home":about,
    "/api/errors":errors,
    "/api/blog":blog,
    "/api/home":home,
    "/api/projects":projects
}

const callDummyAPI = ({
    route,
    data,
    httpMethod
})=>{
    const childRoute = route.substring(route.lastIndexOf("/"), route.length);
    if(data){
        router[route][childRoute]({data, httpMethod})
    }else{
        router[route][childRoute]({httpMethod});
    }
}

export default callDummyAPI;