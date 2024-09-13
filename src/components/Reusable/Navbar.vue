<template>
    <div class="d-flex flex-row justify-content-between app-nav-bar w-100 bg-dark">
        <img src="../../assets/vue.svg" height="50" width="50" class="navbar-image"/>
        <div class="d-flex justify-content-around w-50 mr-0">
            <span v-for="(route, index) in router.options.routes" :key="index">
                <router-link v-if="!route.meta.requiresAdmin" :to="route.path">
                    <span class="text-light">{{ route.name }}</span>
                </router-link>
            </span>
        </div>
    </div>
</template>
<script setup>
    import { useRouter } from "vue-router";
    const router = useRouter();
</script>