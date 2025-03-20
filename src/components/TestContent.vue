<script setup lang="ts">
import { defineProps, ref, watch, onMounted, onUnmounted } from "vue";
import getIconForType from "@/utils/getIconForType";
import Container from "./Container.vue";
import TestContentConfirm from "./TestContentConfirm.vue";

const props = defineProps<{
  items: { text: string; visible: boolean; type: number; amount: number }[][];
}>();

let selectedItemData = ref<{
  text: string;
  visible: boolean;
  type: number;
  amount: number
} | null>({ text: "", type: 0, visible: false, amount: 0 });

const setItemValue = (amount: number) => {
  props.items[selectedItem.value!.colIndex][selectedItem.value!.itemIndex].amount = amount;
}

const visible = ref(false);
const setVisible = () => {
  visible.value = !visible;
}

const itemsTableRef = ref<HTMLElement | null>(null);
let isDraggable = ref(false);
let selectedItem = ref<{ colIndex: number; itemIndex: number } | null>(null);
let mouseOldPosition = { x: 0, y: 0 };
let mouseOrigialPosition = { x: 0, y: 0 };

// Try to load saved positions from localStorage
let itemPositions = ref(
  props.items.map((column, colIndex) =>
    column.map((_, itemIndex) => ({
      x: 20 * itemIndex,
      y: 20 * colIndex,
      offsetX: 0,
      offsetY: 0,
    }))
  )
);

const mouseDown = (e: MouseEvent, colIndex: number, itemIndex: number) => {
  isDraggable.value = true;
  mouseOldPosition = { x: e.clientX, y: e.clientY };
  mouseOrigialPosition = {
    x: e.clientX,
    y: e.clientY,
  };

  selectedItem.value = { colIndex, itemIndex };
  selectedItemData.value = props.items[colIndex][itemIndex];
};

const mouseMovement = (e: MouseEvent) => {
  if (selectedItem.value && isDraggable.value) {
    const { colIndex, itemIndex } = selectedItem.value;
    const position = itemPositions.value[colIndex][itemIndex];

    position.offsetX += e.clientX - mouseOldPosition.x;
    position.offsetY += e.clientY - mouseOldPosition.y;

    mouseOldPosition = { x: e.clientX, y: e.clientY };
  }
};

const mouseRelease = () => {
  if (selectedItem.value) {
    const { colIndex, itemIndex } = selectedItem.value;
    const position = itemPositions.value[colIndex][itemIndex];

    // Use getBoundingClientRect for accurate measurements
    const parentRect = itemsTableRef.value?.getBoundingClientRect();
    const parentWidth = parentRect?.width || 525;
    const parentHeight = parentRect?.height || 500;

    const newColIndex: number = Math.floor(
      ((position.offsetY + mouseOrigialPosition.y - (parentRect?.y || 0)) /
        parentHeight) *
        5
    );
    // Calculate new item index based on the offset and parent width
    const newItemIndex: number = Math.floor(
      ((position.offsetX + mouseOrigialPosition.x - (parentRect?.x || 0)) /
        parentWidth) *
        5
    );

    // Ensure it's within bounds
    if (
      newColIndex >= 0 &&
      newColIndex < props.items.length &&
      newItemIndex >= 0 &&
      newItemIndex < props.items[newColIndex].length
    ) {
      // Swap positions

      const buffer = { ...props.items[colIndex][itemIndex] };

      props.items[colIndex][itemIndex] = {
        ...props.items[newColIndex][newItemIndex],
      };
      props.items[newColIndex][newItemIndex] = {
        ...buffer,
      };
    } else {
      // Reset the position if it's out of bounds
      position.offsetX = 0;
      position.offsetY = 0;
    }    
  }

  setTimeout(()=>{
    isDraggable.value = false;
  }, 50)
};

watch(
  () => props.items,
  (newItems) => {
    // Recalculate item positions when items change
    itemPositions.value = newItems.map((column, colIndex) =>
      column.map((_, itemIndex) => ({
        x: 20 * itemIndex,
        y: 20 * colIndex,
        offsetX: 0,
        offsetY: 0,
      }))
    );
  },
  { deep: true } // Watch deeply to catch changes inside the nested arrays
);

// Attach global mouse event listeners
onMounted(() => {
  window.addEventListener("mousemove", mouseMovement);
  window.addEventListener("mouseup", mouseRelease);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", mouseMovement);
  window.removeEventListener("mouseup", mouseRelease);
});
</script>

<template>
  <div class="content-container">
    <div class="items-table" ref="itemsTableRef">
      <div class="items-column" v-for="(column, colIndex) in props.items">
        <div
          class="item"
          v-for="(item, itemIndex) in column"
          :key="item.text"
          @mouseup="() => {
            if (item.visible) {
              visible = true;
            }
          }"
          @mousedown="(e) => mouseDown(e, colIndex, itemIndex)"
          :class="{
            selected:
              selectedItem?.colIndex === colIndex &&
              selectedItem?.itemIndex === itemIndex,
          }"
          :style="{
            top: `${itemPositions[colIndex][itemIndex].y}%`,
            left: `${itemPositions[colIndex][itemIndex].x}%`,
            transform: `translate(${itemPositions[colIndex][itemIndex].offsetX}px, ${itemPositions[colIndex][itemIndex].offsetY}px)`,
          }"
        >
          <span v-if="item.visible">
            <component :is="getIconForType(item.type)" />
            <span class="text-amount">{{ item.amount }}</span>
          </span>
        </div>
      </div>
      <Container class="item-setting" v-show="visible">
        <TestContentConfirm :item="selectedItemData!" :set-visible="setVisible" :set-amount="setItemValue" />
      </Container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.items-table {
  width: 100%;
  height: 100%;
  position: relative;
}

.item {
  position: absolute;
  width: 20%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #262626;
  color: #4d4d4d;
  border: 1px solid #383838;
  box-sizing: border-box;
  cursor: grab;
  transition: transform 0.1s ease-out;
}

.selected {
  z-index: 1;
}

.item-setting {
  position: absolute;
  width: 30%;
  height: 100%;
  top: 0%;
  right: 0%;
}
</style>
