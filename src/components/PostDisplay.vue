<template>
  <div class="post-container">
    <div 
      class="post" 
      v-for="(post, index) in posts" 
      :key="index" 
      @click="viewPost(post.id)"
    >      
      <div v-if="post.unread" class="unread-label">
        <span>Unread</span>
      </div>
      
      <h2 class="post-title">{{ post.title }}</h2>
      <p class="post-message3 ">{{ post.message }}</p>
      
        <img 
          v-if="post.image" 
          class="post-mediaUrl" 
          :src="post.mediaUrl" 
          alt="Post Image" 
        />
      
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    viewPost(id) {
      this.$router.push(`/singlepost/${id}`);
    }
  }
};
</script>
<style scoped>

.unread-label {
  border: 2px solid black;
  border-radius: 8px;
  padding: 10px;
  color: white;
  background-color: red;
  height: 15px;
  width: 50px;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 10px;
  text-align: center;
}


.post {
  background-color: #ffffff;
    border: 1px solid #e0e0e0;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 900px;
    margin: 20px auto;
    float: right;
    margin-right: 60px;
}


.post-title {
  font-family: 'Arial', sans-serif;
    font-size: 2.4em;
    color: #333;
    margin-bottom: 40px;
    position: relative;
}
h2.post-title:after {
    content: '';
    width: 60px;
    height: 3px;
    background-color: #1e76b9de;
    position: absolute;
    bottom: -10px;
    left: 0;
}



/* Optional: Add hover effect for an interactive feel */
.post:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    border-top: 2px solid #1d1b31;
    border-bottom: 3px solid #1d1b31;

}
p.post-message3 {
  font-family: 'Georgia', serif;
    font-size: 1.2em;
    color: #666;
    line-height: 1.6;
  
}



</style>
