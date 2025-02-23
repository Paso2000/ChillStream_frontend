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
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  background: linear-gradient(90deg, #8a2be2, #6a0dad);
  color: white;
  font-weight: bold;
  transition: 0.3s;
}

.custom-button:hover {
  background: linear-gradient(90deg, #a832eb, #7a0dad);
  transform: scale(1.05);
}

.custom-button:active {
transform: scale(0.98);
}

</style>