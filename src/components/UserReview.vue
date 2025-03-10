<template>
  <div class="user-review">
    <!-- Form per aggiungere una recensione -->
    <div class="review-input">
      <FormInput class="review-form" v-model="newReview.text" type="text" placeholder="Write a review..."/>
      <Button @click="addReview" class="custom-button">Submit</Button>
    </div>

    <!-- Lista delle recensioni -->
    <div v-if="reviews.length === 0">No reviews yet.</div>
    <ul class="custom-list">
      <li v-for="review in reviews" :key="review.id" class="review-message">
        <div class="review-name">{{ review.nickname }}</div>
        <div class="review-text">{{ review.text }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref, defineProps, defineEmits} from "vue";
import FormInput from "@/components/FormInput.vue";
import Button from "@/components/Button.vue";
import {postReview, getReviewList} from "@/service/contentApi.js";

// Props ricevute dal componente padre
const props = defineProps({
  filmId: String,
  reviews: Array
});

// Emissione evento per aggiornare le recensioni nel componente padre
const emit = defineEmits(["updateReviews"]);

const newReview = ref({
  film_id: props.filmId,
  nickname: sessionStorage.getItem("nicknameProfile"),
  profile_id: sessionStorage.getItem("profile"),
  text: "",
});

const addReview = async () => {
  try {
    await postReview(newReview.value.film_id, newReview.value);
    newReview.value.text = null;
    const updatedReviews = await getReviewList(newReview.value.film_id);
    emit("updateReviews", updatedReviews);
    alert("Review created");
  } catch (error) {
    alert("Review not created");
  }
};
</script>

<style scoped>
.user-review {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra tutti gli elementi orizzontalmente */
  padding: 20px;
  width: 100%;
}

.review-input {
  display: flex;
  flex-direction: row; /* Mantiene gli elementi in riga */
  justify-content: center; /* Centra gli elementi */
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-bottom: 20px;
}

.review-form {
  flex-grow: 1;
  max-width: 840px;
}

.custom-button {
  margin-top: 0;
  margin-bottom: 10px;
  max-width: 150px;
}

.custom-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra le recensioni */
  padding: 0;
}

.review-message {
  list-style: none;
  background-color: #d3d3d3;
  max-width: 980px;
  width: 100%; /* Assicura che tutte le recensioni abbiano la stessa larghezza */
  padding: 10px;
  border-radius: 10px;
  color: #000;
  margin-bottom: 10px;
}

.review-name {
  font-weight: bold;
  color: #6a0dad;
}

</style>
