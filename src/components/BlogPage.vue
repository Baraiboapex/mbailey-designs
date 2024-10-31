<template>
  <div class="row">
    <div class="col-12">
      <h1 class="page-title">Blog Posts</h1>
      <hr/>
    </div>
    <div class="col-12">
        <section class="page-content">
          <div>
            <SearchTabsBar
              searchTabsBarTitle="Please Select A Search Filter"
              searchTabsSearchTextBarLabel="Search Blog Post Filters..."
              searchTabsCategoriesLabel="Blog Post Filter Categories"
              :getSearchableFieldsApiUrl="GET_SEARCHABLE_FIELDS_API_URL"
              :getSearchableDataApiUrl="GET_SEARCHABLE_DATA_API_URL"
              :searchDataApiUrl="SEARCH_DATA_API_URL"
              :showListLoadingSign="false"
              :apiObject="api"
            >
              <template #tabsFrame="slapidata">
                <div class="mt-4">
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

  const GET_SEARCHABLE_FIELDS_API_URL = "/api/blog/getSearchableFields";
  const GET_SEARCHABLE_DATA_API_URL = "/api/blog/getPostFieldValues"; 
  const SEARCH_DATA_API_URL = "/api/blog/searchPostsByFilters";
</script>