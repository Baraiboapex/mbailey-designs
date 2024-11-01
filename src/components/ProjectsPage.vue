<template>
    <div class="row">
      <div class="col-12 item-frame mt-5 mb-4">
        <section class="p-2">
          <div class="m-2">
          <h1 class="mt-2">Projects</h1>
          <p class="mt-4 mb-2"> Here are some of the projects I've built in my free-time or for freelance clients. All of my projects are higly focused on cross-browser compatability, and mobile responsiveness!</p>
          </div>
        </section>
      </div>
      <div class="col-12">
        <section class="p-2">
          <div>
            <SearchTabsBar
              searchTabsBarTitle="Please Select A Search Filter"
              searchTabsSearchTextBarLabel="Search Project Filters..."
              searchTabsCategoriesLabel="Project Filter Categories"
              :getSearchableFieldsApiUrl="GET_SEARCHABLE_FIELDS_API_URL"
              :getSearchableDataApiUrl="GET_SEARCHABLE_DATA_API_URL"
              :searchDataApiUrl="SEARCH_DATA_API_URL"
              :showListLoadingSign="false"
              :apiObject="api"
            >
              <template #tabsFrame="slapidata">
                <div class="row mt-4">
              <SearchableList
                  searchableField="title"
                  listLabel="Current Blog Posts"
                  dataLoadingMessage="Loading list data..."
                  listDirection="column"
                  :canSelectListItems="false"
                  :listItems="slapidata.filteredList"
                  :showSubmissionMessage="false"
                  :submissionWasSuccessful="true"
                  :showListLoadingSignOnSearch="!slapidata.loadingForSearch"
                  @listSearchTextChanged="slapidata.searchFunction"
              >
                <template #listItemTemplate="{data}">
                  <SearchableListItem
                        :hasImage="true"
                        :hasBlurb="true"
                        :image="data.projectImage"
                        :hasViewMoreLink="true"
                        :title="data.title"
                        :blurb="data.aboutProject"
                        :postId="data.id"
                        parentPostRoute="/projects/singleProject/"
                        viewMoreButtonText="Read More"
                    />
                </template>
              </SearchableList>
            </div>
              </template>
            </SearchTabsBar>
          </div>
        </section>
      </div>
    </div>
  </template>
  <script setup>
    import api from "../api/dummyApi.js";

    import SearchableList from "./Reusable/SearchableList/SearchableList.vue";
    import SearchTabsBar from "./Reusable/SearchableList/SearchTabsBar.vue";
    import SearchableListItem from "./Reusable/SearchableList/SearchableListItem.vue";

    const GET_SEARCHABLE_FIELDS_API_URL = "/api/projects/getSearchableFields";
    const GET_SEARCHABLE_DATA_API_URL = "/api/projects/getProjectFieldValues"; 
    const SEARCH_DATA_API_URL = "/api/projects/searchProjectsByFilters";
  </script>