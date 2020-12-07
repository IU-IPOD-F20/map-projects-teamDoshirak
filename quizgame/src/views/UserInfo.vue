<template>
  <div class="home">
    User Info
    <div>User ID: {{userId}}</div>
    <div>User email: {{userEmail}}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import { auth } from '@/firebase'
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'UserInfo',
  components: {
    
  },
  data() {
    return {
      userId: '',
      userEmail: '',
    //   options: [],
    //   answ: '',
    //   userAnsw: '',
    //   text: '',
    //   email: '',
    //   final: '',
    //   password: '',
    //   quizName: '',
    //   finalResult: '',
    //   quizQuestions: {},
    //   quizData: {},
    //   quizlist: []
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
