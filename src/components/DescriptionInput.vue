<template>
  <div>
    <input v-model="localDescription" class="input" @input="updateDescription" placeholder="Description" >
  </div>
</template>

<script>
export default {
  props: {
    description: String // Riceve il valore iniziale della descrizione dal padre
  },
  data() {
    return {
      localDescription: this.description || ""
    };
  },
  watch: {
    description(newVal) {
      this.localDescription = newVal;
    }
  },
  methods: {
    updateDescription() {
      this.$emit("update:description", this.localDescription);
    }
  }
};
</script>

<style scoped>

.input{
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
</style>