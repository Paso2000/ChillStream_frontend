<template>
  <div class="form-container">
    <h3>Update content</h3>
    <FormInput v-model="id" placeholder="Id film" />
    <FormInput v-model="releaseYear" placeholder="Release year" />
    <FormInput v-model="genre" placeholder="Genre" />
    <FormInput v-model="actors" placeholder="Actors" />
    <FormInput v-model="rating" placeholder="Rating" />
    <FormInput v-model="description" placeholder="Description" />
    <Button @click="updateContent">Save</Button>
  </div>
</template>
