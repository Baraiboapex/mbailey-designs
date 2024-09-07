import { createMemoryHistory, createRouter } from 'vue-router';

function lazyLoadComponent({
    componentName
}){
    return import("../components/"+componentName+".vue");
}

const routes = [
    {
        path:"/",
        component:lazyLoadComponent("HomePage"),
        name:"Home"
    },
    {
        path:"/about",
        component:lazyLoadComponent("AboutPage"),
        name:"About"
    },
    {
        path:"/blog",
        component:lazyLoadComponent("BlogPage"),
        name:"Blog",
        children:[
            {
                path:"/blogpost/:id",
                component:lazyLoadComponent("SingleBlogPost")
            }
        ]
    },
    {
        path:"/projects",
        component:lazyLoadComponent("ProjectsPage"),
        name:"Projects",
        children:[
            {
                path:"/projectpost/:id",
                component:lazyLoadComponent("SingleProjectPost")
            }
        ]
    },
    {
        path:"/errors",
        component:lazyLoadComponent("ErrorsPage"),
        name:"Errors",
        meta:{
            requiresAdmin:true
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to,from)=>{
    if(to.meta.requiresAdmin){
        return {
            path:from.path
        }
    }
});

export default router;