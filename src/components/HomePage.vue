<template>
    <div>
    <my-header title="Main Title" subTitle="Subtitle" />
  </div>
  <div>
    <post-display :posts="posts" />
  </div>
</template>

<script>
import PostDisplay from '../components/PostDisplay.vue'; // Adjust the path as needed
import MyHeader from '@/components/MyHeader.vue'; 

export default {
  data() {
    return {
      posts: [],
    };
  },
  components: {
    'post-display': PostDisplay,
    'my-header': MyHeader
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      const apiEndpoint = 'http://localhost:3000/api/posts';
      fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
          this.posts = data; 
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
        });
    },
  },
};
</script>
