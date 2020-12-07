<template>
  <div class="home">
    User Info
    <div>User ID: {{userId}}</div>
    <div>User email: {{userEmail}}</div>
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
    const usId = await auth.currentUser.uid;
    const usEm = await auth.currentUser.email;
    this.userId = usId;
    this.userEmail = usEm;
  },
}
</script>
