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
      <button type="button" v-on:click="register()">Register</button>
      <button type="button" v-on:click="login()">Login</button>
    </div>
    <div>
      <input type="text" name="quizName" v-model="quizName" placeholder="quizName" />
      <button type="button" v-on:click="findQuiz()">Find quiz</button>
      {{ quizQuestions }}
    </div>
    <div>
      Quiz Example:
      <div>
        <div>
          {{text}}
          {{options}}
          <select class="form-control" v-model="userAnsw" :required="true">
            <option v-for="option in options" v-bind:key="option.id">{{ option }}</option>
          </select>
        </div>
        <div>{{final}}</div>
        <button type="button" v-on:click="answer()">Answer</button>
      </div>
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
    async answer(){
      if (this.userAnsw===this.answ){
        this.final = "Correct!";
      }
      else {
        this.final = "Wrong! Correct answer is: " + this.answ;
      }
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
    async findQuiz() {
      const quizFinder = db.collection('quizzes').doc(this.quizName);
      const snapshot = await quizFinder.get();
      const safeJsonStringify = require('safe-json-stringify');
      console.log(safeJsonStringify(snapshot.data()));
      console.log("GOT_CERTAIN");
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

    const quizDannie = db.collection('questions').doc('test228');
    const quizAAA = await quizDannie.get();
    console.log("Quizdanye");
    console.log(safeJsonStringify(quizAAA.data()));
    this.quizData = safeJsonStringify(quizAAA.data());

    
    this.answ = await quizAAA.data().correctAnswer;
    const answopt = await quizAAA.data().answerOptions;
    
    for (let i = 0; i < answopt.length; i++) {
      this.options.push(answopt[i]);
    }

    console.log("ddd", this.options)
  },
}
</script>
