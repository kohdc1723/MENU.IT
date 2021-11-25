// Upload Function
// Save image in fire storage
// Create document in Menus Collection including image url
// Only logged-in users can upload
var upload = document.getElementById('upload');
upload.addEventListener('click', function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log(user.uid);

      // save file in fire storage 
      var file = document.querySelector('#menuimagefile').files[0];
      var storageRef = storage.ref();
      var storagePath = storageRef.child('menuimages/' + file.name);
      var uploadMenu = storagePath.put(file);

      uploadMenu.on('state_changed',
        // when state changed
        null,
        // when error occured
        (error) => {
          console.error('Error: ', error);
        },
        // when succeed
        () => {
          // get image url and put it in the document attribute
          uploadMenu.snapshot.ref.getDownloadURL().then((url) => {
            console.log('updated path: ', url);
            var querystring = new URLSearchParams(window.location.search);
            var restaurantid = querystring.get('id');
            var description = document.getElementById('description').value;
            db.collection('Menus').add({
              restaurantid: restaurantid,
              description: description,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              uploader: user.uid,
              imageURL: url
            })
              .then(() => {
                var restaurantid = querystring.get('id');
                alert('Uploaded!')
                window.location.href = `./restmain.html?id=${restaurantid}`;
              }).catch((err) => {
                console.log(err);
              })

          });
        }

      );

    } else {
      // No user is signed in.
      alert("Sign Up Before Upload!");
      window.location.href = "./login.html";
    }
  });
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

//toggles MORE and LESS when wanting to upload more photos!
function postMore() {
  var x = document.getElementById("oneMore");
  if (x.style.display == "none") {
    x.style.display = "block";
    console.log("EXPANDS")
    document.getElementById("select").innerHTML = "Less (-)";
  } else {
    x.style.display = "none";
    document.getElementById("select").innerHTML = "More (+)";
    console.log("COLLAPSES")
  }
}

// Image Preview 1
function setThumbnail(event) {
  var reader = new FileReader();

  reader.onload = function (event) {
    var img = document.createElement("img");
    img.setAttribute("src", event.target.result);
    document.querySelector("div#image_container").appendChild(img);
  };
  reader.readAsDataURL(event.target.files[0]);
}
// Image Preview 2
function setThumbnail2(event) {
  var reader = new FileReader();

  reader.onload = function (event) {
    var img = document.createElement("img");
    img.setAttribute("src", event.target.result);
    document.querySelector("div#image_container2").appendChild(img);
  };
  reader.readAsDataURL(event.target.files[0]);
}
// Image Preview 3
function setThumbnail3(event) {
  var reader = new FileReader();

  reader.onload = function (event) {
    var img = document.createElement("img");
    img.setAttribute("src", event.target.result);
    document.querySelector("div#image_container3").appendChild(img);
  };
  reader.readAsDataURL(event.target.files[0]);
}