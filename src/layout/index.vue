<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex-1">
      <router-view />
    </div>
    <bottom-nav-vue />
  </div>
</template>

<script setup lang="ts">
import BottomNavVue from "./bottom-nav.vue";
</script>

<style scoped>

</style>
