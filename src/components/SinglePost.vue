<template>
  <div class="title-container">
  <div id="title">
    <!-- h1 title  div -->
    <div class="h1-title">Unveiling the Layers: Welcome to</div>
    <!-- image div -->
    <div class="h2-header">
    <img  src="../assets/images/logos/icon-left-font-monochrome-black.png" alt="Logo">
    </div>
    <!-- h3 title div -->
    <div class="h3-title">
    <h3>Diving deeper into the nuanced perspectives and intricacies of today's trending discussions.</h3>
    </div>
    <!-- end of id title # -->
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      post: {},
      image: false,
      video: false,
      hasBeenRead: false // This will keep track if the user has read the post
    };
  },
  beforeCreate() {
    // Redirect to login if no user ID is present in localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.$router.push({ path: '/login' });
    }
  },
  async mounted() {
  const postId = this.$route.params.id;
  const token = localStorage.getItem('token'); // Assume token is stored as a string
  // Parse userId as a number
  const userId = Number(localStorage.getItem('userId')); // Convert to number for comparison

  try {
    // Get post details
    let response = await axios.get(`http://localhost:3000/api/posts/singlepost/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    this.post = response.data;

    // Check if the post has been read by converting each userId in the usersRead array to a number
    this.hasBeenRead = this.post.usersRead && this.post.usersRead.map(Number).includes(userId);

    // Check if the mediaUrl is an image
    this.image = /\.(jpg|jpeg|png|gif|webp)$/i.test(this.post.mediaUrl);

    // Check if the mediaUrl is a video
    this.video = /\.(mp4|webm|ogg)$/i.test(this.post.mediaUrl);

    // If the post has not been read, mark it as read
    if (!this.hasBeenRead) {
      // Mark the post as read by sending the numeric userId
      await axios.put(`http://localhost:3000/api/posts/${postId}`, { postUserId: userId }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      // Update local state
      this.hasBeenRead = true;
    }
  } catch (error) {
    console.error('There was an error:', error.message);
    // Additional error handling logic as needed
  }
}
};
</script>

<style scoped>
/* welcome to title */
.h1-title{
  position: relative;
  left: 400px;
  font-size: 26px;
}
/* logo */
.h2-header img{
  margin: 0;
  width: 550px;
  height: 400px;
  padding: 0;
  position: relative;
  left: 370px;
  bottom: 100px;
  opacity: 86%;
}
/* dive deeper title */
.h3-title{
  position: relative;
  right: 100px;
  width: 100%;
}

#title{
  position: relative;
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
  display: fle;
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
@media (max-width: 768px) {
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .h1-title {
    position: relative;
    left: 20px;
    font-size: 20px;
    text-align: center;
  }

  .h2-header img {
    width: 300px;
    height: 200px;
    left: 0;
    bottom: 50px;
    margin: 0 auto;
  }

  .h3-title {
    right: 0;
    text-align: center;
    width: 350px
  }

  #title {
    flex-direction: column;
    height: auto;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  .post-content {
    flex-direction: column; /* Set direction to column for smaller screens */
    align-items: center; /* Center align the content */
  }

  .post-media {
    max-width: 100%;
    font-size: 14px;
    margin-bottom: 20px; /* Add some space between the image and the message */
  }

  .post-message-singlepage {
    width: 100%; /* Set the message to take the full width */
    text-align: left; /* Align text to the left */
  }
}
</style>