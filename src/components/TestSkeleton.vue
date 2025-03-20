<script setup lang="ts">
import { ref } from "vue";
const sideItems = ref([
  { text: "Item 1" },
  { text: "Item 2" },
  { text: "Item 3" },
  { text: "Item 4" },
  { text: "Item 5" },
]);
</script>

<template>
  <!-- Default content when status is neither 'loading' nor 'error' -->
  <div class="skeleton-content" v-for="item in sideItems" :key="item.text">
    <div class="skeleton-item"></div>
  </div>
</template>

<style lang="scss">
.skeleton-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.skeleton-item {
  width: 70%;
  height: 20%;
  background-color: #333333;
}
</style>
