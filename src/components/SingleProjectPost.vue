<template>
    
</template>
<script setup>
    import { useRoute } from 'vue-router';
    import { onMounted, reactive } from 'vue';

    import api from "../api/dummyApi";

    const route = useRoute();

    const state = reactive({
        postData:{},
        comments:[]
    });

    const currentProjectPostId = ref("");
    const showPostDataErrorMessage = ref(false);
    const showPostCommentDataErrorMessage = ref(false);

    onMounted(()=>{
        currentProjectPostId.value = route.params.id;
        loadSinglePost({
            postId:currentProjectPostId.value
        });
        loadPostComments({
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

    const loadPostComments = ({
        postId
    }) => {
        api.get({
            url:"/api/Project/getPostComments",
            body:{postId},
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