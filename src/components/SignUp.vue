<template>
  <section class="wrapper">
    <h1 class="gp-title">Grupomania</h1>
      <h1>Sign up</h1>
    <form @submit.prevent="signUp" >
      <span class="message">{{ error }}</span>

      <!-- <section class="input-box">
      <label for="firstName">First Name</label>
       <input v-model="form.firstName" type="text" placeholder="Type your first name." />
      </section>
      <section class="input-box">
      <label for="lastName">Last Name</label>
       <input v-model="form.lastName" type="text" placeholder="Type your last name." />
      </section>  -->
    
      <section class="input-box">
      <label for="email">Email</label>
      <input v-model="form.email" type="email" placeholder="Email address:" />
      </section>
      <section class="input-box">
      <label for="password">Password</label>
      <input v-model="form.password" type="password" placeholder="Create new password." />
      </section>
      
      <button type="button" class="btn" v-on:click="signUp">
        Sign Up
      </button>
      <router-link class="register-link" to="/login">Have an account?</router-link>
    </form>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      error: '',
      validMessage: '',
      form: {
        // firstName: '',
        // lastName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async signUp () {
      if (
        // this.form.firstName === '' ||
        // this.form.lastName === '' ||
        this.form.email === '' ||
        this.form.password === '' 
      ) {
        this.error = 'Invalid form'
        return
      }
      this.error = ''
      // handling signup
      const result = await axios.post(
        'http://localhost:3000/api/auth/signup', 
        {
          // firstname: this.form.firstName,
          // lastname: this.form.lastName,
          email: this.form.email,
          password: this.form.password,
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      console.warn(result)
      if (result.status === 201) {
        this.$router.push({ path: '/login' })
      }
    }
  },
  mounted () {
    // seeing if user is logged in
    const userId = localStorage.getItem('userId')
    if (userId) {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss">
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-size: cover;
    background-position: center;
    background-image: url('@/assets/images/img5.png');  
}
router-link .register-link{
    font-size: 14.5px;
    text-align: center;
    margin-top: 20px 0 15px;
    color: #f6f5fa;
    text-decoration: none;
  
}

@media screen and (max-width: 768px) {
  .wrapper {
    margin-top: -60px;
  }
}
</style>
