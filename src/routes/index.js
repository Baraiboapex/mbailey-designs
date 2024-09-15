import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path:"/",
        component:async()=>await import("../components/HomePage.vue"),
        meta:{},
        name:"Home"
    },
    {
        path:"/about",
        component:async()=>await import("../components/AboutPage.vue"),
        meta:{},
        name:"About"
    },
    {
        path:"/blog",
        component:async()=>await import("../components/BlogPage.vue"),
        name:"Blog",
        meta:{},
        children:[
            {
                path:"/blogpost/:id",
                component:async()=>await import("../components/SingleBlogPost.vue")
            }
        ]
    },
    {
        path:"/projects",
        component:async()=>await import("../components/ProjectsPage.vue"),
        name:"Projects",
        meta:{},
        children:[
            {
                path:"/projectpost/:id",
                component:async()=>await import("../components/SingleProjectPost.vue")
            }
        ]
    },
    {
        path:"/errors",
        component:async()=>await import("../components/ErrorsPage.vue"),
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