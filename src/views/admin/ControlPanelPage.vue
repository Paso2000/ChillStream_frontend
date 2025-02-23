<template>
  <div class="control-panel">
    <AdminNavbar @changeSection="activeSection = $event" />

    <div class="content">
      <h2>{{ getSectionTitle }}</h2>

      <ContentsManagement v-if="activeSection === 'contents'" />
      <ActorsManagement v-if="activeSection === 'actors'" />
      <SendNotifications v-if="activeSection === 'notifications'" />

    </div>
  </div>
</template>

<script>
import AdminNavbar from "@/components/AdminNavbar.vue";
import ContentForm from "@/components/ContentForm.vue";


export default {
  components: { AdminNavbar, ContentForm },
  data() {
    return {
      activeSection: "dashboard",
    };
  },
  computed: {
    getSectionTitle() {
      const titles = {
        contents: "Contents managements",
        actors: "Actors managements",
        notifications: "Send notifications",
      };
      return titles[this.activeSection];
    },
  },
};
</script>

<style scoped>
.control-panel {
  background-color: #3d3c3c;
  color: white;
  min-height: 100vh;
}

.content {
  padding: 20px;
}
</style>
