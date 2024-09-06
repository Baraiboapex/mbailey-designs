<template>
     <div class="row post-content-container">
        <div v-if="postHasNoLoadingError" class="col-12">
            <div class="p-4 d-flex flex-column flex-wrap justify-content-between">
                <div class="d-flex flex-row w-100">
                    <div class="d-flex justify-content-start">
                        <h2 class="post-title">{{ state.postData.title }}</h2>
                    </div>
                    <div class="d-flex flex-row w-100">
                        <h2>Date Posted : {{ state.postData.datePosted }}</h2>
                    </div>
                </div>
                <p class="post-paragraphs">{{ state.postData.content }}</p>
            </div>
        </div>
        <div v-else class="col-12">
            
        </div>
        <div class="col-12">
            <PostComments
                :apiGetRequestRoute="apiGetRequestRoute"
                :apiPostRequestRoute="apiPostRequestRoute"
                :commentParentPostIdFieldName="commentParentPostIdFieldName"
                :commentParentPostId="currentBlogPostId"
            />
        </div>
     </div>
</template>
<script setup>
    import { useRoute } from 'vue-router';
    import { onMounted, reactive, ref,  computed} from 'vue';

    import api from "../api/dummyApi";

    import PostComments from './Reusable/PostComments.vue';

    const API_GET_REQUEST_ROUTE = "/api/blog/getPostComments";
    const API_POST_REQUEST_ROUTE="/api/blog/addPostComment";
    const COMMENT_PARENT_POST_ID_FIELD_NAME="postId";

    const route = useRoute();

    const state = reactive({
        postData:{},
        comments:[]
    });

    const currentBlogPostId = ref("");
    const showPostDataErrorMessage = ref(false);

    const apiGetRequestRoute = ref(API_GET_REQUEST_ROUTE);
    const apiPostRequestRoute = ref(API_POST_REQUEST_ROUTE);
    const commentParentPostIdFieldName = ref(COMMENT_PARENT_POST_ID_FIELD_NAME);

    const postHasNoLoadingError = computed(()=>!showPostDataErrorMessage);

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
                url:"/api/blog/getSingleBlogPost",
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