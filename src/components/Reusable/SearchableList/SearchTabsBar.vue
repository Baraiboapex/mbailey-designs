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
                        <div v-for="groupTab in state.groupTabs" :key="groupTabs.id" class="app-search-group-tab" @click="()=>selectGroupTab(groupTab)">
                            <span>{{ groupTab.title }}</span>
                        </div>
                        <div v-if="showSelectableTabs" class="search-tabs-data-container">
                            <div v-for="tab in state.searchableTabs[state.selectedTabs]" :key="tab.id" class="search-tabs-data-tap" @click="()=>selectChildTab(tab)">
                                {{ tab.title }}
                            </div>
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
                    <div v-for="selectedTab in selectedTabs" @click="()=>removeSelectedTab(selectedTab)" :key="selectedTab.id" class="app-search-group-tab" >
                        <span>{{ selectedTab.title }}</span>
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

    const emittedEvents = defineEmits([
        "searchTabsChanged"
    ]);

    const state = reactive({
        groupTabs:[],
        selectedTabs:[],
        searchableTabs:{},
        showSelectableTabs:false,
        selectedGroupTabName:"",
    });

    const props = defineProps({
        getSearchableFieldsApiUrl:String,
        searchDataApiUrl:String,
        searchData:Object,
        getSearchableFieldDataApiUrl:Array,
    });

    onMounted(()=>{
        loadSearchTabs
    });

    const hasSelectedTabs = computed(()=>selectedTabs.length > 0);
    const allSearchDataIsLoaded = computed(()=>groupTabs.length > 0 && selectedTabs.length);

    const selectGroupTab = (groupTab)=>{
        state.showSelectableTabs = true;
        state.selectedGroupTabName = groupTab.title;
    };

    const selectChildTab = (childTab)=>{
        const doesNotHaveTab = selectedTabs.find(tab=>tab.title === childTab.title) === undefined;
        if(doesNotHaveTab){
            state.selectedTabs.push(childTab);
        }else{
            return;
        }
    };

    const removeSelectedTab = (selectedTab) => {
        state.selectedTabs = state.selectedTabs.filter((tab)=> tab.title !== selectedTab.title);
    }

    const loadSearchTabs = () =>{
        api.get({
            url:props.getSearchableFieldsApiUrl,
            headers:{
                "Content-Type":"application/json"
            },
            otherConfig:null,
        }).then((data)=>{
            state.groupTabs = data.map((item)=>item.title);
            return api.get({
                url:props.getSearchableFieldDataApiUrl,
                headers:{
                    "Content-Type":"application/json"
                },
                otherConfig:null,
            })  
        }).then((data)=>{
            state.searchableTabs = data;
        }).catch((err)=>{
            showPostCommentDataErrorMessage.value = true;
        });
    }

    const filterDataWithTabs = (selectedTab) => {
        api.get({
            url:props.getSearchableFieldsApiUrl,
            headers:{
                "Content-Type":"application/json"
            },
            otherConfig:null,
        }).then((data)=>{
            state.groupTabs = data.map((item)=>item.title);
            return api.get({
                url:props.getSearchableFieldDataApiUrl,
                headers:{
                    "Content-Type":"application/json"
                },
                otherConfig:null,
            });  
        }).then((data)=>{
            state.searchableTabs = data;
        }).catch((err)=>{
            showPostCommentDataErrorMessage.value = true;
        });
    };
</script>