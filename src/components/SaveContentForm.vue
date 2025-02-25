<template>
  <div class="content-management">
    <h3>Contents Management</h3>

    <!-- Add new content -->
    <div class="section">
      <h4>Add new content</h4>
      <div class="form-group">
        <FormInput v-model="addTitle" placeholder="Title"/>
        <FormInput v-model="addRelease_year" placeholder="Release year"/>
        <FormInput v-model="addGenre" placeholder="Genre"/>
      </div>
      <div class="form-group">
        <MultiSelectCombo
            v-model="addActors"
            :options="allActorsName"/>
        <FormInput v-model="addRating" placeholder="Rating"/>
        <input type="file" @change="handleFileUpload" accept="image/*" class="image-input">
      </div>
      <textarea v-model="addDescription" placeholder="Description" class="form-textarea"></textarea>
      <button @click="saveContent" class="form-button">Save content</button>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import FormInput from "@/components/FormInput.vue";
import Button from "@/components/Button.vue";
import {getActorList, postFilm} from "@/service/contentApi.js";
import MultiSelectCombo from "@/components/MultiSelectCombo.vue";

let allActorsName = ref([])
// Reactive state
const IdFilm = ref("");
const addTitle = ref("");
const addRelease_year = ref("");
const addGenre = ref("");
const addActors = ref([]);
const addRating = ref("");
const addDescription = ref("");
const addImage_path = ref("/interstellar.jpg");

onMounted(async () => {
  const allActor = await getActorList()
  allActor.forEach( actor => allActorsName.value.push(actor.surname))
})
// Methods
const saveContent = async () => {
  try {
    const filmData = {
      title: addTitle.value,
      actors: addActors.value.slice(),
      release_year: addRelease_year.value,
      genre: addGenre.value,
      rating: addRating.value,
      description: addDescription.value,
      image_path: addImage_path.value,
    };

    await postFilm(filmData);
    alert("Film saved successfully");
  } catch (error) {
    alert("Error saving film:");
  }
};



const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    addImage_path.value = URL.createObjectURL(file); // Generate a temporary URL
    console.log("Path immagine:", addImage_path.value);
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
