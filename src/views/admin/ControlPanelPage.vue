<template>
  <div class="control-panel">
    <TabNavigation
        :tabs="['Contents Management', 'Actors Management', 'Send Notification']"
        v-model:activeTab="activeTab"
    />

    <div class="content">
      <ContentForm v-if="activeTab === 'Contents Management'" />
      <UpdateForm v-if="activeTab === 'Contents Management'" />
      <DeleteForm v-if="activeTab === 'Contents Management'" />

      <div v-if="activeTab === 'Actors Management'">
        <h3>Actors Management</h3>
        <p>Coming soon...</p>
      </div>

      <div v-if="activeTab === 'Send Notification'">
        <h3>Send Notification</h3>
        <p>Feature in development...</p>
      </div>
    </div>
  </div>
</template>

<script>
import TabNavigation from "@/components/AdminNavbar.vue";
import ContentForm from "@/components/ContentForm.vue";
import UpdateForm from "@/components/UpdateForm.vue";
import DeleteForm from "@/components/DeleteForm.vue";

export default {
  components: { TabNavigation, ContentForm, UpdateForm, DeleteForm },
  data() {
    return {
      activeTab: "Contents Management",
    };
  },
};
</script>

<style scoped>
.control-panel {
  background-color: #111;
  color: white;
  padding: 20px;
}

.content {
  padding: 20px;
}
</style>
