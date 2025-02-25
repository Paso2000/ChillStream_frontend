<template>
  <div class="relative w-full">
    <!-- Clickable Selector Box -->
    <div
        class="w-full px-4 py-2 border rounded-lg bg-white cursor-pointer"
    >
      {{"Select actors" }}
    </div>

    <!-- Dropdown with Checkboxes -->
    <div
        v-if="isDropdownOpen"
        class="absolute w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
    >
      <div
          v-for="actor in options"
          :key="actor"
          class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
          @click="toggleSelection(actor)"
      >
        <input
            type="checkbox"
            :checked="selectedActors?.includes(actor) ?? false"
            class="mr-2"
        />
        {{ actor }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from "vue";

// Props (list of actors)
const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Array,
    default: () => [] // Ensures it's always an array
  }
});

// Emits for two-way binding
const emit = defineEmits(["update:modelValue"]);

// Dropdown state
const isDropdownOpen = ref(true);

// Computed property to manage selection safely
const selectedActors = computed({
  get: () => Array.isArray(props.modelValue) ? props.modelValue : [], // Ensures it's always an array
  set: (newValue) => emit("update:modelValue", newValue)
});

// Toggle actor selection safely
const toggleSelection = (actor) => {
  const currentSelection = Array.isArray(selectedActors.value) ? [...selectedActors.value] : [];
  const index = currentSelection.indexOf(actor);

  if (index === -1) {
    currentSelection.push(actor);
  } else {
    currentSelection.splice(index, 1);
  }

  selectedActors.value = currentSelection; // Update value
};
</script>
