
<template>
  <div class="p-2">
    <div class="row item-frame mt-5">
      <div class="col-12">
        <h1 class="mt-2">Home</h1>
        <p class="mt-4 mb-2">Hello! Welcome to mbailey-designs! chances are you were given this link after meeting me in person, or reciving a job application I filled out so feel free to stick around and browse!</p>
      </div>
    </div>
    <div class="row p-0">
      <div class="col-12 p-0">
        <section class="page-content">
          <!-- <div v-if="introDataLoaded" class="item-frame">
              <div class="row">
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center justify-content-center pt-5 pb-4">
                  <img class="owner-image" :src="state.homeData.introData.ownerImage"/>
                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="d-flex p-2 flex-column flex-wrap">
                    <h3>{{ state.homeData.introData.title }}</h3>
                    <p>{{ state.homeData.introData.message }}</p>
                  </div>
                </div>
              </div>
          </div>
          <div v-else>
            <LoadingSign
              :showLoadingSign="!introDataLoaded"
              loadingMessageText="Loading intro data..."
            />
          </div> -->
        </section>
      </div>
    </div>
    <!-- <div class="row pt-5">
      <div class="col-12 pt-5">
        <section class="page-content">
          <h2 class="mb-4">Latest Blog Posts</h2>
          <PostListComponent
            :listItems="state.homeData.blogPosts"
            :canSelectListItems="true"
            :dataLoadingMessage="BLOG_POSTS_LOADING_MESSAGE"
            :parentRoute="PARENT_BLOG_POSTS_ROUTE"
            :imageField="null"
            titleField="title"
            contentField="content"
            postIdField="id"
          />
        </section>
      </div>
    </div> -->
    <div class="row pt-5">
      <div class="col-12 p-0">
        <section class="page-content">
          <h2 class="mb-4">Latest Project Posts</h2>
          <PostListComponent
            :listItems="state.homeData.projectPosts"
            :canSelectListItems="true"
            :dataLoadingMessage="PROJECTS_LOADING_MESSAGE"
            :parentRoute="PARENT_PROJECT_POSTS_ROUTE"
            titleField="title"
            contentField="aboutProject"
            postIdField="id"
            imageField="projectImage"
          />
        </section>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { reactive, onMounted, computed } from "vue";
  import api from "../api/dummyApi.js";
  import _ from "lodash";

  import LoadingSign from "./Reusable/LoadingSign.vue";
  import PostListComponent from "./Reusable/PostListComponent.vue";

  const PARENT_BLOG_POSTS_ROUTE = "/blog/singleBlog";
  const PARENT_PROJECT_POSTS_ROUTE = "/projects/singleProject";
  
  const BLOG_POSTS_LOADING_MESSAGE = "Loading blog posts...";
  const PROJECTS_LOADING_MESSAGE = "Loading projects...";

  const state = reactive({
    homeData:{
      introData:{},
      //blogPosts:[],
      projectPosts:[]
    },
  });
 
  const introDataLoaded = computed(()=>!(_.isEmpty(state.homeData.introData)));

  onMounted(()=>{
    loadData();
  });

  const loadData = async ()=>{
    const awaitAll = [
      // api.get({
      //   url:"/api/about/getLatestAboutInfo",
      //   headers:{
      //     "Content-Type":"application/json"
      //   },
      //   requestContentType:"application/json",
      // }),
      // api.get({
      //   url:"/api/blog/getLatestBlogPosts", 
      //   headers:{
      //     "Content-Type":"application/json"
      //   }, 
      //   otherConfig:null, 
      //   requestContentType:"application/json", 
      //   extraDataManipulator:null 
      // }),
      api.get({
        url:"/api/projects/getLatestProjects", 
        headers:{
          "Content-Type":"application/json"
        }, 
        otherConfig:null, 
        requestContentType:"application/json", 
        extraDataManipulator:null 
      })
    ];

    Promise.all(awaitAll).then((resp)=>{
      const retrievedData = {
        // introData:resp[0],
        //blogPosts:resp[1],
        projectPosts:resp[0]
      };
      
      //state.homeData.introData = retrievedData.introData.response[0];
      //state.homeData.blogPosts = retrievedData.blogPosts.response;
      state.homeData.projectPosts = retrievedData.projectPosts.response;

    }).catch((err)=>{
      console.log("ERROR: "+err);
    });
  }

</script>