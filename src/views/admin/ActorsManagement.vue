<template>
  <div class="content-management">
    <PopUpNotification :message="alertMessage" :show="showAlert" :type="alertType" @close="closeAlert"/>
    <h3>Actors Management</h3>

    <!-- Add new actor -->
    <div class="section">
      <h4>Add new actor</h4>
      <div class="form-group">
        <FormInput v-model="saveName" placeholder="Name"/>
        <FormInput v-model="saveSurname" placeholder="Surname"/>
        <FormInput v-model="saveDate_of_birth" placeholder="date of birth"/>
      </div>
      <button @click="saveActor" class="form-button">Save actors</button>
    </div>

    <!-- Update actor -->
    <div class="section">
      <h4>Update actor</h4>
      <div class="form-group">
        <FormInput v-model="updateName" placeholder="Name"/>
        <FormInput v-model="updateSurname" placeholder="Surname"/>
        <FormInput v-model="updateDate_of_birth" placeholder="date of birth"/>
      </div>
      <button @click="updateActor" class="form-button">Update actor</button>
    </div>

    <!-- Delete actor -->
    <div class="section">
      <h4>Delete actor</h4>
      <FormInput v-model="deleteSurname" placeholder="Surname"/>
      <button @click="deleteActorFromDb" class="form-button">Delete</button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import FormInput from "@/components/FormInput.vue";
import Button from "@/components/Button.vue";
import {deleteActor, getActorList, getFilmList, postActors, putActor, putFilm} from "@/service/contentApi.js";
import PopUpNotification from "@/components/PupUpNotification.vue";

// Actor data
const saveName = ref("");
const saveSurname = ref("");
const saveDate_of_birth = ref("");
const updateDate_of_birth = ref("");
const updateSurname = ref("");
const updateName = ref("");
const deleteSurname = ref("");
const showAlert = ref(false);
const alertMessage = ref("");
const alertType = ref('error');

const saveActor = async () => {
  try {
    const actorData = {
      name: saveName.value,
      surname: saveSurname.value,
      date_of_birth: saveDate_of_birth.value
    };

    await postActors([actorData]);
    alertMessage.value = "Actor saved successfully";
    alertType.value = "success"
    showAlert.value = true;

  } catch (error) {
    alertMessage.value = "Error saving actor";
    alertType.value = "error"
    showAlert.value = true;
  }
};

const updateActor = async () => {
  try {
    const actorData = {
      name: updateName.value,
      surname: updateSurname.value,
      date_of_birth: updateDate_of_birth.value
    };
    const allActor = await getActorList();
    const actorFound = allActor.find(
        (actor) => updateSurname.value === actor.surname);
    if (actorFound) {
      await putActor(actorFound._id, actorData);
      alertMessage.value = "Actor changed successfully";
      alertType.value = "success"
      showAlert.value = true;
    } else {
      alertMessage.value = "Actor not found";
      alertType.value = "error"
      showAlert.value = true;
    }

  } catch (error) {
    alertMessage.value = "Error changing actor";
    alertType.value = "error"
    showAlert.value = true;
  }
};

const deleteActorFromDb = async () => {
  try {
    const allActor = await getActorList();
    const actorFound = allActor.find(
        (actor) => deleteSurname.value === actor.surname);
    if (actorFound) {
      await deleteActor(actorFound._id);
      alertMessage.value = "Actor deleted successfully";
      alertType.value = "success"
      showAlert.value = true;
    } else {
      alertMessage.value = "Actor not found";
      alertType.value = "error"
      showAlert.value = true;
    }
  } catch (error) {
    alertMessage.value = "Error deleting actor";
    alertType.value = "error"
    showAlert.value = true;
  }
};

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
</style>
