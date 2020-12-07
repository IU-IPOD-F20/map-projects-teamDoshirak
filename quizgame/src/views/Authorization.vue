<template>
  <div class="home">
    <div>Here is the login form:</div>
    <div>
      {{email}}
      <input type="text" name="email" v-model="email" placeholder="email" />
      {{password}}
      <input type="password" name="password" v-model="password" placeholder="Password" />
      <button type="button" v-on:click="register()">Register</button>
      <button type="button" v-on:click="login()">Login</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { auth } from '@/firebase'
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Authorization',
  components: {
    
  },
  data() {
    return {
      options: [],
      answ: '',
      userAnsw: '',
      text: '',
      email: '',
      final: '',
      password: '',
      quizName: '',
      finalResult: '',
      quizQuestions: {},
      quizData: {},
      quizlist: []
    };
  },
  methods: {
    async register() {
      auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        console.log(user);
        console.log(auth.currentUser.uid);
        // Signed in 
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
    },
    async login() {
      console.log(auth.currentUser.uid);
      auth.signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        console.log(user);
        console.log(auth.currentUser.uid);
        // Signed in 
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
    },
  }
}
</script>
