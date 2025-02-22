<template>
  <button class="custom-button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
.custom-button {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  background-color: #6a0dad;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.custom-button:hover {
  background-color: #5500a1;
}
</style>
