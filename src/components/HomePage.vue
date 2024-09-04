
<template>
  <div>
    <div class="row">
      <div class="col-12">
        <section class="page-content">
          <div v-if="introDataLoaded">
              <div class="row">
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
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
              :showLoadingSign="!introDataLoaded",
              loadingMessageText="Loading intro data..."
            />
          </div>
        </section>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <section class="page-content">
          <div v-if="recentProjectsLoaded">
          </div>
          <div v-else>
            <LoadingSign
              :showLoadingSign="!recentProjectsLoaded",
              loadingMessageText="Loading recent project data..."
            />
          </div>
        </section>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <section class="page-content">
          <div v-if="recentBlogPostsLoaded">
              <!-- Add recent blog post data here! -->
          </div>
          <div v-else>
            <LoadingSign
              :showLoadingSign="!recentBlogPostsLoaded",
              loadingMessageText="Loading recent blog post data..."
            />
          </div>
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