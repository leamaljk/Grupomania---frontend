<script>
import Sidebar from '@/sidebar/SideBar.vue'
import { sidebarWidth } from '@/sidebar/state.js'


export default {
  components: { Sidebar},
  setup() {
    return { sidebarWidth }
  }
}


</script>
<template>

<div>

    <Sidebar />
    <div class="content">
      <router-view />
    </div>
  </div>

 
</template>

<style>
body{
  font-family: poppins-reg;
  text-align: center;
}

.display{
  display: flex;
  width: 100%;
}

.box-design{
    display: flex;
    width: 950px;
    height: 500px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, .2);
    backdrop-filter: blur(6px);
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    color: black;
    border-radius: 10px;
    float: right;
    position: relative;
    left: 130px;
    margin: 20px;
    align-items: center;
    justify-content: center;
    
}

@media screen and (max-width: 768px) {
  .box-design{
    width: 100%;
    position: relative;
    left: 70px;
  }
}
</style>