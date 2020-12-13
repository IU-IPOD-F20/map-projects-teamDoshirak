<template>
  <div class="centered">
    <div v-if="finderfield==1" class="col">
      <span class="header">Find quiz by name</span>
      <input type="text" id="searcher" name="quizName" v-model="quizName" placeholder="quizName" class="mt-small field" />
      <button type="button" id="answerbutton" v-on:click="findQuiz()" class="mt-small btn">Find quiz</button>
    </div>
    <div v-if="finderfield==0">
      <span class="header">Quiz Question:</span>
      <div v-if="nexxt!=3">
        <div class="col mt-small">
          <span class="questiontxt">{{currentQuestion.questionText}}</span>
          <!-- {{options}} -->
          <select class="mt-small" id="answerer" v-model="userAnsw" :required="true">
            <option v-for="option in currentQuestion.answerOptions" v-bind:key="option.id">{{ option }}</option>
          </select>
        </div>
        <div class="mt-small">{{final}}</div>
        <button type="button" v-if="nexxt!=1" id="answbut" v-on:click="answer()" class="mt-small btn">Answer</button>
        <button type="button" v-if="nexxt==1" id="nextbut" v-on:click="contin()" class="mt-small btn">Next Question</button>
      </div>
      <div v-if="nexxt==3">
        You have finished! your score is {{ score }} out of {{ kolichka }}
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from '@/firebase'

export default {
  name: 'Quiz',
  components: {
    
  },
  data() {
    return {
      finderfield: 1,
      currentQuiz: {},
      score: 0,
      kolichka: 0,
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
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    },
    async answer(){
      if (this.userAnsw===this.currentQuestion.correctAnswer){
        this.score = this.score + 1;
        this.kolichka = this.kolichka + 1;
        this.quesnum = this.quesnum + 1;
        const helper = this.currentQuiz[this.quesnum];
        if (helper) {
          const quizFinderB = db.collection('questions').doc(helper);
          const snapshotB = await quizFinderB.get();
          this.currentQuestion = snapshotB.data();
        }
        else {
          this.final = '';
          this.nexxt = 3;
        }
      }
      else {
        this.final = "Wrong! Correct answer is: " + this.currentQuestion.correctAnswer;
        this.nexxt = 1;
        this.kolichka = this.kolichka + 1;
      }
    },
    async contin() {
        if (this.nexxt==1){
          this.quesnum = this.quesnum + 1;
          const helper = this.currentQuiz[this.quesnum];
          if (helper) {
            const quizFinderB = db.collection('questions').doc(helper);
            const snapshotB = await quizFinderB.get();
            this.currentQuestion = snapshotB.data();
            this.final = '';
            this.nexxt = 0;
          }
          else {
            this.final = '';
            this.nexxt = 3;
          }
        }
        this.quesnum = this.quesnum + 1;
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
      this.finderfield = 0;
    },
  },
  async beforeMount() {
    const citiesRef = db.collection('quizzes');
    const snapshot = await citiesRef.get();
    const safeJsonStringify = require('safe-json-stringify');
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
