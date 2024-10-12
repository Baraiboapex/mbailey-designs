<template>
     <div class="row post-content-container">
        <div v-if="postLoaded" class="col-12">
            <div v-if="postHasNoLoadingErrors" class="p-4 d-flex w-100 flex-column flex-wrap justify-content-between">
                <div class="d-flex justify-content-start mb-2">
                    <button
                        class="btn app-submit-button"
                        @click="goBackToParentPage"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                        </svg>
                        <span>&nbsp;</span>
                        Back To Blog Page
                    </button>
                </div>
                <div class="d-flex flex-column w-100">
                    <div class="d-flex flex-row justify-content-end w-100">
                        <div class="d-flex align-items-start">
                            <h2 class="post-title ">{{ state.postData.title }}</h2>
                        </div>
                        <div class="d-flex flex-column w-100 align-items-end">
                            <div>
                            <h4>Date Posted : {{ state.postData.datePosted }}</h4>
                            <div class="d-flex flex-wrap">
                                <span v-for="categroy in state.postData.categroies" :key="categroy.id">{{ categroy.title }}</span>
                            </div>
                            </div>
                        </div>
                    </div>
                    <p class="post-paragraphs">{{ state.postData.content }}</p>
                </div>
                <div class="d-flex flex-column w-100">
                    <PostComments
                        :apiGetRequestRoute="apiGetCommentsRequestRoute"
                        :apiPostRequestRoute="apiPostCommentRequestRoute"
                        :commentParentPostIdFieldName="commentParentPostIdFieldName"
                        :commentParentPostId="currentBlogPostId"
                    />
                </div>
            </div>
            <div v-else class="p-4 d-flex flex-column flex-wrap justify-content-between">
                <StandardErrorMessage
                    errorMessageText="Could not load blog post"
                />
            </div>
        </div>
        <div v-else class="col-12">
            <LoadingSign
              :showLoadingSign="showLoadingSign"
              loadingMessageText="Loading blog post..."
            />
        </div>
     </div>
</template>
<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { onMounted, reactive, ref,  computed} from 'vue';

    import api from "../api/dummyApi";

    import PostComments from './Reusable/PostComments.vue';
    import StandardErrorMessage from "./Reusable/StandardErrorMessage.vue";
    import LoadingSign from "./Reusable/LoadingSign.vue";

    const API_GET_POST_ROUTE = "/api/blog/getSingleBlogPost";
    const API_GET_COMMENTS_REQUEST_ROUTE = "/api/blog/getPostComments";
    const API_POST_COMMENT_REQUEST_ROUTE="/api/blog/requestAddPostComment";
    const COMMENT_PARENT_POST_ID_FIELD_NAME="postId";

    const router = useRouter();
    const route = useRoute();

    const state = reactive({
        postData:{},
    });

    const currentBlogPostId = ref("");
    const postHasNoLoadingErrors = ref(false);
    const postLoaded = ref(false);

    const apiGetCommentsRequestRoute = ref(API_GET_COMMENTS_REQUEST_ROUTE);
    const apiPostCommentRequestRoute = ref(API_POST_COMMENT_REQUEST_ROUTE);
    const commentParentPostIdFieldName = ref(COMMENT_PARENT_POST_ID_FIELD_NAME);

    const showLoadingSign = computed(()=>!postLoaded.value);

    onMounted(()=>{
        currentBlogPostId.value = route.params.id;
        loadSinglePost({
            postId:currentBlogPostId.value
        });
    });

    const loadSinglePost = ({
        postId
    }) => {
        return new Promise((resolve, reject)=>{
            api.get({
                url:API_GET_POST_ROUTE+("?"+COMMENT_PARENT_POST_ID_FIELD_NAME+"="+postId),
                headers:{
                    "Content-Type":"application/json"
                },
                otherConfig:null,
                requestContentType:"application/json",
            }).then((data)=>{
                postLoaded.value = true;
                postHasNoLoadingErrors.value = true;
                state.postData = data.response;
                currentBlogPostId.value = data.response.id;
                resolve();
            }).catch((err)=>{
                postLoaded.value = true;
                postHasNoLoadingErrors.value = false;
                reject(err);
            });
        });
    };

    const goBackToParentPage = () => {
        router.push({path:"/blog"})
    };
</script>