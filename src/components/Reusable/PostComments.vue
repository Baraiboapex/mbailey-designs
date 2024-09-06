<template>
    <div class="d-flex flex-column p-2">
        <div class="post-comment-header d-flex flex-row">
            <h3 class="mr-auto">Comments</h3>
            <button 
                class="btn app-button" 
                @click="toggleAddComment"
            >
                Add Comment
            </button>
        </div>
        <div v-if="showCommentAddDialog" class="add-post-comment-container">
            <div class="d-flex flex-column justify-content-between p-4 add-comment-form">
                <div class="row">
                    <div class="col-12">
                        <h3>Add Comment</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 d-flex flex-column">
                        <label for="commentCommenterField">Commenter</label>
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
                            class="btn app-button"
                            @click=""
                        >
                            Submit Comment
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
</template>
<script setup>
    import { onMounted, reactive } from 'vue';

    import api from "../api/dummyApi";

    const props = defineProps({
        apiGetRequestRoute:String,
        apiPostRequestRoute:String,
        commentParentPostIdFieldName:String,
        commentParentPostId:Number,
    });

    onMounted(()=>{
        loadPostComments({
            parentPostId:props.commentParentPostId
        });
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
    
    const toggleAddComment = () => {
        showCommentAddDialog.value = !showCommentAddDialog.value;
    }

    const loadPostComments = ({
        parentPostId
    }) => {
        api.get({
            url:props.apiGetRequestRoute,
            body:{parentPostId},
            headers:{
                "Content-Type":"application/json"
            },
            otherConfig:null,
        }).then((data)=>{
            state.comments = data;
            resolve();
        }).catch((err)=>{
            showPostCommentDataErrorMessage.value = true
        });
    }

    const addPostComment = () => {
        state.newCommentData[props.commentParentPostIdFieldName] = props.commentParentPostId;
        api.get({
            url:state.newCommentData,
            body:{parentPostId},
            headers:{
                "Content-Type":"application/json"
            },
            otherConfig:null,
        }).then((data)=>{
            state.comments = data;
            resolve();
        }).catch((err)=>{
            showPostCommentDataErrorMessage.value = true
        });
    }
</script>