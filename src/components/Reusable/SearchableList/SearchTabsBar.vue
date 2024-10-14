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
                            <!--NOTE This is wrong! This needs to be a searchable list-->
                            <SearchableList
                                dataLoadingMessage=""
                                listDirection="row"
                                :listLabel="`Please Select A ${selectedGroupTabName}`"
                                :canSelectListItems="false"
                                :listItems="state.searchableTabs[state.selectedTabs]"
                                :searchableField="selectedGroupTabName"
                                :showListLoadingSignOnSearch="false"
                                :showSubmissionMessage="false"
                                :submissionWasSuccessful="true"    
                            >
                            <template #listItemTemplate="data">

                            </template>
                            </SearchableList>
                            <div v-for="tab in state.searchableTabs[state.selectedTabs]" :key="tab.id" class="search-tabs-data-tap" @click="()=>selectChildTab(tab)">
                                {{ tab.title }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-if="hasSelectedTabs" class="col-12">
                    <div v-for="selectedTab in selectedTabs" @click="()=>removeSelectedTab(selectedTab)" :key="selectedTab.id" class="app-search-group-tab" >
                        <span>{{ selectedTab.title }}</span>
                    </div>
                </div>
                <div v-else class="col-12">
                    <div class="w-100 d-flex justify-content-center">
                        <span class="text-secondary">No search tabs have been selected</span>
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
    import { reactive, onMounted, computed, watch } from "vue";

    import SearchableList from "./SearchableList.vue";
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
        getSearchableDataApiUrl:String,
        apiObject:Object
    });

    watch(
        ()=>state.selectedTabs,
        ()=>{
            filterDataWithTabs();
        }
    );

    onMounted(()=>{
        const hasAPIObjectAttached = props.apiObject;

        if(hasAPIObjectAttached){
            loadSearchTabs();
        }
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
        apiObject.get({
            url:props.getSearchableFieldsApiUrl,
            headers:{
                "Content-Type":"application/json"
            },
            otherConfig:null,
        }).then((data)=>{
            state.groupTabs = data.map((item)=>item.title);
            return api.get({
                url:props.getSearchableDataApiUrl,
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

    const filterDataWithTabs = () => {

        // if(hasAPIObjectAttached){
        //     filterDataThroughAPI();
        // }else{
        //     filterDataLocally()
        // }

        console.log(currentSelectedTabs);

        //Add an API call here to get dataa based on filter type and filter data
    };  

    //---ADD LATER!---//
    // const filterDataLocally = () => {
        
    // };

    const filterDataThroughAPI = () => {
        const currentSelectedTabs = selectedTabs.value;
        
    };
</script>