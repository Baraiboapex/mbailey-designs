<template>
    <div class="d-flex flex-column justify-content-between">
        <div v-if="loadingSignIsNotVisible" class="d-flex flex-column justify-content-between">
            <div v-if="errorIsNotVisible" class="d-flex flex-column justify-content-between">
                <button v-if="initiatSearchByButtonClick">
                    {{ searchButtonText }}
                </button>
                <slot :dataToSearch="dataToSearch" :searchListByApi="searchListByApi"></slot>
            </div>
            <div class="d-flex flex-column justify-content-between">
                <!--
                    double-check this submission message looks 
                    aesthetically pleasing being overlaid on top 
                    of the searchable list
                -->
                <SubmissionMessage
                    :showSubmissionMessage="showSubmissionMessage"
                    :submissionWasSuccessful="submissionWasSuccessful"
                    :nameOfDataBeingSubmitted="nameOfDataBeingSubmitted"
                    submissionButtonText="Try Again"
                    submissionMessageText="Could not find data"
                    @submission-button-clicked="resetSearch"
                >
                <template #submissionFailureIconImage="data">
                    <svg v-if="!data.submissionSuccessful"
                        xmlns="http://www.w3.org/2000/svg" 
                        width="100" 
                        height="100" 
                        fill="currentColor" 
                        style="color:red;" 
                        class="bi bi-x" 
                        viewBox="0 0 16 16"
                    >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </template>
            </SubmissionMessage>
            </div>
        </div>
        <div v-else class="d-flex flex-column justify-content-between">
            <LoadingSign
                :showLoadingSign="showLoadingSign",
                :loadingMessageText="loadingSignText"
            />
        </div>
    </div>
</template>
<script setup>
    import { ref, computed, onMounted } from "vue";
    
    import LoadingSign from "../LoadingSign.vue";
    import SubmissionMessage from "../SubmissionMessage.vue";

    const props = defineProps({
        apiSearchObject:String,
        initiatSearchByButtonClick:Boolean,
        loadDataIndependently:{
            type:Boolean,
            default:false
        },
        errorMessageText:{
            type:String,
            default:"Could not load list data"
        },
        loadingSignText:{
            type:String,
            default:"Searching Data..."
        },
        searchButtonText:{
            type:String,
            default:"Search"
        },
        intiateSearchBySearcgTextUpdate:{
            type:Boolean,
            default:true
        }
    });
    
    const emittedEvents = defineEmits(["postsLoaded"]);
    
    onMounted(()=>{
        if(props.loadDataIndependently){
            searchListByApi({
                searchText:""
            });
        }
    });

    const dataToSearch = ref([]);
    const showError = ref(false);
    const showLoadingSign = ref(false);
    const submissionWasSuccessful = ref(false);
    
    const errorIsNotVisible = computed(()=>!showError.value);
    const loadingSignIsNotVisible = computed(()=>!showLoadingSign.value);
    const showSubmissionMessage = computed(()=>!showLoadingSign.value);

    const resetSearch = ()=>{
        showError.value = true;
        submissionWasSuccessful.value = false;
    }

    const searchListByApi = (data) => {
        const {searchText} = data;
        apiSearchObject({
            searchText
        }).then((data)=>{
            dataToSearch.value = data
            emittedEvents("postsLoaded",true);
        }).catch(()=>{
            showError.value = true;
            submissionWasSuccessful.value = false;
            emittedEvents("postsLoaded",false);
        })
    }

</script>