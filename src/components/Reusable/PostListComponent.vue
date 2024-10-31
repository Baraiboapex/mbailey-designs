<template>
    <div class="row">
        <div class="col-12">
            <div v-if="!showLoading" class="d-flex flex-column">
                <div v-for="listItem in listItems" :key="listItem.id" class="d-flex flex-column item-frame mt-2 mb-2 p-4">
                    <div class="p-2 d-flex justify-content-center">
                        <img alt="image" v-if="listItem[imageField]" :src="listItem[imageField]" class="post-image"/>
                    </div>
                    <hr/>
                    <div class="p-2 d-flex flex-column">
                        <h3 class="list-item-title">{{ listItem[titleField] }}</h3>
                        <p class="list-item-blurb text-light">{{ listItem[contentField] }}</p>
                    </div>
                    <button type="button" @click="(event)=>navigateToPostPage(event, listItem)" class="btn app-button w-25">
                        Read More
                    </button>
                    <hr/>
                </div> 
            </div>
            <div v-else="showLoading" class="d-flex flex-row">
                <LoadingSign
                    :showLoadingSign="true"
                    :loadingMessageText="dataLoadingMessage"
                />
            </div>
        </div>
    </div>
</template>
<script setup>
    import { defineProps, computed } from 'vue';
    import LoadingSign from './LoadingSign.vue';

    import { useRouter } from 'vue-router';

    const router = useRouter();

    const props = defineProps({
        listItems:Array,
        canSelectListItems:{
            type:Boolean,
            default:true
        },
        dataLoadingMessage:String,
        parentRoute:String,
        contentField:String,
        titleField:String,
        postIdField:Number,
        imageField:String
    });

    const showLoading = computed(()=>props.listItems.length < 1);

    const navigateToPostPage = (_,listItem)=>{
        router.push(props.parentRoute+"/"+listItem[props.postIdField]);
    }
</script>