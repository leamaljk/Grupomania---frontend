<template>

  
  <section id="profile">
    <UserProfile />
    <div id="accountBtns">
      <button
        v-on:click="deleteAccount"
        type="button"
        
      >
        Delete Profile
      </button>
      <div class="form-group">
    <input
      type="file"
      accept="image/*"
      ref="imageInput"
      style="display: none"
      @change="onFileAdded"
    />
    <button @click="openFileInput" class="mat-raised-button primary">ADD IMAGE</button>
    <img :src="imagePreview" v-if="imagePreview" style="max-height: 100px; display: block; margin-top: 10px" />
  </div>
      <button v-on:click="logout" type="button" >
        Log Out
      </button>
      
    </div>
  </section>
</template>

<script>
import UserProfile from '../components/UserProfile.vue'; // Adjust the path as needed


import axios from 'axios'
export default {
  components: { UserProfile },
  beforeCreate () {
    // making sure user is logged in
    const userId = localStorage.getItem('userId')
    if (!userId) {
      this.$router.push({ path: '/login' })
    }
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      // jobTitle: ''
      selectedFile: null,
      imagePreview: null,
    }
  },
  async created () {
    const token = JSON.parse(localStorage.getItem('token'))
    const userId = JSON.parse(localStorage.getItem('userId'))
    // grabbing user information
    const load = await axios.get('http://localhost:3000/users/' + userId, {
      headers: {
        // eslint-disable-next-line
        Authorization: `Bearer ${token}`,
      }
    })
    this.firstName = load.data.user.firstname
    this.lastName = load.data.user.lastname
    // this.jobTitle = load.data.user.position
  },
  methods: {
    openFileInput() {
      // Trigger the file input click event
      this.$refs.imageInput.click();
    },
    onFileAdded(event) {
      // Handle the file input change event
      const file = event.target.files[0];
      if (file) {
        // Assuming you want to display a preview of the selected image
        this.imagePreview = URL.createObjectURL(file);
      }
    },

    // handling deletion of account
    deleteAccount () {
      const token = JSON.parse(localStorage.getItem('token'))
      const userId = JSON.parse(localStorage.getItem('userId'))
      axios
        .delete(`http://localhost:3000/users/${userId}`, {
          headers: {
            // eslint-disable-next-line
            Authorization: `Bearer ${token}`,
          }
        })
        .then(() => {
          localStorage.clear()
          this.$router.push({ name: 'login' })
          console.log('Account deleted')
        })
    },
    // handling logout
    async logout () {
      localStorage.clear()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>


<style lang="scss">
#profile {
  margin: 70px;
  position: relative;
  left: 100px;

  &Img {
    border-style: solid;
    width: 200px;
    height: 200px;

    img {
      width: 200px;
    }
  }

  #flex {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 200px;
    position: absolute;
    top: 200px;
    left: 350px;

    .name {
      display: flex;

      h2 {
        margin-right: 10px;
      }
    }
  }

  #none {
    display: none;
  }

  #posts {
    width: 65%;
  }

  #postImgs {
    display: flex;
    flex-wrap: wrap;
  }

  .box {
    border-style: solid;
    height: 210px;
    width: 210px;
    margin: 30px;
  }

  .fixed {
    margin-top: 30px;
  }

  #accountBtns {
    display: flex;
    margin-top: 20px;
  }

  button {
    background-color: #fbb8c6;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 30px;

    &:hover {
      background-color: rgb(142, 119, 148);
    }
  }

  @media screen and (max-width: 768px) {
    margin: -10px 20px 20px 20px;

    #flex {
      left: 200px;
      top: 300px;
    }

    &Img {
      width: 150px;
      height: 150px;
      z-index: 1;

      img {
        width: 150px;
      }
    }
  }
}
</style>

