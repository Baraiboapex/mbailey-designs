<template>
    <div class="container">
        <div class="row mt-0 mb-0 pt-0 pb-0">
            <div class="col-12">
                <Navbar/>
            </div>
        </div>
        <div class="row pt-0 mt-0 mb-0">
            <div class="col-12">
                <RouterView/> 
            </div>
        </div>
        <div class="row pt-4 pb-4 mt-0 mb-0">
            <div class="col-12">
                <hr/>   
                &copy; 2024 MatthewPbaileydesigns.com
            </div>
        </div>
    </div>
</template>
<script setup>
import { RouterView } from 'vue-router';  
import Navbar from './components/Reusable/Navbar.vue';


</script>


