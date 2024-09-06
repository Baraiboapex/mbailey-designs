<template>
  <div class="row">
    <div class="col-12">
      <h1 class="page-title">Projects</h1>
      <hr/>
    </div>
    <div class="col-12">
        <section class="page-content">
          <div v-if="blogPostsLoaded">
            <SearchableListAPIWrapper
              :loadDataIndependently="true"
              :apiSearchObject="buildBlogSearchApi"
              @postsLoaded="checkBlogPostsLoaded"
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
                <template #listItemTemplate="data">
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
          </div>
          <div v-else>
            <LoadingSign
              :showLoadingSign="!blogPostsLoaded",
              loadingMessageText="Loading recent project data..."
            />
          </div>
        </section>
      </div>
  </div>
</template>
<script setup>
import {ref} from "vue";
import api from "../api/dummyApi.js";

import LoadingSign from "./Reusable/LoadingSign.vue";
import SearchableList from "./Reusable/SearchableList/SearchableList.vue";
import SearchableListAPIWrapper from "./Reusable/SearchableList/SearchableListAPIWrapper.vue";
import SearchableListItem from "./Reusable/SearchableList/SearchableListItem.vue";

const blogPostsLoaded = ref(false);

const checkBlogPostsLoaded = (postsLoaded) => {blogPostsLoaded.value = postsLoaded}; 

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

</script>