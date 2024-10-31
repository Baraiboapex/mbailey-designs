<template>
    <span>{{currentText}}</span>
</template>
<script setup>
    import { onMounted, ref } from 'vue';

    const currentText = ref("");

    const props = defineProps({
        inputString:String,
        formatTypeName:String,
        formatKeyMethod:Function
    });

    onMounted(()=>{
        currentText.value = props.formatKeyMethod(props.inputString, props.formatTypeName);
    });
</script>