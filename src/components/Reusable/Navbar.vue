<template>
    <div class="d-flex flex-row app-nav-bar">
        <img src="../../assets/vue.svg" height="100" width="100" class="navbar-image"/>
        <div class="d-flex flex">
            <span v-for="(route, index) in router.options.routes" :key="index">
                <router-link v-if="!route.meta.requiresAdmin" :to="route.path">
                    {{ route.name }}
                </router-link>
            </span>
        </div>
    </div>
</template>
<script setup>
    import { useRouter } from "vue-router";
    const router = useRouter();
</script>