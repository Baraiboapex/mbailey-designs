
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
              :showLoadingSign="!introDataLoaded"
              loadingMessageText="Loading intro data..."
            />
          </div>
        </section>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <section class="page-content">
          <SearchableListAPIWrapper
              :apiSearchObject="buildBlogSearchApi"
              :loadDataIndependently="true"
              searchableListApiTitle="current blog posts"
            >
            <template #default="data">
              <SearchableList
                  :canSelectListItems="false"
                  :listItems="data.dataToSearch"
                  searchableField="title"
                  listLabel="Current Blog Posts"
                  dataLoadingMessage="Loading list data..."
                  listDirection="column"
                  @listSearchTextChanged="data.searchListByApi"
              >
                <template #listItemTemplate="{data}">
                  <SearchableListItem
                        :hasImage="false"
                        :hasBlurb="true"
                        :hasViewMoreLink="true"
                        :title="data.title"
                        :blurb="data.content"
                        :postId="data.id"
                        parentPostRoute="/blogpost/"
                        viewMoreButtonText="Read More"
                    />
                </template>
              </SearchableList>
              </template>
             </SearchableListAPIWrapper>
        </section>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <section class="page-content">
          <SearchableListAPIWrapper
              :apiSearchObject="buildProjectSearchApi"
              :loadDataIndependently="true"
              searchableListApiTitle="current projects"
            >
            <template #default="data">
              <SearchableList
                  :canSelectListItems="false"
                  :listItems="data.dataToSearch"
                  searchableField="title"
                  listLabel="Current Projects"
                  dataLoadingMessage="Loading list data..."
                  listDirection="column"
                  @listSearchTextChanged="data.searchListByApi"
              >
                <template #listItemTemplate="{data}">
                    <SearchableListItem
                        :hasImage="true"
                        :hasBlurb="true"
                        :hasViewMoreLink="true"
                        :image="data.projectImage"
                        :title="data.title"
                        :blurb="data.aboutProject"
                        :postId="data.id"
                        parentPostRoute="/projectpost/"
                        viewMoreButtonText="Read More"
                    />
                </template>
              </SearchableList>
              </template>
             </SearchableListAPIWrapper>
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
  import SearchableList from "./Reusable/SearchableList/SearchableList.vue";
  import SearchableListAPIWrapper from "./Reusable/SearchableList/SearchableListAPIWrapper.vue";
  import SearchableListItem from "./Reusable/SearchableList/SearchableListItem.vue";
  
  const state = reactive({
    homeData:{
      introData:{},
    },
  });
 
  const introDataLoaded = computed(()=>!(_.isEmpty(state.homeData.introData)));

  onMounted(()=>{
    loadData();
  });

  const buildBlogSearchApi = (data)=>api.get({
    url:"/api/blog/searchPosts"+(
      data.searchText ? 
      "?searchText="+data.searchText 
      : 
      "?searchText=NULL"
    ), 
    headers:{
      "Content-Type":"application/json"
    }, 
    otherConfig:null, 
    requestContentType:"application/json", 
    extraDataManipulator:null 
  });

  const buildProjectSearchApi = (data)=>api.get({
    url:"/api/projects/searchProjects"+(
      data.searchText ? 
      "?searchText="+data.searchText 
      : 
      "?searchText=NULL"
    ), 
    headers:{
      "Content-Type":"application/json"
    }, 
    otherConfig:null, 
    requestContentType:"application/json", 
    extraDataManipulator:null
  });

  const loadData = async ()=>{
    const awaitAll = [
      api.get({
        url:"/api/about/getLatestAboutInfo",
        headers:{
          "Content-Type":"application/json"
        },
        requestContentType:"application/json",
      })
    ];

    Promise.all(awaitAll).then((resp)=>{
      const retrievedData = {
        introData:resp[0],
      };
      console.log(retrievedData);
      state.homeData.introData = retrievedData.introData.response[0]
    });
  }

</script>