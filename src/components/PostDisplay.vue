<template>
  <div class="post-container">
    <div class="post" v-for="(post, index) in posts"
      :key="index" @click="viewPost(post.id)">
    
      <div v-if="!post.usersRead.map(Number).includes(numericUserId)" class="unread-label">
        <span>New</span>
      </div>
      
      <h2 class="post-title">{{ post.title }}</h2>
      <p class="post-message">{{ post.message }}</p>
      
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
    userId: {
      type: String,
      required: true,
    },
  },
  computed: {
    // Convert userId prop to a number for comparison
    numericUserId() {
      return parseInt(this.userId, 10);
    }
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
  border-radius: 5px;
  padding: 5px 15px;
  color: white;
  background: linear-gradient(135deg, #46ed68, #f3f387);
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0px;
  right: 0px;
  transition: transform 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  
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


@media (max-width: 768px) {
  .unread-label {
    padding: 3px 10px;
    font-size: 0.70rem;
    position: relative;
    margin-bottom: 20px;
    width: 60px;
  }

  .post {
    margin: 10px auto;
    margin-right: 20px;
    max-width: calc(100% - 40px);
    float: none;
  }

  .post-title {
    font-size: 1.8em;
    margin-bottom: 20px;
  }

  h2.post-title:after {
    width: 40px;
    height: 2px;
  }

  p.post-message3 {
    font-size: 1em;
  }
}
</style>