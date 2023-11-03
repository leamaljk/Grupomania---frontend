<template>
<header>
    <div class="h1-header"> 
      <img src="../assets/images/logos/icon-left-font-monochrome-white.png" alt="Logo" class="logo" width="150" height="40">
    </div>
    <div class="h2-header">
       We have a new project that we wish to entrust<br > to CONNECT-E. <br >It
focuses on the creation of a modern and fun <br >internal social network, that will allow<br > employees to
get to know each other <br >in a more informal setting.
    </div>
  
    <div class="image-container">
      <img :src="imageUrl" alt="Your Photo" />
      <img :src="imageUrl2" alt="Your Photo" />
      <img :src="imageUrl3" alt="Your Photo" />
    </div>
 
</header>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: 'https://woodedglen.com/wp-content/uploads/2022/03/Like-Comment-Share.jpg',
      imageUrl2: 'https://mydmi.imgix.net/Being_Needed__Not_Needy_How_To_Create_Content_People_Actually_Want__card.png?crop=edges&fit=crop&fm=jpg&h=1260&ixlib=php-3.3.1&q=40&w=2400&s=90c2072451e9a10547d62a2bde851bd3',
      imageUrl3: 'https://socialmediaclub.org/wp-content/uploads/2015/11/Untitled-design.jpg',
      
    };
  },
  props: {
    title: String,
    subTitle: String,
    imageSrc: String,
  },
};
</script>

<style scoped>

header {
  position: relative;
  background-color: rgba(234, 228, 223, 0.928);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 230px;
}

.h1-header {
  margin: 0;
  width: 450px;
  height: 150px;
  padding: 0;
  position: relative;
  left: 240px;
  bottom: 75px;
}

.h2-header {
  font-size: 16px;
  margin: 0;
  width: 650px;
  height: 100px;
  position: relative;
  right: 260px;
  top: 10px;
  text-align: left;
  bottom: 40px;
  color:#1d1b31;
  text-align: center;
}

.image-container {
  width: 150px; 
  height: 150px; 
  display: flex;
  position: relative;
  right: 380px;
  top: 20px;
}

.image-container img:hover{
  transform: scale(1.2);
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  margin-left: 20px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }

  .h1-header, .h2-header, .image-container {
    width: auto;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: 10px;
  }

  .h1-header {
    align-self: center;
    width: 300px;
    height: 100px;
    
  }

  .h2-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .image-container {
    justify-content: center;
    gap: 10px;
  }
  .image-container img {
    margin-left: 0;
    width: 120px;
    height: 120px;
    margin-top: 30px;
  }
}

@media (max-width: 480px) {
  .h2-header {
    font-size: 14px; 
  }

  .image-container {
    flex-direction: row;
    gap: 10px;
    
  }

  .image-container img {
    margin-left: 0;
    width: 100px;
    height: 100px;
    margin-top: 50px;
  }
}
</style>
