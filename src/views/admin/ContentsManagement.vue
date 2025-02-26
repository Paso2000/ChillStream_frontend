<template>
  <div class="content-management">
    <h3>Contents Management</h3>
    <save-content-form></save-content-form>
    <update-content-form></update-content-form>
    <delete-component-form></delete-component-form>
  </div>
</template>

<script setup>
import SaveContentForm from "@/components/SaveContentForm.vue";
import UpdateContentForm from "@/components/UpdateContentForm.vue";
import DeleteComponentForm from "@/components/DeleteComponentForm.vue";
</script>

<style scoped>
.content-management {
  background: #111;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  margin: auto;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
  color: white;
}
</style>
