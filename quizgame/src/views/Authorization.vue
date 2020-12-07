<template>
  <div class="home">
    <div>Here is the login form:</div>
    <div>
      {{email}}
      <input type="text" id="email" name="email" v-model="email" placeholder="email" />
      {{password}}
      <input type="password" id="#password" name="password" v-model="password" placeholder="Password" />
      <button type="button" id="registerer" v-on:click="register()">Register</button>
      <button type="button" id="loginer" v-on:click="login()">Login</button>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase'

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
      quizlist: []
    };
  },
  methods: {
    async register() {
      auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        console.log(user);
        console.log(auth.currentUser.uid);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    },
    async login() {
      console.log(auth.currentUser.uid);
      auth.signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        console.log(user);
        console.log(auth.currentUser.uid);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    },
  }
}
</script>
