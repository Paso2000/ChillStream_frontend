<template>
  <!-- Add new content -->
  <div class="section">
    <PopUpNotification :message="alertMessage" :show="showAlert" :type="alertType" @close="closeAlert"/>
    <h4>Add new content</h4>
    <div class="form-group">
      <FormInput v-model="addTitle" placeholder="Title"/>
      <FormInput v-model="addRelease_year" placeholder="Release year"/>
      <FormInput v-model="addGenre" placeholder="Genre"/>
    </div>
    <div class="form-group">
      <FormInput v-model="addRating" placeholder="Rating"/>
      <input type="file" @change="handleFileUpload" accept="image/*" class="image-input">
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
    <textarea v-model="addDescription" placeholder="Description" class="form-textarea"></textarea>
    <button @click="saveContent" class="form-button">Save content</button>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import FormInput from "@/components/FormInput.vue";
import Button from "@/components/Button.vue";
import {getActorList, postFilm} from "@/service/contentApi.js";
import PopUpNotification from "@/components/PupUpNotification.vue";

let allActorsName = ref([])

const addTitle = ref("");
const addRelease_year = ref("");
const addGenre = ref("");
const addActors = ref([]);
const addRating = ref("");
const addDescription = ref("");
const addImage_path = ref("/film-default.jpg");
const dropdownOpen = ref(false);

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
    alertMessage.value = "Film saved successfully";
    alertType.value = "success"
    showAlert.value = true;

  } catch (error) {
    alertMessage.value = "Error saving film:";
    alertType.value = "error"
    showAlert.value = true;
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    addImage_path.value = URL.createObjectURL(file); // Generate a temporary URL
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
