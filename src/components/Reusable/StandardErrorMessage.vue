<template>
    <div v-show="showErrorMessage">
        <div class="d-flex align-items-between flex-column app-error-message">
            <h3>{{ errorMessageText }}</h3>
            <div>
                <svg
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
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, watch, onMounted } from 'vue';

    const props = defineProps({
        errorMessageText:String,
        isPermanent:Boolean,
        showMessage:Boolean
    });
    
    const showErrorMessage = ref(false);

    onMounted(()=>{
        if(props.isPermanent){
            showErrorMessage.value = true;
        }
    });

    const showThenHideMessage = ()=>{
        showErrorMessage.value = true;
        setTimeout(() => {
            showErrorMessage.value = false;
        }, 1200);
    }

    watch(()=>props.showMessage, (newVal, oldVal)=>{
        console.log("TEST DIS");
        if(newVal === true){
            showThenHideMessage();
        }
    });
</script>