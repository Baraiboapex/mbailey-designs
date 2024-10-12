<template>
    <div class="row">
      <div class="col-12">
        <h1 class="page-title">Projects</h1>
        <hr/>
      </div>
      <div class="col-12">
        <section class="page-content">
          <div>
            <SearchableListAPIWrapper
              :loadDataIndependently="true"
              :apiSearchObject="buildProjectSearchApi"
              @postsLoaded="checkProjectsPostsLoaded"
            >
            <template #default="slapidata">
              <SearchableList
                  searchableField="title"
                  listLabel="Current Project Posts"
                  dataLoadingMessage="Loading list data..."
                  listDirection="column"
                  :canSelectListItems="false"
                  :listItems="slapidata.dataToSearch"
                  :showListLoadingSignOnSearch="slapidata.showListLoadingSignOnSearch"
                  :showSubmissionMessage="slapidata.showSubmissionMessage"
                  :submissionWasSuccessful="slapidata.submissionWasSuccessful" 
                  @listSearchTextChanged="slapidata.searchListByApi"
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
                          parentPostRoute="/projects/singleProject/"
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

  </script>