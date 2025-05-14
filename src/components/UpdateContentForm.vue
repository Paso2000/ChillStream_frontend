<template>
  <div class="section">
    <PopUpNotification :message="alertMessage" :show="showAlert" :type="alertType" @close="closeAlert"/>
    <h4>Update content</h4>
    <div class="form-group">
      <FormInput v-model="title" placeholder="Title"/>
      <FormInput v-model="release_year" placeholder="Release year"/>
      <FormInput v-model="genre" placeholder="Genre"/>
    </div>
    <div class="form-group">
      <FormInput v-model="rating" placeholder="Rating"/>
      <input type="file" @change="handleFileUpload" accept="image/*" class="image-input">
      <FormInput v-model="addTrailer" placeholder="Trailer"/>
      <div class="dropdown">
        <button class="dropdown-toggle" @click="toggleDropdown">
          Select actors ⬇
        </button>
        <div v-if="dropdownOpen" class="dropdown-menu">
          <label v-for="actor in allActorsName" :key="actor" class="dropdown-item">
            <input type="checkbox" v-model="addActors" :value="actor"/>
            {{ actor }}
          </label>
        </div>
      </div>
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
import Button from "@/components/Button.vue";
import PopUpNotification from "@/components/PupUpNotification.vue";

let allActorsName = ref([])
// Reactive state
const title = ref("");
const release_year = ref("");
const genre = ref("");
const addActors = ref([]);
const rating = ref("");
const image_path = ref("/interstellar.jpg");
const updateDescription = ref("");
const dropdownOpen = ref(false);
const addTrailer = ref("");
const showAlert = ref(false);
const alertMessage = ref("");
const alertType = ref('error');

onMounted(async () => {
  const allActor = await getActorList()
  allActor.forEach(actor => allActorsName.value.push(actor.surname))
})
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
const updateContent = async () => {
  try {
    const filmData = {
      title: title.value,
      actors: addActors.value.slice(),
      release_year: release_year.value,
      genre: genre.value,
      rating: rating.value,
      description: updateDescription.value,
      image_path: image_path.value,
      trailer_path: addTrailer.value
    };
    const allFilms = await getFilmList();
    const filmFound = allFilms.find(
        (film) => title.value === film.title);
    if (filmFound) {
      await putFilm(filmFound._id, filmData);
      alertMessage.value = "Film changed successfully";
      alertType.value = "success"
      showAlert.value = true;
    } else {
      alertMessage.value = "Film not found";
      alertType.value = "error"
      showAlert.value = true;
    }

  } catch (error) {
    alertMessage.value = "Error saving film:";
    alertType.value = "success"
    showAlert.value = true;
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    image_path.value = URL.createObjectURL(file); // Generate a temporary URL
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

.form-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.dropdown {
  position: relative;
  width: 100%;
}

.dropdown-toggle {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background: #d3d3d3;
  border: none;
  border-radius: 5px;
  outline: none;
  color: black;
  text-align: left;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-height: 150px;
  overflow-y: auto;
  z-index: 100;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  color: black;
}

.dropdown-item:hover {
  background: #f0f0f0;
}

.dropdown-item input[type="checkbox"] {
  margin-right: 10px;
}

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

.image-input {
  font-family: "Arial", sans-serif;
  min-height: 20px;
  width: 200px;
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