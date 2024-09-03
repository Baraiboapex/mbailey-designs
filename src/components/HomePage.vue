
<template>
  <div>
    <div class="row">
      <div class="col-12">
        
      </div>
    </div>
    <div class="row">
      <div class="col-12">
      </div>
    </div>
    <div class="row">
      <div class="col-12">
      </div>
    </div>
  </div>
</template>
<script setup>
  import { reactive, onMounted, computed } from "vue";
  import api from "../api/dummyApi.js";
  import _ from "lodash";

  const state = reactive({
    homeData:{
      introData:{},
      recentProjects:[],
      recentBlogPosts:[]
    },
  });
 
  const introDataLoaded = computed(()=>!(_.isEmpty(state.homeData.introData)));
  const recentProjectsLoaded = computed(()=>!(state.homeData.recentProjects.length > 0));
  const recentBlogPostsLoaded = computed(()=>!(state.homeData.recentBlogPosts.length > 0));

  onMounted(()=>{
    loadData();
  });

  const loadData = async ()=>{
    const awaitAll = [
      api.get({
        url:"/api/about/getLatestAboutInfo",
        headers:{
          "Content-Type":"application/json"
        },
        requestContentType:"application/json",
      }),
      api.get({
        url:"/api/projects/getLatestProjects",
        headers:{
          "Content-Type":"application/json"
        },
        requestContentType:"application/json",
      }),
      api.get({
        url:"/api/blog/getLatestBlogPosts",
        headers:{
          "Content-Type":"application/json"
        },
        requestContentType:"application/json",
      })
    ];

    Promise.all(awaitAll).then(()=>{
      const retrievedData = {
        introData:resp[0],
        recentProjects:resp[1],
        recentBlogPosts:resp[2]
      };
      state.homeData.introData = retrievedData.introData;
      state.homeData.recentProjects = retrievedData.recentProjects;
      state.homeData.recentBlogPosts = retrievedData.recentBlogPosts;
    });
  }

</script>