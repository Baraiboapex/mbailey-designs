<template>
    <div class="row post-content-container">
        <div v-if="postLoaded" class="col-12">
            <div v-if="postHasNoLoadingErrors" class="d-flex w-100 flex-column flex-wrap justify-content-between">
                <div class="d-flex justify-content-start mb-4">
                    <button
                        type="button"
                        class="btn app-button"
                        @click="goBackToParentPage"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                        </svg>
                        <span>&nbsp;</span>
                        Back
                    </button>
                </div>
                <div class="d-flex flex-column w-100 mb-4 item-frame p-4">
                    <div class="d-flex justify-content-center mt-5 mb-5">
                        <img class="post-image" alt="image" :src="GET_SITE_HOST()+state.postData.projectImage"/>
                    </div>
                    <div class="d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-lg-row w-100">
                        <div class="d-flex flex-row w-100 align-items-center">
                            <div class="d-flex flex-row w-100 align-items-center flex-wrap">
                                <h4 class="post-title m-0">{{ state.postData.title }}</h4>
                                <span>&nbsp;&nbsp;&nbsp;</span>
                                <a 
                                    v-if="hasProjectLink"
                                    :href="state.postData.projectLink"
                                    target="_blank"
                                    class="text-decoration-none btn app-button mt-2"
                                >
                                    View Project
                                </a>
                            </div>
                        </div>
                        <div class="d-flex mt-3 mt-sm-3 mt-mb-3 flex-column w-100 justify-content-center align-items-start align-items-xs-start align-items-sm-start align-items-md-end align-items-lg-end ">
                            <div class="d-flex flex-row justify-content-center align-items-center">
                                <h4 class="text-nowrap m-0">Date Posted</h4>
                                <span>&nbsp;&nbsp;</span>
                                <FormatComponent
                                    formatTypeName="datePosted"
                                    :inputString="state.postData.datePosted"
                                    :formatKeyMethod="textFormatterMethod"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-between">
                        <hr/>
                        <p class="post-paragraphs mt-2">{{ state.postData.aboutProject }}</p>
                        <hr/>
                    </div>
                </div>
                <div class="d-flex flex-column w-100 item-frame p-2">
                    <PostComments
                        :apiGetRequestRoute="apiGetCommentsRequestRoute"
                        :apiPostRequestRoute="apiPostCommentRequestRoute"
                        :commentParentPostIdFieldName="commentParentPostIdFieldName"
                        :commentParentPostId="currentProjectPostId"
                    />
                </div>
            </div>
            <div v-else class="p-4 d-flex flex-column flex-wrap justify-content-between">
                <StandardErrorMessage
                    :isPermanent="true"
                    errorMessageText="Could not load project post"
                />
            </div>
        </div>
        <div v-else class="col-12">
            <LoadingSign
              :showLoadingSign="showLoadingSign"
              loadingMessageText="Loading project post..."
            />
        </div>
     </div>
</template>
<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { onMounted, reactive, ref, computed } from 'vue';

    import {textFormatterMethod} from "../helpers/formatHelpers/formattingObjects";
    import { GET_SITE_HOST } from '../helpers/siteUtilityHelpers/siteBrowserData';

    import api from "../api/dummyApi";

    import PostComments from './Reusable/PostComments.vue';
    import StandardErrorMessage from "./Reusable/StandardErrorMessage.vue";
    import LoadingSign from "./Reusable/LoadingSign.vue";
    import FormatComponent from "./Reusable/FormatComponent.vue";
    
    const API_GET_POST_ROUTE = "/api/projects/getSingleProjectPost";
    const API_GET_COMMENTS_REQUEST_ROUTE = "/api/projects/getProjectComments";
    const API_POST_COMMENT_REQUEST_ROUTE = "/api/projects/requestAddProjectComment";
    const COMMENT_PARENT_POST_ID_FIELD_NAME="projectId";

    const router = useRouter();
    const route = useRoute();

    const state = reactive({
        postData:{},
    });

    const currentProjectPostId = ref("");
    const postHasNoLoadingErrors = ref(false);
    const postLoaded = ref(false);

    const apiGetCommentsRequestRoute = ref(API_GET_COMMENTS_REQUEST_ROUTE);
    const apiPostCommentRequestRoute = ref(API_POST_COMMENT_REQUEST_ROUTE);
    const commentParentPostIdFieldName = ref(COMMENT_PARENT_POST_ID_FIELD_NAME);

    const showLoadingSign = computed(()=>!postLoaded.value);
    const hasProjectLink = computed(()=>state.postData.projectLink !== null);

    onMounted(()=>{
        currentProjectPostId.value = route.params.id;
        loadSinglePost({
            projectId:currentProjectPostId.value
        });
    });

    const loadSinglePost = ({
        projectId
    }) => {
        postHasNoLoadingErrors.value = true;
        return new Promise((resolve, reject)=>{
            api.get({
                url:API_GET_POST_ROUTE+("?"+COMMENT_PARENT_POST_ID_FIELD_NAME+"="+projectId),
                headers:{
                    "Content-Type":"application/json"
                },
                otherConfig:null,
                requestContentType:"application/json",
            }).then((data)=>{
                postLoaded.value = true;
                postHasNoLoadingErrors.value = true;
                state.postData = data.response;
                currentProjectPostId.value = data.response.id;
                resolve();
            }).catch((err)=>{
                console.log("Error", err);
                postLoaded.value = true;
                postHasNoLoadingErrors.value = false;
            });
        });
    };

    const goBackToParentPage = () => {
        router.go(-1);
    };
</script>