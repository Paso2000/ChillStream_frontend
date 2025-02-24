<template>
  <div class="control-panel">
    <AdminNavbar @changeSection="activeSection = $event"/>

    <div class="content">
      <ContentsManagement v-if="activeSection === 'contents'"/>
      <ActorsManagement v-if="activeSection === 'actors'"/>
      <SendNotifications v-if="activeSection === 'notifications'"/>

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
  },
  data() {
    return {
      activeSection: "contents", // Sezione predefinita
    };
  }
};
</script>


<style scoped>
.control-panel {
  background: linear-gradient(135deg, #000000, #111);
  color: white;
  min-height: 100vh;
}

.content {
  padding: 20px;
}
</style>
