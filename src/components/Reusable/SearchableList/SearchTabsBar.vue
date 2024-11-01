<template>
    <div class="row item-frame">
        <div class="col-12">
            <div class="row">
                <div class="col-12 d-flex flex-column m-2">
                    <h4 class="mb-2">{{searchTabsCategoriesLabel}}</h4>
                    <div class="d-flex flex-row mb-2">
                        <button
                            type="button"
                            v-for="groupTab in state.groupTabs"
                            :key="groupTab.id"
                            class="app-search-group-tab m-1 cursor-pointer btn app-button"
                            @click="()=>selectGroupTab(groupTab)"
                        >
                            <FormatComponent
                                formatTypeName="fieldName"
                                :inputString="groupTab.fieldName"
                                :formatKeyMethod="textFormatterMethod"
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="allSearchDataIsLoaded" class="row">
                <div v-if="listHasNoLoadingErrors" class="col-12">
                    <div class="d-flex flex-column w-100">
                        <div v-if="state.showSelectableTabs" class="search-tabs-data-container m-1">
                            <SearchableList
                                dataLoadingMessage=""
                                listDirection="row"
                                searchableListSubTitle="Search Filters"
                                searchableField="title"
                                :searchableListSearchtextLabel="searchTabsSearchTextBarLabel"
                                :listLabel="searchTabsBarTitle"
                                :canSelectListItems="false"
                                :listItems="state.searchableTabs[state.selectedGroupTabName]"
                                :showListLoadingSignOnSearch="false"
                                :showSubmissionMessage="false"
                                :submissionWasSuccessful="true"    
                            >
                            <template #listItemTemplate="{data}">
                                <button type="button" class="cursor-pointer btn app-button w-100" @click="selectChildTab(data)">
                                    <FormatComponent
                                        :inputString="data.title"
                                        :formatTypeName="state.selectedGroupTabName"
                                        :formatKeyMethod="textFormatterMethod"
                                    />
                                </button>
                            </template>
                            </SearchableList>
                        </div>
                    </div>
                </div>
                <div v-else class="col-12">
                    <StandardErrorMessage
                        errorMessageText="Could not load list data"
                        :showMessage="true"
                        :isPermanent="true"
                    />
                </div>
            </div>
            <div class="row" v-else>
                <div class="col-12" v-if="showLoadingSign">
                    <LoadingSign
                        :showLoadingSign="true"
                        loadingMessageText="Loading Search Data"
                    />
                </div>
            </div>
            <div class="row mt-2">
                <!--
                    PLEASE REMEMBER!!!
                    Make it to where the toggled search filter pages show the currently 
                    selected filter tabs even after a different page is exited and visited again.
                -->
                <div v-if="hasSelectedTabs" class="col-12">
                    <div class="d-flex flex-column item-frame">
                        <h6 class="m-2">Selected Search Filters</h6>
                        <div class="d-flex flex-row flex-wrap p-0 item-frame m-2">
                            <button
                                type="button"
                                class="m-2 app-search-group-tab btn app-button d-flex align-items-center" 
                                v-for="selectedTab in state.searchQueryObject[state.selectedGroupTabName]" 
                                @click="()=>removeSelectedChildTab(selectedTab)" 
                                :key="selectedTab" 
                            >
                                <div v-if="state.selectedTabNamesByObjectId[selectedTab]">
                                    {{ state.selectedTabNamesByObjectId[selectedTab] }}                                
                                </div>
                                <div v-else>
                                    <FormatComponent
                                        :inputString="selectedTab"
                                        :formatTypeName="state.selectedGroupTabName"
                                        :formatKeyMethod="textFormatterMethod"
                                    />
                                </div>
                                <svg v-if="!submissionSuccessful"
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="30" 
                                    height="30" 
                                    fill="currentColor" 
                                    class="bi bi-x" 
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else class="col-12">
                    <div class="w-100 d-flex justify-content-center align-items-center text-center p-2 item-frame">
                        <span class="text-light">No search tabs have been selected</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <slot 
                name="tabsFrame" 
                :filteredList="state.filteredList"
                :searchFunction="addSearchDataToQueryObject"
                :loadingForSearch="allListDataLoaded"
            >
            </slot>
        </div>
    </div>
