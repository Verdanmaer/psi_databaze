import axios from 'axios';

const url = 'api/posts/';

class PostService {
	static getPosts() {
    return new Promise ((resolve,reject) => {
      axios.get(url).then((res) => {
        const data = res.data;
        resolve(
          data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
          }))
        );
      })
      .catch((err)=> {
        reject(err);
      })
    });
	}

  static insertPost(formData) {
    return axios({
      method: 'post',
      url: url,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data'}
    });
  }
  
	static deletePost(id) {
		return axios.delete(`${url}${id}`);
	}
}

export default PostService;