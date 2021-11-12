// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAszUD5M6QeLyxfH1UEmoZsNTqhK4rhuFo",
  authDomain: "comp1800-bby13.firebaseapp.com",
  projectId: "comp1800-bby13",
  storageBucket: "comp1800-bby13.appspot.com",
  messagingSenderId: "446911422013",
  appId: "1:446911422013:web:157cb7256eefcf66b15454"
};
  
  //initialize database in firebaseAPI script
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();