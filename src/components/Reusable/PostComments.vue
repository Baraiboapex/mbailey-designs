<template>
    <div class="d-flex felx-column">
        <div v-if="postCommentsHaveNoErrors" class="d-flex flex-column p-2">
            <div class="post-comment-header d-flex flex-row">
                <h3 class="mr-auto">Comments</h3>
                <button 
                    class="btn app-button" 
                    @click="toggleAddComment"
                >
                    Submit Comment
                </button>
            </div>
            <div v-if="showCommentAddDialog" class="add-post-comment-container">
                <div class="d-flex flex-column justify-content-between p-4 add-comment-form">
                    <div class="row">
                        <div class="col-12">
                            <h3>Submit Comment</h3>
                        </div>
                        <p class="app-text-content">
                            Note: for security purposes, your comment will NOT be added immediately onto 
                            this website. It will first be reviewed by our system admin and if it passes 
                            all our checks it will be added.
                        </p>
                    </div>
                    <div class="row">
                        <div class="col-12 d-flex flex-column">
                            <label for="commentCommenterField">Commenter Name</label>
                            <input class="app-text-field" type="text" name="commenterField" v-model="state.newCommentData.commenter" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 d-flex flex-column">
                            <label for="commentContentField"></label>
                            <textarea class="app-text-area" name="commentContentField" v-model="state.newCommentData.content"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button
                                class="btn app-submit-button"
                                @click="addPostComment"
                            >
                                Submit Comment Request
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="add-post-comment-container d-flex justify-content-end">
                <div class="mt-2 row post-comments-container">
                    <div class="col-12">
                        <div v-for="comment in state.comments" class="app-comment">
                            <div class="p-4 d-flex flex-column flex-wrap justify-content-between">
                                <div class="d-flex flex-row w-100">
                                    <div class="d-flex justify-content-start">
                                        <h4 class="comment-title">{{ comment.commenter }}</h4>
                                    </div>
                                    <div class="d-flex flex-row w-100">
                                        <h2>Date Posted : {{ comment.datePosted }}</h2>
                                    </div>
                                </div>
                                <p class="comment-paragraph">{{ comment.content }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <StandardErrorMessage
                errorMessageText="Could not load post comments"
            />
        </div>
    </div>
</template>
<script setup>
    import { onMounted, reactive, computed, ref } from 'vue';

    import api from "../../api/dummyApi";

    import StandardErrorMessage from "./StandardErrorMessage.vue";

    const props = defineProps({
        apiGetRequestRoute:String,
        apiPostRequestRoute:String,
        commentParentPostIdFieldName:String,
        commentParentPostId:Number,
    });

    const state = reactive({
        comments:[],
        newCommentData:{
            datePosted:new Date().toISOString(),
            commenter:"",
            content:""
        }
    });

    const showPostCommentDataErrorMessage = ref(false);
    const showCommentAddDialog = ref(false);
    const postCommentsHaveNoErrors = ref(false); 

    onMounted(()=>{
        loadPostComments({
            parentPostId:props.commentParentPostId
        });
    });

    const toggleAddComment = () => {
        showCommentAddDialog.value = !showCommentAddDialog.value
    }

    const loadPostComments = ({
        parentPostId
    }) => {
        api.get({
            url:props.apiGetRequestRoute + ("?"+props.commentParentPostIdFieldName+"="+parentPostId),
            headers:{
                "Content-Type":"application/json"
            },
            otherConfig:null,
            requestContentType:"application/json",
        }).then((data)=>{
            state.comments = data.response
            postCommentsHaveNoErrors.value = true;
            console.log(postCommentsHaveNoErrors.value);
        }).catch((err)=>{
            console.log(err);
            postCommentsHaveNoErrors.value = false;
            showPostCommentDataErrorMessage.value = true
        });
    }

    const addPostComment = () => {
        state.newCommentData[props.commentParentPostIdFieldName] = props.commentParentPostId;
        api.get({
            url:props.apiPostRequestRoute,
            body:state.newCommentData,
            headers:{
                "Content-Type":"application/json"
            },
            otherConfig:null,
            requestContentType:"application/json",
        }).then((data)=>{
            state.comments = data;
            resolve();
        }).catch((err)=>{
            showPostCommentDataErrorMessage.value = true
        });
    }
</script>