<template>
  <div class="row">
    <div class="col-12">
      <h1 class="page-title">Blog Posts</h1>
      <hr/>
    </div>
    <div class="col-12">
        <section class="page-content">
          <div>
            <SearchableListAPIWrapper
              :loadDataIndependently="true"
              :apiSearchObject="buildBlogSearchApi"
              @postsLoaded="checkBlogPostsLoaded"
            >
            <template #default="slapidata">
              <SearchableList
                  searchableField="title"
                  listLabel="Current Blog Posts"
                  dataLoadingMessage="Loading list data..."
                  listDirection="column"
                  :canSelectListItems="false"
                  :listItems="slapidata.dataToSearch"
                  :showSubmissionMessage="slapidata.showSubmissionMessage"
                  :submissionWasSuccessful="slapidata.submissionWasSuccessful" 
                  :showListLoadingSignOnSearch="slapidata.showListLoadingSignOnSearch"
                  @listSearchTextChanged="slapidata.searchListByApi"
              >
                <template #listItemTemplate="{data}">
                  <SearchableListItem
                        :hasImage="false"
                        :hasBlurb="true"
                        :hasViewMoreLink="true"
                        :title="data.title"
                        :blurb="data.content"
                        :postId="data.id"
                        parentPostRoute="/blog/singleBlog/"
                        viewMoreButtonText="Read More"
                    />
                </template>
              </SearchableList>
              </template>
             </SearchableListAPIWrapper>
          </div>
        </section>
      </div>
  </div>
</template>
<script setup>
import api from "../api/dummyApi.js";

import SearchableList from "./Reusable/SearchableList/SearchableList.vue";
import SearchableListAPIWrapper from "./Reusable/SearchableList/SearchableListAPIWrapper.vue";
import SearchableListItem from "./Reusable/SearchableList/SearchableListItem.vue";

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