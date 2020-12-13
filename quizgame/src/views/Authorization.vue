<template>
  <div class="centered">
    <div class="header">Sign In or Sign Up</div>
    <div class="col mt-small">
      <input type="text" id="email" name="email" v-model="email" placeholder="email" class="field" />
      <input type="password" id="#password" name="password" v-model="password" placeholder="Password" class="mt-small field" />
      <button type="button" id="registerer" class="mt-small btn" v-on:click="register()">Register</button>
      <button type="button" id="loginer" class="mt-small btn" v-on:click="login()">Login</button>
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
