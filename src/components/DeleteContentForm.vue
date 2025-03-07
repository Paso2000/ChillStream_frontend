<template>
  <div class="section">
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


const title = ref("")


const deleteContent = async () => {
  try {
    const allFilms = await getFilmList();
    const filmFound = allFilms.find(
        (film) => title.value === film.title);
    if (filmFound) {
      await deleteFilm(filmFound._id);
      alert("Film changed successfully");
    } else {
      alert("Film not found")
    }
  } catch (error) {
    alert("Error saving film:");
  }

};
</script>

<style scoped>
/* Sezione */
.section {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
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
</style>
