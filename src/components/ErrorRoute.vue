
<template>
    <div class="error-container">
      <h1>Oops!</h1>
      <p>Something went wrong. Please try again later.</p>
      <router-link to="/">Back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ErrorRoute'
  };
  </script>
  
  <style>
  .error-container {
    text-align: center;
    margin-top: 50px;
  }
  
  .error-container h1 {
    color: red;
  }
  
  .error-container p {
    margin: 20px 0;
  }
  </style>
  