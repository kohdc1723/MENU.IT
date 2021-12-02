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