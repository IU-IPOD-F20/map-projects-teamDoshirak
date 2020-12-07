<template>
  <div class="home">
    <div>
      <input type="text" id="searcher" name="quizName" v-model="quizName" placeholder="quizName" />
      <button type="button" id="answerbutton" v-on:click="findQuiz()">Find quiz</button>
    </div>
    <div>
      Quiz Questions:
      <div>
        <div>
          {{currentQuestion.questionText}}
          <!-- {{options}} -->
          <select class="form-control" id="answerer" v-model="userAnsw" :required="true">
            <option v-for="option in options" v-bind:key="option.id">{{ option }}</option>
          </select>
        </div>
        <div>{{final}}</div>
        <button type="button" id="answbut" v-on:click="answer()">Answer</button>
        <button type="button" v-if="nexxt==1" id="nextbut" v-on:click="contin()">Next Question</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { auth, db } from '@/firebase'
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Quiz',
  components: {
    
  },
  data() {
    return {
      currentQuiz: {},
      currentQuestion: {},
      quesnum: 1,
      nexxt: 0,
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
        this.quesnum = this.quesnum + 1;
        const helper = this.currentQuiz[this.quesnum];
        const quizFinderB = db.collection('questions').doc(helper);
        const snapshotB = await quizFinderB.get();
        // console.log(safeJsonStringify(snapshotB.data()));
        this.currentQuestion = snapshotB.data();
      }
      else {
        this.final = "Wrong! Correct answer is: " + this.answ;
        this.nexxt = 1;
      }
    },
    async contin() {
        if (this.nexxt==1){
          this.quesnum = this.quesnum + 1;
          const helper = this.currentQuiz[this.quesnum];
          const quizFinderB = db.collection('questions').doc(helper);
          const snapshotB = await quizFinderB.get();
        // console.log(safeJsonStringify(snapshotB.data()));
          this.currentQuestion = snapshotB.data();
          this.final = '';
          this.nexxt = 0;
        }
        this.quesnum = this.quesnum + 1;
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
      this.quizQuestions = snapshot.data();
      console.log("GOT_CERTAIN");
      this.currentQuiz = snapshot.data();
      const helper = this.currentQuiz[1];
      const quizFinderB = db.collection('questions').doc(helper);
      const snapshotB = await quizFinderB.get();
      console.log(safeJsonStringify(snapshotB.data()));
      this.currentQuestion = snapshotB.data();
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
