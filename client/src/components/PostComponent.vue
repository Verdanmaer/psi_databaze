<template>
  <v-container class="px-5">
    <h1 class="my-5" >Psí databáze</h1>
    <Form />
    <hr>

    <div :class="error ? 'error' : 'success'" v-if="message">{{ message }}</div>

    <!-- <v-dialog v-model="dialog" max-width="600" overlay-color="grey">
      <v-card v-if="dialog">
        <h1>{{ selectedDog.body.name }}</h1>
        <h1>{{ selectedDog.body.age }}</h1>
        <h1>{{ selectedDog.body.breed }}</h1>
        <h1>{{ selectedDog.body.info }}</h1>
      </v-card>
    </v-dialog> -->
    <v-row class="ma-0" v-if="posts.length">
      <v-col class="pa-5 grey lighten-5"
        v-for="(post) in posts.slice().reverse()"
        v-bind:item="post"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
        :cols="12"
        :sm="6"
        :lg="3"
      >
        <v-card class="card" @click="updateSelected(post)">
          <span class="card--overlay"></span>
          <v-col class="pa-0">
            <v-img :src="`https://psidatabaze.s3.eu-central-1.amazonaws.com/${post.file.key}`" 
              class="rounded align-end card__img"
              height="450px"
              v-if="post.file">
            </v-img>
            <v-row class="px-5 card__content">
              <!-- <v-col cols="12" class="py-3 white--text">
                <h1>{{ post.body.name }}</h1>
              </v-col> -->
              <v-col cols="12" class="py-0">
                <v-chip label class="mx-2" v-if="post.body">{{ post.body.place }}</v-chip>
                <v-chip label class="mx-2" v-if="post.body">{{ formatDate(post.body.date) }}</v-chip>
                <v-chip label class="mx-2" v-if="post.body">{{ post.body.sex }}</v-chip>
              </v-col>
              <v-col cols="12" class="mx-2">
                <v-chip label v-if="post.body">{{ post.body.breed }}</v-chip>
                <v-chip label v-if="post.file">{{ post.body.status }}</v-chip>
              </v-col>
            </v-row>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostService from '../PostService';
import Form from './Form';
import EventBus from '../eventbus';

export default {
  components: { Form },
  data() {
    return {
      posts: {
        body: '',
        file: ''
      },
      message: '',
      selectedDog: {},
      dialog: false,
      error: true
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch(err) {
      this.message = err.message;
    }
    // Receive success/error message from Form.vue
    EventBus.$on('sendMessage', (payload) => {
      this.message = payload.message;
      this.error = payload.error
    });
  },
  methods: {
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    updateSelected(post) {
      this.selectedDog = post;
      this.dialog = true;
    },
    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${day}. ${month}. ${year}`;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
div.container {
  max-width: 1300px;
  height: 100%;
  margin: 0 auto;
}

.card {
  overflow: hidden;
  &:hover .card__img{
    cursor: pointer;
    transition: 0.2s all ease-out;
    transform: scale(1.05);
    filter: brightness(120%);
  }
  .card--overlay {
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,.6);
    z-index: 1;
    background: -webkit-linear-gradient(top,#000000ca 0,#4242423a 20%,#58585852 55%,#000000e0 100%);
  }
  .card__content {
  position: absolute;
  top: 65%;
  z-index: 1;
  }
}

</style>