</template>
<script setup>
    import _ from "lodash";
    import { reactive, onMounted, computed, watch, ref } from "vue";

    import {checkIfAllValuesInSearchQueryObjectAreNull} from "../../../helpers/FEAPIHelpers/queryObjectHelpers";
    import {textFormatterMethod} from "../../../helpers/formatHelpers/formattingObjects";

    import StandardErrorMessage from "../StandardErrorMessage.vue";
    import SearchableList from "./SearchableList.vue";
    import LoadingSign from "../LoadingSign.vue";
    import FormatComponent from "../FormatComponent.vue";

    const emittedEvents = defineEmits([
        "searchTabsChanged"
    ]);

    const state = reactive({
        groupTabs:[],
        searchableTabs:{},
        searchQueryObject:{},
        selectedTabNamesByObjectId:{},
        showSelectableTabs:false,
        selectedGroupTabName:"",
        filteredList:[]
    });

    const loadingData =  ref(false);
    const loadingListData = ref(false);

    const props = defineProps({
        searchTabsBarTitle:String,
        searchTabsCategoriesLabel:String,
        getSearchableFieldsApiUrl:String,
        searchTabsSearchTextBarLabel:String,
        searchDataApiUrl:String,
        getSearchableDataApiUrl:String,
        apiObject:Object,
        searchTabsBarTitle:String,
        showLoadingSign:Boolean,
        searchData:{
            default:null,
            type:Boolean
        },
    });

    watch(
        ()=>state.searchQueryObject,
        ()=>{
            filterDataWithTabs();
        },
        {deep:true}
    );

    onMounted(()=>{
        const hasAPIObjectAttached = props.apiObject;

        if(hasAPIObjectAttached){
            loadSearchTabs();
        }
    });

    const showPostCommentDataErrorMessage = ref(false);

    const listHasNoLoadingErrors = computed(()=>!showPostCommentDataErrorMessage.value);
    const allSearchDataIsLoaded = computed(()=>!(loadingData.value));
    const allListDataLoaded = computed(()=>!(loadingListData.value));
    const hasSelectedTabs = computed(()=>
        state.searchQueryObject[state.selectedGroupTabName] !== "NULL" && 
        state.searchQueryObject[state.selectedGroupTabName] !== undefined
    );

    const selectGroupTab = (groupTab) => {
        state.showSelectableTabs = true;
        state.selectedGroupTabName = groupTab.fieldName;

        if(state.searchQueryObject[groupTab.fieldName]){
            state.searchQueryObject[groupTab.fieldName] = state.searchQueryObject[groupTab.fieldName]
        }else{
            state.searchQueryObject[groupTab.fieldName] = "NULL";
        }
    };

    const selectChildTab = (childTab)=>{
        if(
            state.searchQueryObject[state.selectedGroupTabName] === "NULL" || 
            state.searchQueryObject[state.selectedGroupTabName] === undefined
         ){
            state.searchQueryObject[state.selectedGroupTabName] = [];
        }
        
        if(childTab.notIdSelectable){
            if(!state.searchQueryObject[state.selectedGroupTabName].includes(childTab.title)){
                state.searchQueryObject[state.selectedGroupTabName].push(childTab.title);
            }
        }else{
            if(!state.searchQueryObject[state.selectedGroupTabName].includes(childTab.id)){
                state.searchQueryObject[state.selectedGroupTabName].push(childTab.id);
            }
        }
    };

    const removeSelectedChildTab = (selectedTab) => {

        const selectedTabName = selectedTab;
        const hasValue = state.searchQueryObject[state.selectedGroupTabName].includes(selectedTabName);

        if(hasValue){
            const hasDataForSelectedField = state.searchQueryObject[state.selectedGroupTabName].length > 0;
            const removedObject = state.searchQueryObject[state.selectedGroupTabName]
            .filter((item)=> item !== selectedTabName);

            if(hasDataForSelectedField){
                state.searchQueryObject[state.selectedGroupTabName] = removedObject;
            }else{
                delete state.searchQueryObject[state.selectedGroupTabName]
            }

            if(state.searchQueryObject[state.selectedGroupTabName].length < 1){
                delete state.searchQueryObject[state.selectedGroupTabName]
            }
        }
    };

    const loadSearchTabs = async () =>{
        loadingData.value = true;

        await props.apiObject.get({
            url:props.getSearchableFieldsApiUrl,
            headers:{
                "Content-Type":"application/json"
            },
            requestContentType:"application/json", 
            otherConfig:null,
        }).then(async (data)=>{

            const dataToGet = data.response;
            
            state.groupTabs = dataToGet;

            const retrievedTabs = await new Promise(async (resolve, reject)=>{
                try{
                    const gatheredData = dataToGet.map(async (item) =>{
                        const getFieldData = await props.apiObject.get({
                            url:props.getSearchableDataApiUrl + "?fieldName="+ item.fieldName,
                            headers:{
                                "Content-Type":"application/json"
                            },
                            requestContentType:"application/json", 
                            otherConfig:null,
                        });
                        
                        return {key:item.fieldName, value:getFieldData.response};
                    });

                    const res = await Promise.all(gatheredData);
                    const mappedObject = {};
                    
                    res.forEach(item=>{
                        mappedObject[item.key] = item.value;
                    });

                    const mappedObjectValues = Object.values(mappedObject).flat(2);

                    mappedObjectValues.forEach((obj)=>{
                        if(obj.notIdSelectable === undefined){
                            state.selectedTabNamesByObjectId[obj.id] = obj.title;
                        }
                    });

                    resolve(mappedObject);
                }catch(ex){
                    reject(ex);
                }
            });

            state.searchableTabs = retrievedTabs;
            state.selectedGroupTabName = Object.keys(retrievedTabs)[0];
            state.searchQueryObject.searchText = "NULL";

        }).then((data)=>{
            loadingData.value = false;
            state.childTabs = data;
        }).catch((err)=>{
            showPostCommentDataErrorMessage.value = true;
            loadingData.value = false;
        });
    };

    const filterDataWithTabs = () => {
        const hasAPIObjectAttached = props.apiObject !== null
        && props.apiObject !== undefined && !(_.isEmpty(props.apiObject));

        if(hasAPIObjectAttached){
            filterDataThroughAPI();
        }else{
            filterDataLocally();
        }
    };  

    const filterDataLocally = () => {
        emittedEvents("searchTabsChanged", state.searchQueryObject);
    };

    const addSearchDataToQueryObject = ({
        searchText
    }) => {
        if(searchText !== ""){
            state.searchQueryObject.searchText = searchText;
        }else{
            state.searchQueryObject.searchText = "NULL";
        }
    };

    const filterDataThroughAPI = () => {
        const canLoadData = checkIfAllValuesInSearchQueryObjectAreNull({
            searchQueryObject:state.searchQueryObject
        });
        
        if(canLoadData){
            loadingListData.value = true;

            const urlParams = new URLSearchParams(state.searchQueryObject).toString();
        
            return props.apiObject.get({
                url:props.searchDataApiUrl+"?"+urlParams,
                headers:{
                    "Content-Type":"application/json"
                },
                requestContentType:"application/json", 
                otherConfig:null,
            }).then((data)=>{
                loadingListData.value = false;
                state.filteredList = data.response;
                Promise.resolve();
            }).catch(()=>{
                Promise.reject();
            });       
        }
    };
</script>