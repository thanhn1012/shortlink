import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: null
  }),

  getters: {
    
  },

  actions: {
    setAuth(authInfo) {
      this.auth = authInfo
      localStorage.setItem('username', this.auth.user.username);
      localStorage.setItem('jwt', this.auth.jwt);
    },
    logout() {
      this.auth = null
      localStorage.removeItem('username');
      localStorage.removeItem('jwt');
    }
  }
})
