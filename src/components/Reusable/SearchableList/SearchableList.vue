<template>
    <div class="p-2">
        <div class="row p-0">
            <div class="col-12 p-0">
                <div class="field-group">
                    <h4>{{ listLabel }}</h4>
                </div>
            </div>
        </div>
        <div class="row p-0 mb-2">
            <div class="col-12 p-0">
                <label>Selected Items</label>
                <div v-if="doesNotHaveCustomComponent" :class="'d-flex selcted-item-container app-component-border justify-content-start align-items-center flex-wrap'+'flex-'+listDirection + 'list-item-as-'+listDirection">
                    <div v-for="item in state.selectedItems" class="app-button-small p-1 m-1 d-flex flex-row text-overflow-elipses">
                        <slot name="listItemTemplate" :data="item"></slot>
                    </div>
                </div>
                <div v-else :class="'d-flex selcted-item-container app-component-border justify-content-start align-items-center flex-wrap'+'flex-'+listDirection + 'list-item-as-'+listDirection">
                    <div v-for="item in state.selectedItems" class="app-button-small p-1 m-1 d-flex flex-row text-overflow-elipses">
                        <button class="p-0 close-button btn btn-danger p-1" @click="(event)=>removedItemFromList(event, item)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button>
                        <span class="m-2">{{ item[searchableField] }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row p-0">
            <div class="col-12 p-0">
                <div class="field-group mt-2 mb-2">
                    <label for="subject">Search List Items</label>
                    <input type="text" :disabled="showLoading" name="subject" class="w-100 m-1 text-input" @keyup="((event)=>searchItems(event))"/>
                </div>
            </div>
        </div>
        <div class="row p-0 app-component-border" v-if="canSelectListItems">
            <div class="col-12">
                <div v-if="hasCustomComponent" class="list-container overflow-scroll d-flex w-100 flex-column flex-wrap justify-content-start align-items-start">
                    <div v-if="hasData" class="w-100">
                        <div v-for="item in state.actualListItems" :class="(state.selectedIndices[item.name] ? 'app-button-small-selected ' : '' ) + 'app-button-small p-3 m-1 w-100'" @click="(event)=>addItemToList(event, item)" >
                            {{ item[searchableField] }}
                        </div>
                    </div>
                    <div v-else class="d-flex justify-content-center mb-4 w-100">
                        <LoadingSign
                            :showLoadingSign="showLoading"
                            :loadingMessageText="dataLoadingMessage"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { reactive, computed, watch, onMounted, useSlots} from "vue";

    import LoadingSign from "./LoadingSign.vue";

    const currentSolts = useSlots();

    const state = reactive({
        actualListItems:[],
        selectedItems:[],
        selectedIndices:{}
    });

    const emittedEvents = defineEmits([
        "listItemsUpdated"
    ]);
    
    const props = defineProps({
        canSelectListItems:{
            type:Boolean,
            default:null
        },
        listItems:Object,
        searchableField:String,
        selectableField:{
            type:String,
            default:null
        },
        listLabel:String,
        dataLoadingMessage:String,
        listDirection:String
    });
    
    const currentData = computed(()=>props.listItems ? props.listItems : []);
    const hasData = computed(()=> props.listItems !== null && props.listItems.length > 0 && props.listItems !== undefined);
    const showLoading = computed(()=>props.listItems.length < 1);
    const doesNotHaveCustomComponent = computed(()=>currentSolts.listItemTemplate === null && currentSolts.listItemTemplate === undefined);

    onMounted(()=>{
        getData();
    });

    watch(currentData, ()=>{
        getData();
    });

    const getData=()=>{
        const formattedListItems = formatListDataFromProps();
        state.actualListItems = formattedListItems;
    };

    const formatListDataFromProps = () => {
        const formattedListItems = props.listItems.map((listItem, index)=>(
            {
                ...listItem,
            }
        ));
        return formattedListItems;
    }

    const determineActualListItemsViewed = (searchText) => {
        return searchText === "" ? props.listItems : state.actualListItems.filter((item)=>item[props.searchableField].includes(searchText));
    };

    const searchItems = (event) => {
        let searchText = event.target.value;
        let viewedListItems = determineActualListItemsViewed(searchText);

        state.actualListItems = viewedListItems;

    };

    const addItemToList = (_,item) => {
        if(props.selectableField && canSelectListItems){
            const alreadyHasItem = state.selectedItems.find((btnItem)=> btnItem[props.searchableField] === item[props.searchableField]);
        
            if(!alreadyHasItem){

                state.selectedItems.push(item);

                state.selectedIndices[item.name] = true;

                emittedEvents("listItemsUpdated", state.selectedItems);
            }else{
                return;
            }
        }
    };

    const removedItemFromList = (_,item) => {
        if(props.selectableField && canSelectListItems){
            state.selectedItems = state.selectedItems.filter(btnItem=>{
                return btnItem[props.selectableField] !== item[props.selectableField];
            });

            delete state.selectedIndices[item.name];

            emittedEvents("listItemsUpdated", state.selectedItems);
        }
    };
</script>