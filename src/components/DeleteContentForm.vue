<template>
  <div class="section">
    <PopUpNotification :message="alertMessage" :show="showAlert" :type="alertType" @close="closeAlert"/>
    <h4>Delete content</h4>
    <FormInput v-model="title" placeholder="Title"/>
    <button @click="deleteContent" class="form-button">Delete</button>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {deleteFilm, getFilmList, putFilm} from "@/service/contentApi.js";
import {defineComponent} from "vue";
import FormInput from "@/components/FormInput.vue";
import PopUpNotification from "@/components/PupUpNotification.vue";


const title = ref("")

const showAlert = ref(false);
const alertMessage = ref("");
const alertType = ref('error');

const deleteContent = async () => {
  try {
    const allFilms = await getFilmList();
    const filmFound = allFilms.find(
        (film) => title.value === film.title);
    if (filmFound) {
      await deleteFilm(filmFound._id);
      alertMessage.value = "Film deleted successfully";
      alertType.value = "success"
      showAlert.value = true;
    } else {
      alertMessage.value = "Film not found";
      alertType.value = "error"
      showAlert.value = true;
    }
  } catch (error) {
    alertMessage.value = "Error to delete film";
    alertType.value = "error"
    showAlert.value = true;
  }

};
const closeAlert = () => {
  showAlert.value = false;
};
</script>

<style scoped>
.section {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
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
