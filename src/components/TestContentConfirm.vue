<script setup lang="ts">
import { defineProps, ref, onBeforeMount } from "vue";
import TestSkeleton from "./TestSkeleton.vue";
import getIconForType from "@/utils/getIconForType";

const props = defineProps<{
  item:
    | { text: string; visible: boolean; type: number; amount: number }
    | { text: ""; visible: false; type: 0; amount: 0 };
  setVisible: () => void;
  setAmount: (amount:number) => void;
}>();

</script>

<template>
  <div class="content-confirm">
    <span
      class="confirm-cancel"
      @click="
        () => {
          props.setVisible();
        }
      "
      >x</span
    >
    <div class="confirm-image">
      <component
        :is="getIconForType(props.item.type)"
        style="width: 100%; height: 100%"
      />
    </div>
    <TestSkeleton />
    <div class="confirm-action">
      <input v-model="props.item.amount" class="confirm-amount" />
      <div class="confirm-button">
        <button class="btn-confirm" @click="()=>{
          props.setAmount(props.item.amount);
          props.setVisible();
        }">Confirm</button>
        <button
          class="btn-cancel"
          @click="
            () => {
              props.setVisible();
            }
          "
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.content-confirm {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5%;
  height: 100%;
  width: 100%;
  z-index: 2;
}

.confirm-image {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20% 20% 0 20%;
  border-radius: 10%;
  background-color: #262626;
  border: 1px solid #383838;
}

.confirm-cancel {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 1.5rem;
  cursor: pointer;
}

.confirm-action {
  position: absolute;
  bottom: 0%;
  left: 0%;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10%;
  background-color: #262626;
  border: 1px solid #383838;
}

.confirm-amount {
  width: 100%;
  background-color: #262626;
  border: 1px solid #383838;
  color: #4d4d4d;
  font-size: large;
  text-align: center;
  padding: 5%;
  border-radius: 10px;
  margin: 0 0 5% 0;
}

.confirm-button {
  display: flex;
  gap: 10%;
  width: 100%;
  justify-content: center;
  align-items: center;

  button {
    width: 40%;
    padding: 5%;
    border-radius: 10px;
    border: 1px solid #383838;
    color: #4d4d4d;
    font-size: large;
    cursor: pointer;
  }

  .btn-confirm {
    background-color: #ce3434;
  }

  .btn-cancel {
    background-color: #332f2f;
  }
}
</style>
