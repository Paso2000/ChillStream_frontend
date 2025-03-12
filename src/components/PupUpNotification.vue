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

// Props
const props = defineProps({
  message: String,
  show: Boolean,
  type: {
    type: String,
    default: 'error' // Può essere 'error' o 'success'
  }
});

const emit = defineEmits(['close']);

// Stato visibilità locale
const visible = ref(props.show);

// Quando cambia show, aggiorna il visibile
watch(() => props.show, (newVal) => {
  visible.value = newVal;

  if (newVal) {
    setTimeout(() => closeAlert(), 3000);
  }
});

// Classe CSS dinamica basata su `type`
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
  top: 30px;
  right: 30px;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  font-weight: bold;
  background: url("/background.jpg") center/cover no-repeat;
  background: rgba(0, 0, 0, 0.6);

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