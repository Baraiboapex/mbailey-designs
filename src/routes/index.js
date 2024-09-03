import { createMemoryHistory, createRouter } from 'vue-router';

function lazyLoadComponent({
    componentName
}){
    return import("../components/"+componentName+".vue");
}

const routes = [
    {
        path:"/",
        component:lazyLoadComponent("HomePage")
    },
    {
        path:"/about",
        component:lazyLoadComponent("AboutPage")
    },
    {
        path:"/blog",
        component:lazyLoadComponent("BlogPage"),
        children:[
            {
                path:"/blogpost/:id",
                component:lazyLoadComponent("SingleBlogPost")
            }
        ]
    },
    {
        path:"/errors",
        component:lazyLoadComponent("ErrorsPage"),
        meta:{
            requiresAdmin:true
        }
    },
    {
        path:"/projects",
        component:lazyLoadComponent("ProjectsPage"),
        children:[
            {
                path:"/projectpost/:id",
                component:lazyLoadComponent("SingleProjectPost")
            }
        ]
    }
]

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