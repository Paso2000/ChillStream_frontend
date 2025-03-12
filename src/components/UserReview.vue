<template>
  <div class="user-review">
    <PopUpNotification :message="alertMessage" :show="showAlert" :type="alertType" @close="closeAlert"/>
    <div class="review-input">
      <FormInput class="review-form" v-model="newReview.text" type="text" placeholder="Write a review..."/>
      <Button @click="addReview" class="custom-button">Submit</Button>
    </div>

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
import PopUpNotification from "@/components/PupUpNotification.vue";
import {useRouter} from "vue-router";

// Props ricevute dal componente padre
const props = defineProps({
  filmId: String,
  reviews: Array
});

const router = useRouter();
const showAlert = ref(false);
const alertMessage = ref("");
const alertType = ref('error');

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
    alertMessage.value = "Review created";
    alertType.value = "success"
    showAlert.value = true;
  } catch (error) {
    alertMessage.value = "Review not created";
    alertType.value = "error"
    showAlert.value = true;
  }
};

const closeAlert = () => {
  showAlert.value = false;
};

</script>

<style scoped>
.user-review {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.review-input {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-bottom: 20px;
}

.review-form {
  flex-grow: 1;
  max-width: 500px; /* mobile limit */
}

.custom-button {
  margin-top: 0;
  margin-bottom: 10px;
  max-width: 120px;
}

.custom-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}

.review-message {
  list-style: none;
  background-color: #d3d3d3;
  width: 90%;           /* Mobile First: Larghezza limitata per centrare */
  max-width: 500px;     /* Mobile First: Limite massimo per mobile */
  padding: 10px;
  border-radius: 10px;
  color: #000;
  margin-bottom: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.review-name {
  font-weight: bold;
  color: #6a0dad;
}

@media (min-width: 768px) {
  .review-form {
    max-width: 840px;
  }

  .review-message {
    width: 100%;
    max-width: 980px;
  }

  .custom-button {
    max-width: 150px;
  }
}


</style>
