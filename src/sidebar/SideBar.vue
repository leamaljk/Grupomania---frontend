<template>
<div class="sidebar" :class="{ active: isSidebarOpen }">
    <div class="toggle-button" @click="toggleSidebar">
      <svg class="toggle-icon" xmlns="http://www.w3.org/2000/svg" height="1em" fill="white" viewBox="0 0 512 512">
      </svg>
    </div>
    <!-- Element to hide when the sidebar is closed -->
    <div id="elementToHide" class="element" v-if="isSidebarOpen">
      <img src="../assets/images/logos/icon-left-font-monochrome-white.png" alt="Logo" class="logo" width="150"> <!-- Adjust the width as needed -->

      <!-- Content of the element -->
    </div>
    <nav>
      <ul>
        <li><router-link to="/"><span>Home</span></router-link></li>
        <li><router-link to="/logout"><span>Account</span></router-link></li>
        <!-- <li><router-link to="/account"><span>Log Out</span></router-link></li> -->
        <li><router-link to="/createpost"><span>Create Post</span></router-link></li>
        <!-- <li><router-link to="/singlepost/:id"><span>Single Post</span></router-link></li> -->
        <li><router-link to="/profile"><span>User Profile</span></router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
};
</script>

<style>
:root {
  --sidebar-bg-color: #1d1b31;
  --sidebar-item-hover: rgba(234, 228, 223, 0.928);
  --sidebar-item-active: white;
}
</style>


<style lang="scss" scoped>

.sidebar {
  width: 80px;
  height: 100%;
  background-color: var(--sidebar-bg-color);
  position: fixed;
  top: 0;
  left: 0;
  transition: width 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  overflow: hidden;
  font-family: poppins-reg;
  font-size: 17px;

  &.active {
    width: 240px;
  }

  #elementToHide {
    img:hover {
      transform: scale(1.3);
    }
  }

  .toggle-button {
    cursor: pointer;
    color: #fff;
    
    .toggle-icon {
      margin: 20px;
      border: 1px solid white;
      border-radius: 50%;
      padding: 20px;
    }
    
    svg {
      width: 20px;
      height: 20px;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: center;

    ul {
      list-style: none;
      padding: 0;

      li {
        background: transparent;
        border-top: 1px solid rgba(234, 228, 223, 0.464);
        border-bottom: 1px solid rgba(234, 228, 223, 0.464);
        backdrop-filter: blur(6px);
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
        color: black;
        padding: 10px;
        margin: 16px 0 0;
        width: 100%;
        color: white;
        text-align: center;
        padding-left: 60px;
        padding-right: 60px;

        &:hover {
          background-color: var(--sidebar-item-hover);
        }

        a {
          text-decoration: none;
          color: #fff;
        }
      }
    }
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .sidebar {
    display: flex;
    background-color: transparent;
    flex-direction: column;
    width: 50px;
    justify-content: flex-start;
    position: absolute;
    top: 0;
  }

  .sidebar.active {
    width: 100%; 
    height: 100% ;
    background-color:#1d1b31;
    
  }

  
  .sidebar .toggle-button .toggle-icon{
    border: 3px solid white;
    border-bottom: 4px solid #1d1b31;
    display: flex; /* Ensures that the toggle button is always visible */
    position: relative; /* Positions the toggle button on the top */
    top: 0; /* Adjust this value to position the toggle button as desired */
    left: 0; /* Adjust if you want some space from the left edge */
    z-index: 1010; /* Ensures it's above the sidebar */
  }

  .sidebar nav {
    display: none; /* Hide the navigation when sidebar is not active */
  }

  .sidebar.active nav {
    display: flex; /* Show the navigation when sidebar is active */
  }

  .sidebar #elementToHide {
    display: none; /* Hide the logo when sidebar is not active */
  }

  .sidebar.active #elementToHide {
    display: block; /* Show the logo when sidebar is active */
  }
  
}
</style>