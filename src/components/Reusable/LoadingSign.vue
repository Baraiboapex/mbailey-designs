<template>
    <section v-if="showLoadingSign" class="message message-box" id="loadingMessage">
        <h3 id="loadingMessageText">{{ loadingMessageText }}</h3>
        <h2 class="spinner-border" role="status"></h2>
    </section>
</template>
<script setup>
    defineProps({
        showLoadingSign:Boolean,
        loadingMessageText:String
    });
</script>