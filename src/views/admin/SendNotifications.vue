<template>
  <div class="content-management">
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



const notification = ref({
  senderNickname: sessionStorage.getItem("admin"),
  ricever_id:"",
  text:""
})

const sendNotification = async () => {
  try{
  let userProfiles = ref([])
 const allUser = await getUsers();
 for (const user of allUser) {
   userProfiles =  await getProfiles(user._id,);
   for (const profile of userProfiles) {
     notification.value.ricever_id = profile._id;
     await postNotification(user._id, profile._id, notification.value);
   }}
 alert("Notifications sent")
  }
 catch(error){
   alert("Notification error")
    }

}
</script>

<style scoped>
/* Stile Generale */
.content-management {
  background: #111;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  margin: auto;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
  color: white;
}

/* Sezione */
.section {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

/* Input in riga */
.form-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.form-input:focus {
  background: #444;
  outline: none;
}

/* Textarea */
.form-textarea {
  font-family: "Arial", sans-serif;
  width: 100%;
  min-height: 80px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  resize: none;

  padding: 10px;
  margin-bottom: 10px;
  background: #d3d3d3;
  outline: none;
  box-sizing: border-box;
}

/* Pulsanti */
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

.custom-text-input{
  max-width: 800px;
  margin-bottom: 0;
}

</style>
