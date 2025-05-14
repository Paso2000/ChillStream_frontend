<template>
  <div class="content-management">
    <PopUpNotification :message="alertMessage" :show="showAlert" :type="alertType" @close="closeAlert"/>
    <h3>Notifications Management</h3>
    <!-- notifications new actor -->
    <div class="section">
      <h4>Add new notifications</h4>
      <div class="form-group">
        <FormInput class="custom-text-input" v-model=" notification.text" placeholder="Notification text"/>
      </div>
      <Button @click="sendNotification" class="form-button">Send</Button>
    </div>

  </div>
</template>

<script setup>
import Button from "@/components/Button.vue";
import {ref} from "vue";
import {getProfiles, getUsers, postUser} from "@/service/authApi.js";
import {postNotification} from "@/service/interactionApi.js";
import DescriptionInput from "@/components/DescriptionInput.vue";
import FormInput from "@/components/FormInput.vue";
import PopUpNotification from "@/components/PupUpNotification.vue";

const notification = ref({
  senderNickname: sessionStorage.getItem("admin"),
  ricever_id: "",
  text: ""
})

const showAlert = ref(false);
const alertMessage = ref("");
const alertType = ref('error');

const sendNotification = async () => {
  try {
    let userProfiles = ref([])
    const allUser = await getUsers();
    for (const user of allUser) {
      userProfiles = await getProfiles(user._id,);
      for (const profile of userProfiles) {
        notification.value.ricever_id = profile._id;
        await postNotification(user._id, profile._id, notification.value);
      }
    }
    alertMessage.value = "Notification sent";
    alertType.value = "success"
    showAlert.value = true;
  } catch (error) {
    alertMessage.value = "Notification error";
    alertType.value = "error"
    showAlert.value = true;
  }
}

const closeAlert = () => {
  showAlert.value = false;
};
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

.section {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.form-button {
  width: 100%;
  background: linear-gradient(90deg, #a259ff, #6a0dad);
  color: white;
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.form-button:hover {
  background: linear-gradient(90deg, #b06aff, #7a1edf);
  transform: scale(1.05);
}

.custom-text-input {
  max-width: 800px;
  padding: 20px 5px;
  margin-bottom: 0;
}
</style>
