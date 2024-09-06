<template>
    <div class="row">
      <div class="col-12">
        <section class="page-content">
          <div v-if="introDataLoaded">
              <div class="row">
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <img class="owner-image" :src="state.introData.ownerImage"/>
                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="d-flex p-2 flex-column flex-wrap">
                    <h3>{{ state.introData.title }}</h3>
                    <p>{{ state.introData.message }}</p>
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
  </template>
  <script setup>
   import { reactive, onMounted, computed } from "vue";
   import LoadingSign from "./Reusable/LoadingSign.vue";
   
    const state = reactive({
      introData:{}
    });

    onMounted(()=>{
      loadData();
    });

    const introDataLoaded = computed(()=>!(_.isEmpty(state.introData)));

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

      Promise.all(awaitAll).then(()=>{
        const retrievedData = {
          introData:resp[0],
        };
        state.introData = retrievedData.introData;
      });
  }
  </script>