<template>
  <div class="container dark-red-bg">
    <h1 class="text-beige">Create a Post</h1>
    
    <div v-if="url" class="image-preview">
      <img :src="url" alt="Uploaded media preview" />
    </div>

    <!-- form container  -->
    <form @submit.prevent="createPost" class="form-container">
      <!-- post title -->
      <input v-model="title" type="text" placeholder="Title" class="input-field">
      <!-- post message -->
      <textarea v-model="message" placeholder="Message" class="textarea-field"></textarea>
      <!-- image upload -->
      <input type="file" ref="file" @change="onFileSelected" class="file-input" accept="image/* video/* audio/*">
      <!-- submit button -->
      <button type="submit" class="submit-button">Submit</button>
    </form>
    <div id="response" class="response-message text-beige">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  beforeCreate() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.$router.push({ path: '/login' });
    }
  },
  data() {
    return {
      url: '',
      error: '',
      title: '',
      message: '',
      file: null,
      userId: localStorage.getItem('userId')
    };
  },
  methods: {
    async createPost() {
      if (this.title === '' && this.message === '') {
        this.error = 'Title and Message Required';
        return;
      } else if (this.title === '') {
        this.error = 'Title Required';
        return;
      } else if (this.message === '') {
        this.error = 'Message Required';
        return;
      }

      const formData = new FormData();
      formData.append('userId', this.userId);
      formData.append('title', this.title);
      formData.append('message', this.message);
      
      if (this.file) {
        formData.append('mediaUrl', this.file);
      }

      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.post('http://localhost:3000/api/posts', formData, config);
        
        if (response.status === 201) {
          console.log(response.data);
          this.$router.push({ path: '/' });
        }
      } catch (error) {
        this.error = error.message;
        console.error('There was an error!', error);
      }
    },
    onFileSelected(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
  text-align: center;
  border-radius: 15px;
  position: relative;
  left: 120px;
  font-family: poppins-reg;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, .2);
  backdrop-filter: blur(6px);
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  
  &.dark-red-bg {
    background-color: transparent;
    color: #f2e6df;
  }
}

.form-container {
  background-color: transparent;
  border: 1px solid #401616;
  padding: 20px;
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, .2);
  backdrop-filter: blur(6px);
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #9b7b6f;
  border-radius: 4px;
  background-color: #f2e6df;
  opacity: 80%;
  color: gray;
  font-family: poppins-reg;
  font-size: 16px;
  overflow: auto;
}

.file-input {
  width: 100%;
  margin: 10px 0;
  font-family: poppins-reg;
  font-size: 16px;
}

.submit-button {
  background-color: rgb(142, 119, 148);
  color: #f2e6df;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: poppins-reg;
  font-size: 16px;
  
  &:hover {
    background-color: #f9a2b4;
  }
}

.response-message {
  margin-top: 10px;
}

.image-preview {
  margin: 20px auto;
  width: 200px;
  height: 200px;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
