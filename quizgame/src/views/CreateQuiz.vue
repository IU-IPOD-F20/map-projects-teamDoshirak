<template>
  <div class="centered">
      <span class="header" v-if="stage!=2">Create your own quiz!</span>
    <div v-if="stage==0" class="col">
        <input type="text" name="quizname" v-model="quizname" placeholder="Enter quiz name..." id="qizname" class="mt-small field">
        <button @click="createinit" class="mt-small btn">Next</button>
    </div>
    <div v-if="stage==1">
        <div class="mt-small">
            <span class="mt-small semiheader">Question {{questionnumber}}</span>
            <div class="col">
                <input type="text" name="questiontext" id="questiontext" v-model="questiontext" placeholder="Enter question" class="mt-small field">
                <input type="text" name="opt1" id="opt1" v-model="opt1" placeholder="Answer option 1" class="mt-small field">
                <input type="text" name="opt2" id="opt2" v-model="opt2" placeholder="Answer option 2" class="mt-small field">
                <input type="text" name="opt3" id="opt3" v-model="opt3" placeholder="Answer option 3" class="mt-small field">
                <input type="text" name="opt4" id="opt4" v-model="opt4" placeholder="Answer option 4" class="mt-small field">
                <input type="text" name="correctanswer" id="correctanswer" v-model="correctanswer" placeholder="Enter correct answer" class="mt-small field">
                <button @click="questionadder" class="mt-small btn">Add question</button>
                <button @click="stage=2" class="mt-small btn">Finish</button>
            </div>
        </div>
    </div>
    <div v-if="stage==2" class="mt-small header">
        Congratulations! <br> <br> You have created the "{{quizname}}" quiz!
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  name: 'Quiz',
  components: {
    
  },
  data() {
    return {
      quizname: '',
      stage: 0,
      questionnumber: 1,
      questionid: '',
      questiontext: '',
      opt1: '',
      opt2: '',
      opt3: '',
      opt4: '',
      correctanswer: '',
      objectpusher: {},
      questionpusher: {}
    };
  },
  methods: {
    createinit() {
        this.stage = 1;
        // this.quizid = this.create_UUID();
        // console.log('quiz id:', this.quizid);
    },
    create_UUID(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    },
    async questionadder() {
        this.questionid = this.create_UUID();
        this.objectpusher[this.questionnumber] = this.questionid;
        this.questionpusher['answerOptions'] = [this.opt1, this.opt2, this.opt3, this.opt4];
        this.questionpusher['correctAnswer'] = this.correctanswer;
        this.questionpusher['questionText'] = this.questiontext;

        // Add a new document in collection "cities" with ID 'LA'
        const res = await db.collection('quizzes').doc(this.quizname).set(this.objectpusher);
        console.log(res);
        const res2 = await db.collection('questions').doc(this.questionid).set(this.questionpusher);
        console.log(res2);
        this.questionnumber = this.questionnumber + 1;
    },
  },
  async beforeMount() {
    
  },
}
</script>
