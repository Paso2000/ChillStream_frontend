<template>
  <div class="content-management">
    <h3>Actors Management</h3>

    <!-- Add new actor -->
    <div class="section">
      <h4>Add new actor</h4>
      <div class="form-group">
        <FormInput v-model="name" placeholder="Name"/>
        <FormInput v-model="surname" placeholder="Surname"/>
        <FormInput v-model="date_of_birth" placeholder="date of birth"/>
      </div>
      <button @click="saveActor" class="form-button">Save actors</button>
    </div>

    <!-- Update actor -->
    <div class="section">
      <h4>Update actor</h4>
      <div class="form-group">
        <FormInput v-model="idActor" placeholder="Id Actor"/>
        <FormInput v-model="name" placeholder="Name"/>
        <FormInput v-model="surname" placeholder="Surname"/>
        <FormInput v-model="date_of_birth" placeholder="date of birth"/>
      </div>
      <button @click="updateActor" class="form-button">Update actor</button>
    </div>

    <!-- Delete actor -->
    <div class="section">
      <h4>Delete actor</h4>
      <FormInput v-model="idActor" placeholder="Id Actor"/>
      <button @click="deleteActor" class="form-button">Delete</button>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/FormInput.vue";
import Button from "@/components/Button.vue";
import {postFilm} from "@/service/contentApi.js";

export default {
  components: {Button, FormInput},
  data() {
    return {
      idActor: "",
      name: "",
      surname: "",
      date_of_birth: ""
    };
  },
  methods: {
    async saveActor() {
      console.log("Save new actor:", this.name);
    },
    updateActor() {
      console.log("Updating actor:", this.idActor);
    },
    deleteActor() {
      console.log("Deleting actor:", this.idActor);
    },
  },
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
