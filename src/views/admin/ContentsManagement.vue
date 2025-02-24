<template>
  <div class="content-management">
    <h3>Contents Management</h3>

    <!-- Add new content -->
    <div class="section">
      <h4>Add new content</h4>
      <div class="form-group">
        <FormInput v-model="title" placeholder="Title" />
        <FormInput v-model="releaseYear" placeholder="Release year" />
        <FormInput v-model="genre" placeholder="Genre" />
      </div>
      <div class="form-group">
        <FormInput v-model="actors" placeholder="Actors" />
        <FormInput v-model="rating" placeholder="Rating" />
      </div>
      <textarea v-model="description" placeholder="Description" class="form-textarea"></textarea>
      <button @click="saveContent" class="form-button">Save content</button>
    </div>

    <!-- Update content -->
    <div class="section">
      <h4>Update content</h4>
      <div class="form-group">
        <FormInput v-model="idFilm" placeholder="Id film" />
        <FormInput v-model="releaseYear" placeholder="Release year" />
        <FormInput v-model="genre" placeholder="Genre" />
      </div>
      <div class="form-group">
        <FormInput v-model="actors" placeholder="Actors" />
        <FormInput v-model="rating" placeholder="Rating" />
      </div>
      <textarea v-model="description" placeholder="Description" class="form-textarea"></textarea>
      <button @click="updateContent" class="form-button">Update content</button>
    </div>

    <!-- Delete content -->
    <div class="section">
      <h4>Delete content</h4>
      <FormInput v-model="idFilm" placeholder="Id film" />
      <button @click="deleteContent" class="form-button">Delete</button>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/FormInput.vue";
import Button from "@/components/Button.vue";

export default {
  components: {Button, FormInput},
  data() {
    return {
      title: "",
      releaseYear: "",
      genre: "",
      actors: "",
      rating: "",
      description: "",
      idFilm: "",
      idFilmToDelete: "",
    };
  },
  methods: {
    saveContent() {
      console.log("Saving content:", this.title);
    },
    updateContent() {
      console.log("Updating content:", this.idFilm);
    },
    deleteContent() {
      console.log("Deleting content:", this.idFilmToDelete);
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

</style>
