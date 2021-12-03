function writeRestaurants() {
  //defines menuRef for the Menu database collection to create in Firestore to populate data
  var restaurantRef = db.collection("Restaurants");

  restaurantRef.add({
      restaurantname: "Marutama",
      phone: "604-123-4567",
      hours: "1PM-10PM",
      code: "NV01",
      pricepoint: "$",
      location: "Burnaby",
  });
  restaurantRef.add({
      restaurantname: "So Hyang",
      phone: "604-321-4567",
      hours: "10AM-10PM",
      code: "NV02",
      pricepoint: "$$",
      location: "Vancouver",
  });
  restaurantRef.add({
      restaurantname: "White Spot",
      phone: "604-122-4567",
      hours: "9AM-10PM",
      code: "NV03",
      pricepoint: "$$",
      location: "Burnaby",
  });
  restaurantRef.add({
      restaurantname: "Hawkers Delight",
      phone: "604-121-4567",
      hours: "1PM-10PM",
      code: "NV04",
      pricepoint: "$",
      location: "Vancouver",
  });
  restaurantRef.add({
      restaurantname: "Minami",
      phone: "604-321-4567",
      hours: "1PM-10PM",
      code: "NV05",
      pricepoint: "$$$",
      location: "Vancouver",
  });
  restaurantRef.add({
      restaurantname: "Kissa Tanto",
      phone: "604-321-4567",
      hours: "1PM-10PM",
      code: "NV06",
      pricepoint: "$$$",
      location: "Vancouver",
  });
  restaurantRef.add({
      restaurantname: "Nero",
      phone: "604-321-4567",
      hours: "1PM-10PM",
      code: "NV07",
      pricepoint: "$$",
      location: "Vancouver",
  });
  restaurantRef.add({
      restaurantname: "Meet Fresh",
      phone: "604-321-4567",
      hours: "1PM-12AM",
      code: "NV08",
      pricepoint: "$$",
      location: "Burnaby",
  });
}
// writeRestaurants(); // only run once and commented this out

function displayResto() {
  var restoCardTemplate = document.getElementById('restoCardTemplate');
  var restoCardGroup = document.getElementById('restoCardGroup');

  db.collection('Restaurants').get()
      .then(updatedRestos => {
          updatedRestos.forEach(doc => {
              var restoName = doc.data().restaurantname;
            //   console.log(restoName);
              var testRestoCard = restoCardTemplate.content.cloneNode(true);
              testRestoCard.querySelector('#restoName').innerHTML = restoName;
              testRestoCard.querySelector('a').href = `./restmain.html?id=${doc.id}`;
              restoCardGroup.appendChild(testRestoCard);
          })
      })
}
displayResto();

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
      .catch((error) => {
          // doesn't work yet
          console.log(error);
          alert('Cannot Find Restaurant');
      })
})