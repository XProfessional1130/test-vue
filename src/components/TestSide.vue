<script setup lang="ts">
import TestSkeleton from './TestSkeleton.vue';
</script>

<template>
  <div class="content-sideinfo">
    <img class="sideinfo-avatar" src="/Blur.png" alt="sideinfo avatar" />
    <div class="sideinfo-skeleton">
      <TestSkeleton />
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

</style>
