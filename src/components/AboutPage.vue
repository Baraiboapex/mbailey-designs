<template>
    <div class="row">
      <div class="col-12">
        <section class="page-content">
          <div v-if="introDataLoaded" class="p-2">
              <div class="row">
                <div class="col-12 item-frame">
                  <div class="row p-2">
                    <div class="col-12 p-2 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center justify-content-center">
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
              </div>
              <div class="row mt-2 p-2 item-frame">
                <div class="col-12 d-flex flex-column justify-content-center">
                  <h5 class="m-2">My Skills</h5>
                  <div class="d-flex w-100 align-items-center justify-content-center flex-grow-1">
                    <div class="skills-container">
                      <div class="skill-item d-flex align-items-center flex-column justify-content-between item-frame p-4">
                        <img height="100" width="100" src="https://pluspng.com/img-png/react-logo-png-img-react-logo-png-react-js-logo-png-transparent-png-1142x1027.png"/>
                        <h5 class="mt-5">React.JS</h5>
                      </div>
                      <div class="skill-item d-flex align-items-center flex-column justify-content-around item-frame p-4">
                        <img height="100" width="100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png"/>
                        <h5 class="mt-5">Vue.JS</h5>
                      </div>
                      <div class="skill-item  d-flex align-items-center flex-column justify-content-around item-frame p-4">
                        <img height="100" width="100" src="https://pluspng.com/img-png/nodejs-logo-png-nice-images-collection-node-js-desktop-wallpapers-370.png"/>
                        <h5 class="mt-5">Node.JS</h5>
                      </div>
                      <div class="skill-item d-flex align-items-center flex-column justify-content-around item-frame p-4">
                        <img height="100" width="100" src="https://seeklogo.com/images/N/net-logo-13E6F1F153-seeklogo.com.png"/>
                        <h5 class="mt-5">.NET C#</h5>
                      </div>
                      <div class="skill-item d-flex align-items-center flex-column justify-content-around item-frame p-4">
                        <img height="100" width="100" src="https://th.bing.com/th/id/OIP.NdE0TRDvIZtxthYb78wGHgAAAA?w=432&h=439&rs=1&pid=ImgDetMain"/>
                        <h5 class="mt-5">MSSQL</h5>
                      </div>
                      <div class="skill-item d-flex align-items-center flex-column justify-content-around item-frame p-4">
                        <img height="100" width="100" src="https://firebase.google.com/images/brand-guidelines/logo-logomark.png"/>
                        <h5 class="mt-5">Firebase</h5>
                      </div>
                      <div class="skill-item d-flex align-items-center flex-column justify-content-around item-frame p-4">
                        <img height="100" width="100" src="https://styles.redditmedia.com/t5_2odyx7/styles/communityIcon_19sk0x18irz41.png"/>
                        <h5 class="mt-5">.NET MAUI</h5>
                      </div>
                      <div class="skill-item d-flex align-items-center flex-column justify-content-around item-frame p-4">
                        <img height="100" width="100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/2048px-HTML5_logo_and_wordmark.svg.png"/>
                        <h5 class="mt-5">HTML 5</h5>
                      </div>
                      <div class="skill-item d-flex align-items-center flex-column justify-content-around item-frame p-4">
                        <img height="100" width="100" src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg"/>
                        <h5 class="mt-5">CSS 3</h5>
                      </div>
                      <div class="skill-item d-flex align-items-center flex-column justify-content-around item-frame p-4">
                        <img height="100" width="100" src="https://ronilaukkarinen.gallerycdn.vsassets.io/extensions/ronilaukkarinen/scss-language-improvements/1.1.0/1652947993003/Microsoft.VisualStudio.Services.Icons.Default"/>
                        <h5 class="mt-5">SCSS</h5>
                      </div>
                    </div>
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
  </template>
  <script setup>
   import { reactive, onMounted, computed } from "vue";
   import LoadingSign from "./Reusable/LoadingSign.vue";
   import api from "../api/dummyApi";

   import _ from "lodash";
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

      Promise.all(awaitAll).then((resp)=>{
        const retrievedData = {
          introData:resp[0],
        };
        state.introData = retrievedData.introData.response[0];
      });
  }
  </script>