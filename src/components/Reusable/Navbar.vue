<template>
    <nav class="navbar navbar-expand-md fixed-top navbar-dark w-100">
        <div class="d-flex flex-row align-items-center w-75 nav-brand-container">
            <img src="/assets/mpb-logo.svg" height="77" width="77" class="navbar-image" @click="goHome"/>
            <span>&nbsp;&nbsp;</span>
            <span class="text-wrap">matthew p bailey designs</span>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mt-2 mb-lg-0 d-flex justify-content-end p-2">
                <li class="nav-item w-100" v-for="(route, index) in router.options.routes" :key="index">
                    <router-link class="text-decoration-none nav-item" v-if="!route.meta.requiresAdmin" :to="route.path">
                        <span>{{ route.name }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script setup>
    import { useRouter } from "vue-router";
    const router = useRouter();

    const goHome = () => {
        router.push("/");
    }
</script>