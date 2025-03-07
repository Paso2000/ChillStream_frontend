<template>
  <input
      :type="props.type"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      class="input-field"
      @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: "text" },
  placeholder: String,
  modelValue: "",  // Aggiunto modelValue come prop!
});
</script>

<style scoped>
.input-field {
  width: 100%;
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

