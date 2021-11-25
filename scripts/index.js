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