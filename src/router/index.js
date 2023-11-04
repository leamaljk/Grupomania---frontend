import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import LogIn from '../components/LogIn.vue'
import SignUp from '../components/SignUp.vue'
import CreatePost from '../components/CreatePost.vue'
import AcCount from '../components/AcCount.vue'
import SinglePost from '../components/SinglePost.vue'
import UserProfile from '../components/UserProfile.vue'
import LogOut from '../components/LogOut.vue'
//import ErrorRoute from '../components/ErrorRoute.vue'; 

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/account',
    name: 'account',
    component: AcCount
  },
  {
    path: '/createpost',
    name: 'createpost',
    component: CreatePost
  },
  {
    path: '/singlepost/:id',
    name: 'singlepost',
    component: SinglePost
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogOut
  }
  // {
  //   path: '/error',
  //   name: 'error',
  //   component: ErrorRoute // Point to the Error component
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
