// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var buttons = document.getElementById("buttons");
img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.style.display = "block";
    //captionText.innerHTML = this.alt;
    buttons.style.display = "block";
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// Change restautant information and restaurant name using querystring data
var querystring = new URLSearchParams(window.location.search);
db.collection('Restaurants').doc(querystring.get('id')).get().then((result) => {
    document.getElementById('restoName').innerHTML = result.data().restaurantname;
    document.getElementById('contact').innerHTML = result.data().phone;
    document.getElementById('hours').innerHTML = result.data().hours;
    document.getElementById('location').innerHTML = result.data().location;
    document.getElementById('price').innerHTML = result.data().pricepoint;
})

// Clickable upload button, redirect to upload.html corresponding to the restaurantid
var upload = document.getElementById('uploadimage');
upload.addEventListener('click', () => {
    var querystring = new URLSearchParams(window.location.search);
    console.log(querystring.get('id'));
    window.location.href = `./upload.html?id=${querystring.get('id')}`;
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

// Gallery Display
function displayGallery() {
    var galleryTemplate = document.getElementById('galleryTemplate');
    var galleryGroup = document.getElementById('galleryGroup');
    var querystring = new URLSearchParams(window.location.search);
    var restaurantid = querystring.get('id');
    // declare array for timestamp sorting
    var urlarray = new Array();
    db.collection('Menus').where('restaurantid', '==', restaurantid).onSnapshot((imageload) => {
        imageload.forEach((doc) => {
            // array control
            var i = 0;
            // reading imageURL and timestamp from documents
            var menuimageurl = doc.data().imageURL;
            var menutime = doc.data().timestamp;
            // add url and timestamp in the array => creates 2D array
            urlarray.push([menuimageurl, menutime]);
            // sort array by timestamp
            urlarray.sort(function (a, b) {
                return b[1].seconds - a[1].seconds;
            })
            // increment control
            i++;
        })
        // populate images in order of timestamp
        for (var i = 0; i < urlarray.length; i++) {
            var testGallery = galleryTemplate.content.cloneNode(true);
            testGallery.querySelector('img').src = urlarray[i][0];
            galleryGroup.appendChild(testGallery);
        }
        // show first image as default in a big image field
        document.getElementById('myImg').src = urlarray[0][0];
        console.log(urlarray[0][0]);
        
        // validate show
        console.log(urlarray);
        document.getElementById('datevalidated').innerHTML = urlarray[0][1].toDate();
    })
}
displayGallery();

// Clickable Gallery
function switchimage(img) {
    var imgurl = img.src;
    var imgtimestamp;
    document.getElementById('myImg').src = imgurl;
    db.collection('Menus').where('imageURL', '==', imgurl).onSnapshot((snapshot)=> {
        snapshot.forEach((doc)=> {
            imgtimestamp = doc.data().timestamp;
            document.getElementById('datevalidated').innerHTML = imgtimestamp.toDate();
        })
    })
}

//calls 2 other functions when validate is clicked
function updateValidate() {
    clickedValidate();
    incrementValidate();
}

//increments
function incrementValidate() {
    //gets the main image's src data
    let mainImgSrc = document.getElementById("myImg").getAttribute("src");

    db.collection("Menus").get().then((snapshot) => {
        snapshot.forEach(doc => {
            var query = doc.data().imageURL
            // console.log(doc.id) //gets the document ID of where the URL is

            //if the mainimgsrc is in the query, then say it matches!
            if (mainImgSrc == query) {
                var URLindocumentID = doc.id;

                // console.log(URLindocumentID); //provides the document ID with the URL field

                var updateTimeStamp = db.collection("Menus").doc(URLindocumentID);

                updateTimeStamp.set({
                    validatecount: firebase.firestore.FieldValue.increment(1),
                }, { merge: true });

                updateTimeStamp.update({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })

                updateTimeStamp
                    .onSnapshot(doc => {
                        //gets timestamp of the specific documentID
                        var theTime = doc.data().timestamp; //gets time and date
                        // const validatedDate = theTime.toDate().toDateString(); //if ONLY WANT THE DATE

                        document.getElementById("datevalidated").innerHTML = theTime.toDate();
                    })
            }
        })

    })
}

//changes the color
function clickedValidate() {
    // //disables it after ONE click
    document.getElementById("validate").disabled = true;

    //changed background color and text color
    document.querySelector('#validate').style.backgroundColor = '#ef5a5a';
    document.getElementById("validate").style.color = 'white';
    document.getElementById("validate").style.padding = '6px 10px';
    document.getElementById("validate").style.width = '110px';
    document.getElementById("validate").style.fontSize = '12px';
    document.getElementById("validate").style.fontWeight = '20px';
    document.getElementById("validate").style.borderColor = '#ef5a5a'
    
    //text changes to "Validated"
    document.getElementById("validate").innerHTML = "VALIDATED";
}