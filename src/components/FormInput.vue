<template>
  <input
      :type="type"
      :placeholder="placeholder"
      v-model="modelValue"
      class="input-field"
      @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    type: { type: String, default: "text" },
    placeholder: String
  }
};
</script>

<style scoped>
.input-field {
  width: 100%;
  font-family: "Arial", sans-serif;
  max-width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  margin-bottom: 10px;
  background: #d3d3d3;
  outline: none;
  box-sizing: border-box;
}
</style>

