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
import ContentsManagement from "@/views/admin/ContentsManagement.vue";
import ActorsManagement from "@/views/admin/ActorsManagement.vue";
import SendNotifications from "@/views/admin/SendNotifications.vue";

export default {
  components: {
    SendNotifications,
    ActorsManagement,
    AdminNavbar,
    ContentsManagement,
    //ActorsManagement,
    //SendNotifications,
  },
  data() {
    return {
      activeSection: "contents", // Sezione predefinita
    };
  },
  computed: {
    getSectionTitle() {
      const titles = {
        contents: "Contents Management",
        actors: "Actors Management",
        notifications: "Send Notifications",
      };
      return titles[this.activeSection] || "Admin Panel";
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
