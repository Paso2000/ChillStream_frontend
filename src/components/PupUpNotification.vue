<template>
  <transition name="fade">
    <div v-if="visible" :class="['alert-box', typeClass]">
      <p>{{ message }}</p>
      <button class="close-btn" @click="closeAlert">✖</button>
    </div>
  </transition>
</template>

<script setup>
import {ref, watch, computed} from 'vue';

const props = defineProps({
  message: String,
  show: Boolean,
  type: {
    type: String,
    default: 'error' // Può essere 'error' o 'success'
  }
});

const emit = defineEmits(['close']);

const visible = ref(props.show);

watch(() => props.show, (newVal) => {
  visible.value = newVal;

  if (newVal) {
    setTimeout(() => closeAlert(), 3000);
  }
});

const typeClass = computed(() => {
  return props.type === 'success' ? 'alert-success' : 'alert-error';
});

const closeAlert = () => {
  visible.value = false;
  emit('close');
};
</script>

<style scoped>

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.alert-box {
  position: fixed;
  top: 100px;
  right: 10px;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  font-weight: bold;
  background: rgb(61, 60, 60, 0.6);

  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 250px;
}

.alert-error {
  border: 2px solid red;

}

.alert-success {
  border: 2px solid green;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-left: 20px;
}
</style>