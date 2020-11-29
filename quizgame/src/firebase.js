import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyCgzZzVT4KkRpi-pxgkaTFo9oi391EU0WY",
    authDomain: "map-quiz-228.firebaseapp.com",
    databaseURL: "https://map-quiz-228.firebaseio.com",
    projectId: "map-quiz-228",
    storageBucket: "map-quiz-228.appspot.com",
    messagingSenderId: "591238481144",
    appId: "1:591238481144:web:9d027d55ae2d11a75d670d"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const quizCollection = db.collection('quizzes')
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  quizCollection,
//   postsCollection,
//   commentsCollection,
//   likesCollection
}