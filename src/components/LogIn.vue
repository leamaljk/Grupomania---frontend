<template>
  <main>
    <section class="wrapper">
      <h1 class="gp-title">Grupomania</h1>
      <h1 >Login</h1>
      <form @submit.prevent="login" id="wrapper">
        <span class="message">{{ error }}</span>
        <section class="input-box">
        <label for="email">Email:</label>
        <input v-model="form.email" type="email" placeholder="Email address" />
        </section>
        <section class="input-box">
        <label for="password">Password:</label>
        <input v-model="form.password" type="password" placeholder="Type your password" />
        </section>
        <button class="btn" type="button" v-on:click="login">
          Submit
        </button>
        <section class="register-link">
          <p>Don't have an account? </p>
          <router-link id="link" to="/signup">Register here</router-link>
        </section>  
      </form>
          
    </section>
  </main>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      error: '',
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      // invalid form
      if (this.form.email === '' || this.form.password === '') {
        this.error = 'Invalid form'
        return
      }
      this.error = ''
      // grabbing correct email and password
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.form.email,
          password: this.form.password
        })
        console.warn(response)
        if (response.status === 200) {
          localStorage.setItem('userId', JSON.stringify(response.data.userId))
          localStorage.setItem('token', JSON.stringify(response.data.token))
          this.$router.push({ path: '/' })
        } else {
          this.error = 'Please enter correct email and password'
        }
      } catch {
        this.error = 'Please enter correct email and password'
      }
    }
  },
  mounted () {
    // seeing if user is logged in
    const userId = JSON.parse(localStorage.getItem('userId'))
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
    background-size: contain;
    background-attachment: fixed;
  background-position: center top;
    background-position: center;
    background-repeat: no-repeat;
    font-family: poppins-reg;  
}
.wrapper {
    width: 370px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, .2);
    backdrop-filter: blur(6px);
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    color: rgb(252, 217, 235);
    border-radius: 10px;
    padding: 30px 40px;
    }
.wrapper h1 {
  font-size: 35px;
  text-align: center;
  }        
.wrapper .gp-title  {
  color: white;
  font-size: 30px;
  text-align: center;
  }
        

.wrapper .input-box{
    position: relative;
    width: 100%;
    height: 50px;
    margin: 30px 0px;
}

.input-box input, placeholder{
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    border: 2px solid #1d1b31;
    border-radius: 40px;
    font-size: 16px;
    color: #fcfcff;
    padding: 20px 45px 20px 20px;
}

.wrapper .btn {
    width: 100%;
    height: 45%;
    background: #f9a2b4;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    cursor: pointer;
    font-size: 16px;
    color: white;
    font-weight: 600;
    padding: 10px;
    margin-bottom: 10px;
    margin-top: 20px;
}

.wrapper .register-link{
    font-size: 14.5px;
    text-align: center;
    margin-top: 20px 0 15px;
    color: #f6f5fa;

.register-link p  {
    color: #fafafd;
    text-decoration: none;
    font-weight: 600;
    
}
#link{
  margin-top: 10px;
  color:#f9a2b4;
  text-decoration: none;
}
#link:hover{
  color: #1d1b31;
  font-size: 17px;
}
}



@media screen and (max-width: 768px) {
  .wrapper {
    margin-top: -50px;
  }
  .submitBtn {
    margin-left: 60px;
  }
}
</style>
