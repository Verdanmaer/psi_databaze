<template>
  <v-container class="px-5 grey lighten-5">
    <Form />

    <v-alert :type="error ? 'error' : 'success'" v-if="message">{{ message }}</v-alert>

    <v-dialog v-model="dialog" max-width="600" overlay-color="grey">
      <v-card v-if="dialog">
        <v-img v-if="selectedDog.file" :src="selectedDog.file.location" contain></v-img>
        <v-divider></v-divider>
        
        <v-card-title>{{ selectedDog.body.name }}</v-card-title>
        <v-card-subtitle>{{ selectedDog.body.breed }}</v-card-subtitle>
        <v-card-subtitle>
          <span v-if="selectedDog.body.status === 'found'">Hledá se majitel</span>
          <span v-if="selectedDog.body.status === 'lost'">Hledá se pes</span>
        </v-card-subtitle>
        <v-card-text>
          <div><b>Místo: </b> {{ selectedDog.body.place }}</div>
          <div v-if="selectedDog.body.sex"><b>Pohlaví: </b>{{ selectedDog.body.sex }}</div>
          <div v-if="selectedDog.body.age">
            <b>Věk: </b>{{ selectedDog.body.age }}
            <span v-if="selectedDog.body.age == 1"> rok </span>
            <span v-else-if="selectedDog.body.age >= 2 && selectedDog.body.age <= 4"> roky </span>
            <span v-else-if="selectedDog.body.age == 0 || selectedDog.body.age >= 5"> let </span>
          </div>
          <div><b>Kontaktní e-mail: </b> {{ selectedDog.body.email }}</div>
          <div v-if="selectedDog.body.info"><b>Dodatečné info: </b> {{ selectedDog.body.info }}</div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-row class="ma-0" v-if="posts.length">
      <v-col class="pa-5"
        v-for="(post) in posts.slice().reverse()"
        v-bind:item="post"
        v-bind:key="post._id"
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
            <div class="mx-2 px-5 py-1 card__status white--text">
              <span class="px-2 py-1 blue" v-if="post.body.status === 'found'">Hledá se majitel</span>
              <span class="px-2 py-1 red" v-if="post.body.status === 'lost'">Hledá se pes</span>
            </div>
            <v-row class="px-5 card__content" :class="post.body.status === 'found' ? 'card__content--blue' : 'card__content--red'">
              <v-col cols="12" class="mx-2 py-1">
                <div class="white--text" v-if="post.body.name"><h2>{{ post.body.name }}</h2></div>
              </v-col>
              <v-col cols="12" class="mx-2 py-0">
                <v-chip class="mr-2" label v-if="post.body.date">{{ formatDate(post.body.date) }}</v-chip>
                <v-chip label v-if="post.body.sex">{{ post.body.place }}</v-chip>
              </v-col>
              <v-col cols="12" class="mx-2">
                <v-chip label v-if="post.body">{{ post.body.breed }}</v-chip>
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
      image: '',
      dialog: false,
      error: false
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
    },
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
    z-index: 1;
    background: -webkit-linear-gradient(top,#000000ca 0,#4242423a 20%,#58585852 55%,#000000e0 100%);
  }
  .card__status {
    position: absolute;
    top: 5%;
    z-index: 1;
  }
  .card__content {
    position: absolute;
    top: 65%;
    z-index: 1;
    &.card__content--red {
      background-color: rgba($color: #D32F2F, $alpha: 0.6);
    }
    &.card__content--blue {
      background-color: rgba($color: #1976D2, $alpha: 0.6);
    }
  }
}
</style>