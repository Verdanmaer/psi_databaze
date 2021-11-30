<template>
  <v-app>
    <v-main class="grey lighten-1">
      <PostComponent />
    </v-main>
  </v-app>
</template>

<script>
import PostComponent from './components/PostComponent.vue';

export default {
  name: 'App',

  components: {
    PostComponent
  },
  data: () => ({
    PostComponent
  }),
};
</script>
