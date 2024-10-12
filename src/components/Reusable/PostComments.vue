<template>
    <div class="d-flex felx-column">
        <div v-if="postCommentsHaveNoErrors" class="w-100">
            <div v-if="postCommentsLoaded" class="d-flex w-100 flex-column p-2">
                <div class="post-comment-header d-flex flex-row">
                    <h3 class="mr-auto">Comments</h3>
                    <button 
                        v-show="!showCommentAddDialog"
                        class="btn app-button" 
                        @click="showAddComment"
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
                            <div class="col-12">
                                <p class="app-text-content">
                                    Note: for security purposes, your comment will NOT be added immediately onto 
                                    this website. It will first be reviewed by our system admin and if it passes 
                                    all our checks it will be added.
                                </p>
                            </div>
                            <div class="col-12 d-flex flex-column justify-content-between">
                                <StandardSuccessMessage 
                                    :showMessage="showPostCommentSubmitSuccessMessage" 
                                    successMessageText="Comment submission request sent successfully"
                                />
                                <StandardErrorMessage 
                                    :showMessage="showPostCommentSubmitErrorMessage"
                                    errorMessageText="Comment submission could not be sent"
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 d-flex flex-column">
                                <label for="commenterNameField">Commenter Name</label>
                                <input 
                                    :class="textValidationObject.commenter.classValue + ' app-text-field'" 
                                    :disabled="postcommentRequestSending" 
                                    type="text" 
                                    name="commenterNameField" 
                                    v-model="state.newCommentData.commenter" 
                                />
                                <span v-if="!textValidationObject.commenter.isValid" class="validator">
                                    {{ textValidationObject.commenter.invalidText }}
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 d-flex flex-column">
                                <label for="commentContentField">Comment Content</label>
                                <textarea 
                                    :class="textValidationObject.content.classValue + ' app-text-field'" 
                                    :disabled="postcommentRequestSending" 
                                    name="commentContentField" 
                                    v-model="state.newCommentData.content"
                                ></textarea>
                                <span v-if="!textValidationObject.content.isValid" class="validator">
                                    {{ textValidationObject.content.invalidText }}
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div v-if="!postcommentRequestSending" class="d-flex flex-row">
                                    <button
                                        class="btn app-submit-button"
                                        @click="addPostComment"
                                    >
                                        Submit Comment Request
                                    </button>
                                    <button
                                        class="btn app-submit-button"
                                        @click="hideAddComment"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div v-else class="d-flex flex-row justify-content-start">
                                    <LoadingSign
                                        :showLoadingSign="postcommentRequestSending"
                                        loadingMessageText="Submitting comment request..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="add-post-comment-container w-100 d-flex flex-column">
                    <div class="mt-2 row post-comments-container">
                        <div class="col-12">
                            <div v-for="comment in state.comments" class="app-comment">
                                <div class="p-4 d-flex flex-column flex-wrap justify-content-between">
                                    <div class="d-flex flex-row w-100">
                                        <div class="d-flex justify-content-start">
                                            <h4 class="comment-title">{{ comment.commenter }}</h4>
                                        </div>
                                        <div class="d-flex justify-content-end w-100">
                                            <h4>Date Posted : {{ comment.datePosted }}</h4>
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
                <LoadingSign
                    :showLoadingSign="showLoadingSign"
                    loadingMessageText="Loading blog comments..."
                />
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
    import { onMounted, reactive, computed, ref, markRaw } from 'vue';
    import {
        validateTextInput,
        validateAllTextFields,
        renderTextFieldValidation,
        textRulesNames,
        DEFAULT_TEXT_VALIDATION_OBJECT_VALUE
    } from "../../helpers/inputValidation/inputValidator.js";

    import api from "../../api/dummyApi";

    import LoadingSign from "./LoadingSign.vue";
    import StandardErrorMessage from "./StandardErrorMessage.vue";
    import StandardSuccessMessage from "./StandardSuccessMessage.vue";

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

    const textValidationObject = reactive({
        commenter: DEFAULT_TEXT_VALIDATION_OBJECT_VALUE,
        content: DEFAULT_TEXT_VALIDATION_OBJECT_VALUE,
    });
    
    const textFieldValidationList = [
        ()=>({
            fieldName:"commenter",
            validator:()=>validateTextInput({
                rules:[
                    textRulesNames.REQUIRED_RULE,
                    textRulesNames.VALID_EMAIL_RULE
                ],
                textValue:state.newCommentData.commenter
            }),
            invalidText:"Please input a valid email address"
        }),
        ()=>({
            fieldName:"content",
            validator:()=>validateTextInput({
                rules:[
                    textRulesNames.REQUIRED_RULE,
                ],
                textValue:state.newCommentData.content
            }),
            invalidText:"Please give this comment some content"
        })
    ];

    const showCommentAddDialog = ref(false);
    const postCommentsHaveNoErrors = ref(true); 
    const postCommentsLoaded = ref(false);
    const postcommentRequestSending = ref(false);
    const showPostCommentSubmitSuccessMessage = ref(false);
    const showPostCommentSubmitErrorMessage = ref(false);

    const showLoadingSign = computed(()=>!postCommentsLoaded.value);

    onMounted(()=>{
        loadPostComments({
            parentPostId:props.commentParentPostId
        });
    });

    const showAddComment = () => {
        showCommentAddDialog.value = true
    }

    const hideAddComment = () => {
        showCommentAddDialog.value = false;
        resetCommentContent();
    }

    const resetCommentContent = () => {
        state.newCommentData.commenter = "";
        state.newCommentData.content = "";
        textValidationObject.commenter=DEFAULT_TEXT_VALIDATION_OBJECT_VALUE;
        textValidationObject.content=DEFAULT_TEXT_VALIDATION_OBJECT_VALUE;
    }

    const loadPostComments = ({
        parentPostId
    }) => {
        console.log(props.apiPostRequestRoute, props.commentParentPostIdFieldName);
        api.get({
            url:props.apiGetRequestRoute + ("?"+props.commentParentPostIdFieldName+"="+parentPostId),
            headers:{
                "Content-Type":"application/json"
            },
            otherConfig:null,
            requestContentType:"application/json",
        }).then((data)=>{
            console.log(data.response);
            state.comments = data.response;
            postCommentsHaveNoErrors.value = true;
            postCommentsLoaded.value = true;
        }).catch((err)=>{
            console.log(err);
            postCommentsHaveNoErrors.value = false;
            postCommentsLoaded.value = true;
        });
    }
    
    const addPostComment = () => {

        const textInputIsValid = validateAllTextFields(textFieldValidationList);

        renderTextFieldValidation({
            validFieldsList:textInputIsValid.validFieldsList,
            invalidFieldsList:textInputIsValid.invalidFieldsList,
            valueToValidateFromValidatorObject:textValidationObject
        });

        if(textInputIsValid.inputsAreValid){
            state.newCommentData[props.commentParentPostIdFieldName] = props.commentParentPostId;

            postcommentRequestSending.value = true;
            showPostCommentSubmitErrorMessage.value = false;
            showPostCommentSubmitSuccessMessage.value = false;

            api.post({
                url:props.apiPostRequestRoute,
                body:markRaw(state.newCommentData),
                headers:{
                    "Content-Type":"application/json"
                },
                otherConfig:null,
                requestContentType:"application/json",
            }).then((data)=>{
                resetCommentContent();
                showPostCommentSubmitSuccessMessage.value = true;
                postcommentRequestSending.value = false;
            }).catch((err)=>{
                resetCommentContent();
                showPostCommentSubmitErrorMessage.value = true;
                postcommentRequestSending.value = false;
            });
        }
    }
</script>