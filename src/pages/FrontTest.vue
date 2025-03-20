<script setup lang="ts">
import Container from "../components/Container.vue";
import TestSide from "../components/TestSide.vue";
import TestContent from "../components/TestContent.vue";
import { ref, watch, onUnmounted, onMounted } from 'vue';

const sideItems = ref([
  { text: "Item 1" },
  { text: "Item 2" },
  { text: "Item 3" },
  { text: "Item 4" },
  { text: "Item 5" },
]);

const status = ref('true');

const rand = () => Math.random(); // Random number between 0 and 1

let contentItems = ref(
  JSON.parse(localStorage.getItem("contentItems") || "null") ||
  Array.from({ length: 5 }, (_, i) =>
    Array.from({ length: 5 }, (_, j) => ({
      text: `Item ${i + 1}, ${j + 1}`,
      type: Math.floor(rand() * 3), // Random number between 0 and 2
      visible: rand() > 0.7, // 30% chance to be visible
    }))
  )
);

console.log(contentItems.value);

// Save the contentItems array to localStorage whenever it changes
const saveContentItems = () => {
  localStorage.setItem("contentItems", JSON.stringify(contentItems.value));
};
// Watch for changes in the contentItems array and save to localStorage
onMounted(() => {
  window.addEventListener("beforeunload", saveContentItems); // Save before the page is unloaded
});

onUnmounted(() => {
  window.removeEventListener("beforeunload", saveContentItems);
});
</script>

<template>
  <div class="front-test">
    <div class="front-test-body" style="height: 90%">
      <Container class="test-body-side">
        <TestSide :items="sideItems" :status="status" />
      </Container>
      <Container class="test-body-content">
        <TestContent :items="contentItems" />
      </Container>
    </div>
    <Container class="front-test-footer">
      <p>Front Test</p>
    </Container>
  </div>
</template>

<style lang="scss" scoped>
.front-test {
  height: 100%;
  width: 70%;
  min-width: 850px;
  display: flex;
  flex-direction: column;
  padding: 2%;
  gap: 3%;
}

.front-test-body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2%;
  height: 80%;
}

.test-body-side {
  width: 30%;
  max-width: 400px;
}

.front-test-footer {
  height: 10%;
}
</style>
