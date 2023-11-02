<template>
  <div id="title">
    <h1>Unveiling the Layers: Welcome to</h1>
    <img class="h2-header" src="../assets/images/logos/icon-left-font-monochrome-black.png" alt="Logo">
    <h3>Diving deeper into the nuanced perspectives and intricacies of today's trending discussions.</h3>    
  </div>
  <div class="single-post-container">
    <div class="post-header">
      <h2 class="post-title-singlepage">{{ post.title }}</h2>
    </div>
    <div class="post-content">
      <p class="post-message-singlepage">{{ post.message }}</p>
      <!-- Incorporate media display based on type -->
      <div v-if="video" class="post-media">
        <video width="300" height="500" :src="post.mediaUrl" controls>
          <source :src="post.mediaUrl" type="video/*" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div v-else-if="image" class="post-media">
        <img width="300" height="500" :src="post.mediaUrl" alt="Post Image" />
      </div>
    </div>
    <div class="post-footer">
      <p class="post-date">Published on: {{ new Date(post.createdAt).toLocaleDateString() }}</p>
      <p class="post-author">Author: {{ post.userId }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      post: {},
      image: false,
      video: false
    };
  },
  beforeCreate() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.$router.push({ path: '/login' });
    }
  },
  async mounted() {
    const postId = this.$route.params.id;
    const token = JSON.parse(localStorage.getItem('token'));
    const userId = JSON.parse(localStorage.getItem('userId'));
    
    try {
      let response = await axios.get(`http://localhost:3000/api/posts/singlepost/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      this.post = response.data;

      if (this.post.mediaUrl) {
        if (
          this.post.mediaUrl.includes('jpeg') ||
          this.post.mediaUrl.includes('jpg') ||
          this.post.mediaUrl.includes('webp') ||
          this.post.mediaUrl.includes('gif')
        ) {
          this.image = true;
        } else if (
          this.post.mediaUrl.includes('mp4') ||
          this.post.mediaUrl.includes('oog') ||
          this.post.mediaUrl.includes('webm')
        ) {
          this.video = true;
        }
      }

      await axios.post(`http://localhost:3000/api/posts/${postId}`, { postUserId: userId }, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Resource not found.');
        // Handle the 404 error, maybe redirect the user or show an error message.
      } else {
        console.error('There was an error:', error.message);
      }
    }
  }
};
</script>


<style scoped>

img.h2-header{
  margin: 0;
  width: 550px;
  height: 400px;
  padding: 0;
  position: relative;
  left: 240px;
  bottom: 90px;
  opacity: 86%;
}
#title h1{
  position: relative;
  left: 160px;
  top: 40px;
}
#title h3{
  position: relative;
  right: 400px;
}
#title{
  position: relative;
  left: 260px;
  top: 20px;
  background-color: rgba(234, 228, 223, 0.928);
  border: 2px solid #e0e0e0;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
  color: #1d1b31;
  opacity: 96%;
  display: flex;
  height: 180px;
}

img{
  width: 100%;
  height: 100%;
  object-fit: contain; 
}
 .post-media {
  width: 700px;
  height: 400px;
  overflow: hidden; 
  border-radius: 10px;

}
.post-media img:hover{
  transform: scale(1.2);
}
.single-post-container {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 20px;
  width: 60%;
  position: relative;
  left: 100px;
  margin: 50px auto;
  font-family: 'Poppins', sans-serif;
}

.post-header, .post-footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
}



.post-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
}



.post-footer {
  border-top: 2px solid #1d1b31;
  font-size: 16px;
  color: #555;
  margin-top: 20px;
}

.post-date, .post-author {
  padding: 5px;
  border-radius: 5px;
  margin: 5px;
}

.post-title-singlepage{
  font-family: 'Arial', sans-serif;
  font-size: 2.4em;
  color: #333;
  margin-bottom: 40px;
  position: relative;
  width: 860px ;
  text-align: center;
}
.post-title-singlepage:after {
    content: '';
    width: 60px;
    height: 4px;
    background-color:#1e76b9de;
    position: absolute;
    bottom: -10px;
    left: 0;
}
.post-message-singlepage{
  color:#1d1b31;
  background: white;  
  border: 3px solid #1d1b31;
  width: 760px; 
  height: auto; 
  float: left;
  overflow:auto;
  margin-right: 5px;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  font-family: 'Georgia', serif;
  font-size: 1.2em;
  margin-right: 20px;
}
</style>