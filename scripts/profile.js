var currentUser;

function populateInfo() {
  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid)
      //get the document for current user.
      currentUser.get()
        .then(userDoc => {
          //get the data fields of the user
          var userName = userDoc.data().name;
          var userSchool = userDoc.data().school;
          var userCity = userDoc.data().city;

          //if the data fields are not empty, then write them in to the form.
          if (userName != null) {
            document.getElementById("nameInput").value = userName;
          }
          if (userEmail != null) {
            document.getElementById("emailInput").value = userEmail;
          }
          if (userPhone != null) {
            document.getElementById("phoneInput").value = userPhone;
          }
          if (userWebsite != null) {
            document.getElementById("websiteInput").value = userWebsite;
          }
          if (userStreet != null) {
            document.getElementById("streetInput").value = userStreet;
          }
          if (userCity != null) {
            document.getElementById("cityInput").value = userCity;
          }
          if (userProvince != null) {
            document.getElementById("provinceInput").value = userProvince;
          }
          if (userPostalCode != null) {
            document.getElementById("postalcodeInput").value = userPostalCode;
          }
        })
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//call the function to run it 
populateInfo();

function editUserInfo() {
  //Enable the form fields
  document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
  //Get the value of the field
  userName = document.getElementById('nameInput').value;
  userEmail = document.getElementById('emailInput').value;
  userPhone = document.getElementById('phoneInput').value;
  userWebsite = document.getElementById('websiteInput').value;
  userStreet = document.getElementById('streetInput').value;
  userCity = document.getElementById('cityInput').value;
  userProvince = document.getElementById('provinceInput').value;
  userPostalCode = document.getElementById('postalcodeInput').value;

  //Write the values in the database
  currentUser.update({
    name: userName,
    email: userEmail,
    phone: userPhone,
    website: userWebsite,
    street: userStreet,
    city: userCity,
    province: userProvince,
    postalcode: userPostalCode,
  })
  document.getElementById('personalInfoFields').disabled = true;
}

var signout = document.getElementById('signout');
signout.addEventListener('click', () => {
  firebase.auth().signOut();
  window.location.href = "./main.html";
})

// Search Function
var searchbutton = document.getElementById('searchbutton');
searchbutton.addEventListener('click', () => {
  var searchinput = document.getElementById('searchbox').value;
  db.collection('Restaurants').where('restaurantname', '==', searchinput).get()
    .then((result) => {
      result.forEach((doc) => {
        var restaurantid = doc.id;
        window.location.href = `./restmain.html?id=${restaurantid}`;
      })
    })
    .catch(() => {
      alert('Cannot Find Restaurant');
    })
})