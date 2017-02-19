var button = document.getElementById("button");
var ratings = document.getElementById("ratings");
var pressed = 0;
var ratingsString;

button.addEventListener("click", function(){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://raw.githubusercontent.com/SamiOksanen/JSON-AJAX-MyTVShowRatings/master/ratings.json');
    request.onload = function(){
        var myData = JSON.parse(request.responseText); 
        ratingsToHTML(myData);
    }
    request.send();
    pressed++;
    if(pressed == 1){
        var newButtonValue = "Show my ratings!";
        document.getElementById("button").value = newButtonValue;
    }
    if(pressed > 1){
        button.classList.add("hide");
    }
});

function ratingsToHTML(data){
    ratingsString = "";
    for(i = 0; i < data.length; i++){
        ratingsString += "<p>TV-series: " + data[i].name; 
        for(ii = 0; ii < data[i].genres.length; ii++){
            if(ii == 0){
                ratingsString += "<br>Genres: ";
            }
            ratingsString += data[i].genres;
            if(ii < data[i].genres.length){
                ratingsString += ", ";
            }
        }
        ratingsString += "<br>Seasons: " + data[i].time.seasons + " (" +data[i].time.released + " - " + data[i].time.ended + ")";
        if(pressed == 2){
            document.getElementById("ratings").innerHTML = "";
            ratingsString += "<br>My rating: " + data[i].rating;
        }
    }
    
    ratings.insertAdjacentHTML('beforeend', ratingsString);
    
}