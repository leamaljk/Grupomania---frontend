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
      <!-- Incorporating media display based on type -->
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
const axios = require('axios')
export default {
  data () {
    return {
      id: this.$route.params.id,
      post: {},
      image: false,
      video: false
    }
  },
  beforeCreate () {
    // making sure user is logged in
    const userId = localStorage.getItem('userId')
    if (!userId) {
      this.$router.push({ path: '/login' })
    }
  },
  // grabbing post
  async mounted () {
    const token = JSON.parse(localStorage.getItem('token'))
    const userId = JSON.parse(localStorage.getItem('userId'))
    let response = await axios.get('http://localhost:3000/api/posts/singlepost/' + this.id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response)
    this.post = response.data
    // showing media if any is added
    if (this.post.mediaUrl === null) {
      this.video = false
      this.image = false
    } else if (
      this.post.mediaUrl.includes('jpeg') ||
      this.post.mediaUrl.includes('jpg') ||
      this.post.mediaUrl.includes('webp') ||
      this.post.mediaUrl.includes('gif')
    ) {
      this.video = false
      this.image = true
    } else if (
      this.post.mediaUrl.includes('mp4') ||
      this.post.mediaUrl.includes('oog') ||
      this.post.mediaUrl.includes('webm')
    ) {
      this.video = true
      this.image = false
    }
    console.log(userId)
    // seeing if user read post
    try {
      response = await axios.put(
        'http://localhost:3000/api/posts/' + this.id,
        {
          postUserId: parseInt(localStorage.getItem('userId'))
        },
        {
          headers: {
            'content-type': 'application/json',
            // eslint-disable-next-line
            Authorization: `Bearer ${token}`
          }
        }
      )
    } catch (error) {
      if (error.esponse.status === 304) {
        console.log('User already read')
      } else {
        console.log(error)
      }
    }
    if (response.status === 200) {
      if (!this.post.usersRead.includes(userId)) {
        this.post.usersRead.push(userId)
        console.log(this.post.usersRead)
      } else {
        console.log('User already read')
      }
    }
  }
}
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
  width: 100%;
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
    width: 250px;
  }

  .h2-header img {
    width: 300px;
    height: 200px;
    left: 0;
    bottom: 10px;
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
    align-items: center;
    justify-content: center;
    display: flex;
    width: 410px;
    position: relative;
    left: 100px;
    
  }
.title-container{
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
  align-items: center;
  position: absolute;
  top: 150%;
  left: 50%;
  transform: translate(-50%, -50%);

}

  .single-post-container{
    float: center;
    width: 100%;
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