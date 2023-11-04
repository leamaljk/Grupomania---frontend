<template>
    <div id="profile">
      <div id="profileImg">
        <img :src="profileLogo" alt="Your Photo" />
      </div>
      <div class="name">
          <h2>Once you delete your Grupomania account, it can't be restored. You'll lose access to past posts. 
            <br ><br > Before you click to Log Out remember your Log In info. You will need to enter your e-mail and password to get back in.
          </h2>
        </div>
  
      <div id="accountBtns">
        <button @click="deleteAccount" type="button" class="deleteBtn">Remove Account</button>
  
        <button @click="logout" type="button" class="deleteBtn">Log Out</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    beforeCreate () {
      // making sure user is logged in
      const userId = localStorage.getItem('userId')
      if (!userId) {
        this.$router.push({ path: '/login' })
      }
    },
    data() {
    return {
        profileLogo: 'https://static.vecteezy.com/system/resources/thumbnails/020/310/248/small_2x/business-team-ready-to-work-office-employee-in-tidy-clothes-illustration-characters-in-flat-design-group-of-office-workers-in-flat-cartoon-style-free-vector.jpg',
    };
  },
    methods: {
      // handling deletion of account
      deleteAccount () {
        const token = JSON.parse(localStorage.getItem('token'))
        const userId = JSON.parse(localStorage.getItem('userId'))
        axios
          .delete(`http://localhost:3000/api/auth/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          .then(() => {
            localStorage.clear()
            this.$router.push({ path: '/login' })
            console.log('Account deleted')
          })
      },
      // handling logout
      async logout () {
        localStorage.clear()
        this.$router.push({path: '/login' })
      }
    }
  }
  </script>
  

  <style lang="scss">
#profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
}
#profile img:hover {
  transform: scale(1.1);
}
#profileImg {
  width: 200px;
  height: 200px;
  border: 5px solid white;;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

#flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  .name {
    display: flex;
    align-items: center;
    margin: 10px;
    h2 {
      font-size: 1.5rem;
      margin-right: 10px;
      color: #333;
    }
  }
}

#accountBtns {
  display: flex;
  margin-top: 20px;
  button {
    background-color: #0e1447;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 20px;
    font-size: 1rem;
    font-weight: bold;
  }

  button:hover {
    background-color: #8e778c;
  }
}

.name{
  background-color: white; 
  padding: 10px;
  border-top: 2px solid #ccc;
  border-radius: 4px;
  margin-top: 20px;
  max-width: 700px;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  
}

@media screen and (max-width: 768px) {
  #profile {
    margin: 20px;
  }
  #flex {
    margin-top: 10px;
  }
  #profileImg {
    width: 150px;
    height: 150px;
    border-width: 3px;
  }
}
</style>
