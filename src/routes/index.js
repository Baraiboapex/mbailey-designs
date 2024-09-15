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
        name:"Blog",
        meta:{},
        children:[
            {
                path:"",
                component:async()=>await import("../components/BlogPage.vue"),
            },
            {
                path:"singleBlog/:id",
                component:async()=>await import("../components/SingleBlogPost.vue")
            }
        ]
    },
    {
        path:"/projects",
        name:"Projects",
        meta:{},
        children:[
            {
                path:"",
                component:async()=>await import("../components/ProjectsPage.vue"),
            },
            {
                path:"singleProject/:id",
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