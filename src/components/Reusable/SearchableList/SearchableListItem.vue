<template>
    <div class="d-flex flex-column">
        <div class="p-2 d-flex align-items-center justify-content-center">
            <img v-if="hasImage" :src="image" alt="image" class="post-image"/>
        </div>
        <hr/>
        <div class="p-2 d-flex flex-column">
            <h3 class="list-item-title">{{ title }}</h3>
            <p v-if="hasBlurb" class="list-item-blurb text-white">{{ blurb }}</p>
        </div>
        <button type="button" @click="navigateToPostPage" v-if="hasViewMoreLink" class="btn app-button w-25 w-sm-50 w-md-25 w-lg-25">{{ viewMoreButtonText }}</button>
        <hr/>
    </div>    
</template>
<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const props = defineProps({
        hasImage:Boolean,
        hasBlurb:Boolean,
        hasViewMoreLink:Boolean,
        image:String,
        title:String,
        blurb:String,
        viewMoreButtonText:String,
        postId:String,
        parentPostRoute:String
    });

    const navigateToPostPage = ()=>{
        router.push(props.parentPostRoute+props.postId);
    };
    
</script>