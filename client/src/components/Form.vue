<template>
  <div class="text-center ma-3">
    <v-row>
      <v-col cols="12" sm="6" class="my-3 px-5">
        <FormFoundDog />
      </v-col>
      <v-col cols="12" sm="6" class="my-3 px-5">
        <FormLostDog />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FormFoundDog from './FormFound.vue';
import FormLostDog from './FormLost.vue';
import EventBus from '../eventbus';
import PostService from '../PostService';

export default {
  components: {
    FormFoundDog,
    FormLostDog
  },
  created() {
    // Emit from FormFound.vue/FormLost.vue
    EventBus.$on('sendFormData', async (formData) => {
      try {
        await PostService.insertPost(
          formData
        );
        this.posts = await PostService.getPosts();
        // Send success message to PostComponent.vue and display it
        this.message = "Úspěšně nahráno";
        EventBus.$emit('sendMessage', {
          message: this.message,
          error: false
        });
      } catch(err) {
        // Send error message to PostComponent.vue and display it
        this.message = err.response.data.error;
        EventBus.$emit('sendMessage', {
          message: this.message,
          error: true
        });
      }
    })
  }
}
</script>