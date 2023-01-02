<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { storeToRefs } from "pinia";
import { useAuthStore } from 'stores/auth';
import { route } from 'quasar/wrappers';
import { useRouter } from 'vue-router';

const linksList = [
  
]

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const store = useAuthStore();
    const { auth } = storeToRefs(store);
    const {logout} = store
    let username = '';
    const router = useRouter();
    if (auth.value) {
      username = auth.user.username
    } else {
      username = localStorage.getItem('username');
    }
    
    const logoutHandle = () => {
      logout();
      router.push('/login')
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      username,
      logoutHandle
    }
  }
})
</script>
