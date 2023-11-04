

import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: {
      title: "Change your user Name.",
      mediaUrl: "https://via.placeholder.com/100",
      message: "Write something about you.",
    },
  },
    mutations: {
      updateUser(state, user) {
        state.user = user;
      },

  },
  actions: {
    // Your actions go here
  },
  getters: {
    // Your getters go here
  },
});

export default store;
