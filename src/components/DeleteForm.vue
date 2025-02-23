<template>
  <div class="form-container">
    <h3>Delete content</h3>
    <FormInput v-model="id" placeholder="Id film" />
    <Button @click="deleteContent">Delete</Button>
  </div>
</template>
