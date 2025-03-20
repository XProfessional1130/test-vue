<script setup lang="ts">
</script>

<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 16px;
  border: 1px solid #383838;
  background-color: #262626;
  color: #4d4d4d;
}
</style>
