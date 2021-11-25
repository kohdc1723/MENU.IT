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
  const storage = firebase.storage();

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var profilename = document.getElementById('profile-name');
        profilename.innerHTML = user.displayName;
        profilename.addEventListener('click', ()=> {
          window.location.href = "./profile.html";
        })

        var signout = document.getElementById('sign-out');
        signout.innerHTML = 'Sign out';
        signout.addEventListener('click', ()=> {
          firebase.auth().signOut();
          window.location.href = "./main.html";
        })
        
    } else {
        // No user is signed in.
        var profilename = document.getElementById('profile-name');
        profilename.innerHTML = "Sign In";
        profilename.addEventListener('click', ()=> {
          window.location.href = "./login.html";
        })

        var signout = document.getElementById('sign-out');
        signout.style.visibility = 'hidden';
        
    }
})