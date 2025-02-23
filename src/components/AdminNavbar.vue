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
  background-color: #111;
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
  background: #6a0dad;
  border-bottom: 2px solid white;
}
</style>
