<script setup lang="ts">
import { defineProps } from 'vue';

// Define props directly using defineProps
const props = defineProps<{
  items: { text: string }[];
  status: string;
}>();
</script>

<template>
  <div class="content-sideinfo">
    <img class="sideinfo-avatar" src="/Blur.png" alt="sideinfo avatar" />
    <div class="sideinfo-skeleton">
      <!-- Display a different message based on the status -->
      <div v-if="props.status === 'loading'">
        Loading...
      </div>
      <div v-else-if="props.status === 'error'">
        Something went wrong!
      </div>
      <div class="skeleton-content" v-else>
        <!-- Default content when status is neither 'loading' nor 'error' -->
        <div class="skeleton-content" v-for="item in props.items" :key="item.text">
          <div class="skeleton-item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-sideinfo {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5%;
  padding: 8%;
}

.sideinfo-avatar {
  width: 100%;
}

.sideinfo-skeleton {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10%;
  text-align: center;
}

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
