<template>
    <div class="row post-content-container">
        <div v-if="postLoaded" class="col-12">
            <div v-if="postHasNoLoadingErrors" class="p-4 d-flex w-100 flex-column flex-wrap justify-content-between">
                <div class="d-flex flex-column w-100">
                    <div class="d-flex w-100">
                        <img class="post-image" :src="state.postData.projectImage"/>
                    </div>
                    <div class="d-flex flex-row w-100">
                        <div class="d-flex justify-content-start">
                            <h2 class="post-title">{{ state.postData.title }}</h2>
                        </div>
                        <div class="d-flex flex-row w-100">
                            <h2>Date Posted : {{ state.postData.datePosted }}</h2>
                        </div>
                    </div>
                    <p class="post-paragraphs">{{ state.postData.aboutProject }}</p>
                </div>
                <div class="d-flex flex-column w-100">
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
    import { useRoute } from 'vue-router';
    import { onMounted, reactive, ref, computed } from 'vue';

    import api from "../api/dummyApi";

    import PostComments from './Reusable/PostComments.vue';
    import StandardErrorMessage from "./Reusable/StandardErrorMessage.vue";
    import LoadingSign from "./Reusable/LoadingSign.vue";

    const API_GET_POST_ROUTE = "/api/projects/getSingleProjectPost";
    const API_GET_COMMENTS_REQUEST_ROUTE = "/api/projects/getProjectComments";
    const API_POST_COMMENT_REQUEST_ROUTE = "/api/projects/requestAddProjectComment";
    const COMMENT_PARENT_POST_ID_FIELD_NAME="projectId";

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
    const showError = computed(()=>!postHasNoLoadingErrors.value)


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
                console.log(data);
                state.postData = data.response;
                currentProjectPostId.value = data.response.id;
                resolve();
            }).catch((err)=>{
                console.log("JJJ")
                postLoaded.value = true;
                postHasNoLoadingErrors.value = false;
            });
        });
    };

</script>