<template>
    <div class="d-flex flex-column">
        <div class="p-2">
            <img v-if="hasImage" :src="image" class="list-item-image"/>
        </div>
        <hr/>
        <div class="p-2 d-flex flex-column">
            <h3 class="list-item-title">{{ title }}</h3>
            <p v-if="hasBlurb" class="list-item-blurb text-dark">{{ blurb }}</p>
        </div>
        <a @click="navigateToPostPage" v-if="hasViewMoreLink" class="list-item-view-more-button">{{ viewMoreButtonText }}</a>
    </div>    
</template>
<script setup>
    import { useRouter  } from 'vue-router'

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
    }
</script>