<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <div class="create-post">
      <label for="race"></label>
      <input type="text" id="race" v-model="posts.race" placeholder="Rasa">

      <br>

      <label for="male">Pes</label>
      <input type="radio" name="sex" value="Pes" id="male" v-model="posts.sex">
      <label for="female">Fena</label>
      <input type="radio" name="sex" value="Fena" id="female" v-model="posts.sex">

      <br>

      <label for="age"></label>
      <input type="number" id="age" v-model="posts.age" placeholder="Věk">
      <button v-on:click="createPost">Post!</button>
    </div>
    <hr>
    <div class="error" v-if="error">{{ error }}</div>
    <div class="posts-container">
      <div class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
      >
        <!-- {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth() + 1}/${post.createdAt.getFullYear()}` }}-->
        <p><b>Rasa:</b> {{ post.race }}</p>
        <p><b>Pohlaví:</b>{{ post.sex }}</p>
        <p><b>Věk:</b>{{ post.age }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: {
        race: '',
        sex: '',
        age: '',
      },
      error: '',
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.posts.race, this.posts.sex, this.posts.age);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at{
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15 px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
