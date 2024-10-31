<template>
    <div class="d-flex flex-column justify-content-between">
        <div class="d-flex flex-column justify-content-between">
            <div class="d-flex flex-column justify-content-between">
                <button type="button" v-if="initiatSearchByButtonClick">
                    {{ searchButtonText }}
                </button>
                <div class="w-100 d-flex flex-column">
                    <slot 
                        :dataToSearch="dataToSearch" 
                        :searchListByApi="searchListByApi"
                        :showListLoadingSignOnSearch="showLoadingSign"
                        :showSubmissionMessage="showSubmissionMessage"
                        :submissionWasSuccessful="submissionWasSuccessful"
                    >
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, computed, onMounted } from "vue";
    
    const props = defineProps({
        apiSearchObject:Object,
        initiatSearchByButtonClick:Boolean,
        searchableListApiTitle:String,
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
            default:"Loading Data..."
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
    const submissionWasSuccessful = ref(true);
    const showSubmissionMessage = ref(false);
    
    const loadingSignIsNotVisible = computed(()=>!showLoadingSign.value);

    const resetSearch = ()=>{
        showError.value = true;
        submissionWasSuccessful.value = false;
    }

    const searchListByApi = (data) => {
        const {searchText} = data;

        submissionWasSuccessful.value = true;
        showLoadingSign.value = true;
        showSubmissionMessage.value = false;

        props.apiSearchObject({
            searchText
        }).then((data)=>{
            dataToSearch.value = data.response;
            submissionWasSuccessful.value = true;
            showLoadingSign.value = false;
            emittedEvents("postsLoaded",true);
        }).catch((err)=>{
            showError.value = true;
            showLoadingSign.value = false;
            showSubmissionMessage.value = true;
            submissionWasSuccessful.value = false;
        })
    }

</script>