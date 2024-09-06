<template>
    <div class="row">
    <div class="col-12">
      <h1 class="page-title">Errors</h1>
      <hr/>
    </div>
    <div class="col-12">
      <section class="page-content">
        <div v-if="errorPostsLoaded">
          <SearchableListAPIWrapper
            :loadDataIndependently="true"
            :apiSearchObject="buildProjectSearchApi"
            @postsLoaded="checkErrorsPostsLoaded"
          >
          <template #default="data">
            <SearchableList
                :canSelectListItems="false"
                :listItems="data.dataToSearch"
                searchableField="title"
                listLabel="Current Project Posts"
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
                      parentPostRoute="/projectpost/"
                      viewMoreButtonText="Read More"
                  />
              </template>
            </SearchableList>
            </template>
           </SearchableListAPIWrapper>
        </div>
        <div v-else>
          <LoadingSign
            :showLoadingSign="!projectsLoaded"
            loadingMessageText="Loading recent project data..."
          />
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import api from "../api/dummyApi.js";

import LoadingSign from "./Reusable/LoadingSign.vue";
import SearchableList from "./Reusable/SearchableList/SearchableList.vue";
import SearchableListAPIWrapper from "./Reusable/SearchableList/SearchableListAPIWrapper.vue";
import SearchableListItem from "./Reusable/SearchableList/SearchableListItem.vue";

const errorPostsLoaded = ref(false);

const checkErrorsPostsLoaded = (postsLoaded) => {errorPostsLoaded.value = postsLoaded};

const buildProjectSearchApi = (data)=>api.get({
  url:"/api/error/searchErrors"+(
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