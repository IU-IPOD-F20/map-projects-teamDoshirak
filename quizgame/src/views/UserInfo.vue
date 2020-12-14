<template>
  <div class="centered">
    <span class="header">User Info</span>
    <div class="mt-small"><span class="semiheader">User ID: </span>{{userId}}</div>
    <div class="mt-small"><span class="semiheader">User email: </span>{{userEmail}}</div>
  </div>
</template>

<script>
import { auth } from '@/firebase'

export default {
  name: 'UserInfo',
  components: {
    
  },
  data() {
    return {
      userId: '',
      userEmail: '',
    };
  },
  methods: {
  },
  async beforeMount() {
    if (auth.currentUser){
      const usId = await auth.currentUser.uid;
      const usEm = await auth.currentUser.email;
      this.userId = usId;
      this.userEmail = usEm;
    }
  },
}
</script>
