<template>
  <button class="custom-button" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup>
import {ref} from "vue";

const isClicked = ref(false);

const handleClick = (event) => {
  if (isClicked.value) return;
  isClicked.value = true;
  setTimeout(() => {
    isClicked.value = false;
  }, 300);

  event.stopPropagation();
  event.preventDefault();
  emit("click");
};

const emit = defineEmits(["click"]);
</script>

<style scoped>
/* Mobile First */
.custom-button {
  width: 100%;
  max-width: 200px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  background: linear-gradient(90deg, #8a2be2, #6a0dad);
  color: white;
  font-weight: bold;
  transition: 0.3s;
  margin-top: 15px;
}

.custom-button:hover {
  background: linear-gradient(90deg, #a832eb, #7a0dad);
  transform: scale(1.05);
}

.custom-button:active {
  transform: scale(0.98);
}

/* Desktop */
@media (min-width: 768px) {
  .custom-button {
    max-width: 300px;
  }
}

</style>