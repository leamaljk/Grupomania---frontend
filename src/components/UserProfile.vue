<template>
  <div class="user-profile">
    <div class="user-avatar">
      <img :src="user.mediaUrl" alt="User Avatar" @click="uploadProfilePhoto" />
      <input type="file" ref="profilePhotoInput" style="display: none" 
      @change="handleProfilePhotoChange" accept="image/*" />
    </div>
    <div class="user-details">
      <h2>Edit Your Profile</h2>
      <div class="form-group">
        <label for="userTitle">Name:</label>
        <input v-model="user.title" id="userTitle" />
      </div>
      <div class="form-group">
        <label for="userMessage">About Me:</label>
        <input v-model="user.message" id="userMessage" />
      </div>
      <button @click="saveChanges">Save Changes</button>
    </div>
  </div>

  <div class="user-updated-details" v-if="userUpdated">
    <h3 class="updated-msg0">User Details Updated:</h3>
    <p class="updated-msg1"><strong>Name:</strong> {{ user.title }}</p>
    <p class="updated-msg2"><strong>About Me:</strong> {{ user.message }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
    userUpdated() {
      return this.$store.state.user.title !== "Change your user Name.";
    },
  },
  methods: {
    uploadProfilePhoto() {
      this.$refs.profilePhotoInput.click();
    },
    handleProfilePhotoChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.user.mediaUrl = URL.createObjectURL(file);
      }
    },
    saveChanges() {
      this.$store.commit('updateUser', this.user);
    },
  },
};
</script>
<style scoped>
.user-profile {
  font-family: poppins-reg;
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  position: relative;
  left: 100px;
}

.user-avatar img {
  max-width: 350px;
  max-height: 250px;
  cursor: pointer;
  border-radius: 50%;
  transition: transform 0.6s;
  margin: 20px;
}

.user-avatar img:hover {
  transform: scale(1.1);
}

.user-details {
  flex: 1;
}

.form-group {
  margin: 10px 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-family: poppins-reg;
}

input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f2e6df;
  opacity: 90%;
  color: gray;
  font-family: poppins-reg;
  font-size: 16px;
  
}

button {
  background-color:rgb(142, 119, 148);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 30px;
  margin-left: 150px;
  position: relative;
  left: 25px;
}

button:hover {
  background-color: #fbb8c6;
}

.user-updated-details {
  background-color: #f2e6df;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin-top: 20px;
  max-width: 900px;
  position: relative;
  left: 100px;
}

.user-updated-details h3 {
  color: #333;
  font-family: poppins-reg;
}

.user-updated-details strong {
  font-weight: bold;
}

p.updated-msg1 {
  margin-top: 20px;
  padding: 10px;
  text-align: center;
}
p.updated-msg2{
  margin-top: 20px;
  padding: 10px;
  text-align: center;
  overflow: auto;
}

</style>
