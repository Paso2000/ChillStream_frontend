<template>
  <div class="form-container">
    <h3>Add new content</h3>
    <FormInput v-model="title" placeholder="Title" />
    <FormInput v-model="releaseYear" placeholder="Release year" />
    <FormInput v-model="genre" placeholder="Genre" />
    <FormInput v-model="actors" placeholder="Actors" />
    <FormInput v-model="rating" placeholder="Rating" />
    <FormInput v-model="description" placeholder="Description" />
    <Button @click="saveContent">Save</Button>
  </div>
</template>

<script>
import FormInput from "./FormInput.vue";
import Button from "./Button.vue";

export default {
  components: { FormInput, Button },
  data() {
    return {
      title: "",
      releaseYear: "",
      genre: "",
      actors: "",
      rating: "",
      description: "",
    };
  },
  methods: {
    saveContent() {
      console.log("Saving content:", this.title, this.releaseYear);
    },
  },
};
</script>
