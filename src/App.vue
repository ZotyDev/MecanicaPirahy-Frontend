<script setup lang="ts">
import Login from './components/Login.vue'
</script>

<template>
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>

<style scoped lang="sass">
.container
  position: absolute
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
</style>
