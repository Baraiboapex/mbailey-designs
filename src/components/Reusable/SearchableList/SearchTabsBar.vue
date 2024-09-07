<template>
    <div class="row">
        <div class="col-12">
            <slot :searchData="state.searchData"></slot>
        </div>
    </div>
    <div v-if="allSearchDataIsLoaded" class="row">
        <div class="col-12">
            <div class="row">
                <div class="col-12">
                    <div class="d-flex flex-column">
                        <div v-for="groupTab in groupTabs" :key="groupTabs.id" class="app-search-group-tab" @click="()=>selectGroupTab(groupTab)">
                            <span>{{ groupTabs.title }}</span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-if="hasSelectedTabs" class="col-12">
                    <div class="w-100 d-flex justify-content-center">
                        <span class="text-secondary">No search tabs have been selected</span>
                    </div>
                </div>
                <div v-else class="col-12">
                    <div v-for="selectedTabs in tabs" class="app-search-group-tab" >

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <LoadingSign
            :showLoadingSign="true",
            loadingMessageText="Loading Search DAta"
        />
    </div>
</template>
<script setup>
    import { reactive, onMounted, computed } from "vue";

    import api from "../../../api/dummyApi";

    import LoadingSign from "../LoadingSign.vue";

    const state = reactive({
        groupTabs:[],
        selectedTabs:[],
        searchableTabs:{},
        showSelectableTabs:false,
        selectedGroupTabName:"",
    });

    const props = defineProps({
        searchData:Object,
        getSearchableFieldsApiUrl:String,
        getSearchableFieldDataApiUrl:Array
    });

    onMounted(()=>{
        loadSearchTabs
    });

    const hasSelectedTabs = computed(()=>selectedTabs.length > 0);
    const allSearchDataIsLoaded = computed(()=>groupTabs.length > 0 && selectedTabs.length);

    const selectGroupTab = (_, groupTab)=>{
        state.selectableTabs = true;
    }

    const loadSearchTabs = () =>{
        const getSearchableFields = api.get({
            url:props.getSearchableFieldsApiUrl,
            headers:{
                "Content-Type":"application/json"
            },
            otherConfig:null,
        }).then((data)=>{
            state.groupTabs = data;
            resolve();
        }).catch((err)=>{
            showPostCommentDataErrorMessage.value = true
        });
    }

    const fiterDataWithTabs = (selectedTabs) => {
        
    };
</script>