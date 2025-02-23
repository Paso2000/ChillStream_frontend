<template>
  <div class="tab-nav">
    <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="$emit('update:activeTab', tab)"
        :class="{ active: activeTab === tab }"
    >
      {{ tab }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    tabs: Array,
    activeTab: String,
  },
};
</script>

<style scoped>
.tab-nav {
  display: flex;
  background: linear-gradient(90deg, #8a2be2, #6a0dad);
  padding: 10px;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

button.active {
  transform: scale(2);
}
</style>
