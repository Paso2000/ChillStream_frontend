

<template>
  <div class="section">
    <h4>Update content</h4>
    <div class="form-group">
      <FormInput v-model="title" placeholder="Title"/>
      <FormInput v-model="release_year" placeholder="Release year"/>
      <FormInput v-model="genre" placeholder="Genre"/>
    </div>
    <div class="form-group">
      <MultiSelectCombo
          v-model="addActors"
          :options="allActorsName"/>
     <FormInput v-model="rating" placeholder="Rating"/>
      <input type="file" @change="handleFileUpload" accept="image/*" class="image-input">

    </div>
    <textarea v-model="updateDescription" placeholder="Description" class="form-textarea"></textarea>
    <button @click="updateContent" class="form-button">Update content</button>
  </div>

</template>

<script setup>

import FormInput from "@/components/FormInput.vue";
import MultiSelectCombo from "@/components/MultiSelectCombo.vue";
import {onMounted, ref} from "vue";
import {getActorList, getFilmList, postFilm, putFilm} from "@/service/contentApi.js";

let allActorsName = ref([])
// Reactive state
const title = ref("");
const release_year = ref("");
const genre = ref("");
const addActors = ref([]);
const rating = ref("");
const image_path = ref("/interstellar.jpg");
const updateDescription = ref("");

onMounted(async () => {
  const allActor = await getActorList()
  allActor.forEach( actor => allActorsName.value.push(actor.surname))
})
const updateContent = async () => {
  try {
    const filmData = {
      title: title.value,
      actors: addActors.value.slice(),
      release_year: title.value,
      genre: genre.value,
      rating: rating.value,
      description: updateDescription.value,
      image_path: image_path.value,
    };
    const allFilms = await getFilmList();
    const filmFound = allFilms.find(
        (film) => title.value === film.title);
    if (filmFound){
      await putFilm(filmFound._id,filmData);
      alert("Film changed successfully");
    }
    else {
      alert("Film not found")
    }

  } catch (error) {
    alert("Error saving film:");
  }

};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    image_path.value = URL.createObjectURL(file); // Generate a temporary URL
    console.log("Path immagine:", image_path.value);
  }
};
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

.image-input{
  font-family: "Arial", sans-serif;
  min-height: 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  resize: none;

  padding: 10px;
  margin-bottom: 10px;
  color: #444;
  background: #d3d3d3;
  outline: none;
  box-sizing: border-box;
}

</style>