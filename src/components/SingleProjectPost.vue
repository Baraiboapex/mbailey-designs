<template>
    <div class="row post-content-container">
        <div v-if="postHasNoLoadingError" class="col-12">
            <div class="p-4 d-flex flex-column flex-wrap justify-content-between">
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
        </div>
        <div v-else class="col-12">
            <StandardErrorMessage
                errorMessageText="Could not load project"
            />
        </div>
        <div class="col-12">
            <PostComments
                :apiGetRequestRoute="apiGetRequestRoute"
                :apiPostRequestRoute="apiPostRequestRoute"
                :commentParentPostIdFieldName="commentParentPostIdFieldName"
                :commentParentPostId="currentProjectPostId"
            />
        </div>
     </div>
</template>
<script setup>
    import { useRoute } from 'vue-router';
    import { onMounted, reactive } from 'vue';

    import api from "../api/dummyApi";

    import PostComments from './Reusable/PostComments.vue';
    import StandardErrorMessage from "./Reusable/StandardErrorMessage.vue";

    const API_GET_REQUEST_ROUTE = "/api/project/getProjectComments";
    const API_POST_REQUEST_ROUTE="/api/project/requestAddProjectComment";
    const COMMENT_PARENT_POST_ID_FIELD_NAME="projectId";

    const route = useRoute();

    const state = reactive({
        postData:{},
    });

    const currentProjectPostId = ref("");
    const showPostDataErrorMessage = ref(false);

    const apiGetRequestRoute = ref(API_GET_REQUEST_ROUTE);
    const apiPostRequestRoute = ref(API_POST_REQUEST_ROUTE);
    const commentParentPostIdFieldName = ref(COMMENT_PARENT_POST_ID_FIELD_NAME);

    onMounted(()=>{
        currentProjectPostId.value = route.params.id;
        loadSinglePost({
            postId:currentProjectPostId.value
        });
    });

    const loadSinglePost = ({
        postId
    }) => {
        return new Promise((resolve, reject)=>{
            api.get({
                url:"/api/Project/getSingleProjectPost",
                body:{postId},
                headers:{
                    "Content-Type":"application/json"
                },
                otherConfig:null,
            }).then((data)=>{
                state.postData = data;
                resolve();
            }).catch((err)=>{
                showPostDataErrorMessage.value = true
            });
        });
    };

</script>