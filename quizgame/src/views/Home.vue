<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="These are the quizzes from Firebase:"/>
    <div>{{quizlist}}</div>
    <div>Here is the login form:</div>
    <div>
      {{email}}
      <input type="text" name="email" v-model="email" placeholder="email" />
      {{password}}
      <input type="password" name="password" v-model="password" placeholder="Password" />
      <button type="button" v-on:click="register()">Login</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { auth, db } from '@/firebase'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      email: '',
      password: '',
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
  },
  async beforeMount() {
    const citiesRef = db.collection('quizzes');
    const snapshot = await citiesRef.get();
    const safeJsonStringify = require('safe-json-stringify');
    // console.log(JSON.parse(JSON.stringify(snapshot)));
    snapshot.forEach(doc => {
      console.log("NEW");
      console.log(safeJsonStringify(doc.data()));
      this.quizlist.push(safeJsonStringify(doc.data()));
    });
    console.log("GOT_QUIZZES");
  },
}
</script>
