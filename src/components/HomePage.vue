
<template>
  <div>
  </div>
</template>
<script setup>
  import { reactive, onMounted, computed } from "vue";
  
  const state = reactive({
    homeData:{
      introData:{},
      recentProjects:[],
      recentBlogPosts:[]
    },
  });

  onMounted(()=>{
    loadData()
  });

  const load

  const loadData = ({
    dataToLoad
  }) =>{

  };


</script>