//binding 
$(document).ready(function(){
    $("#signUpForm").hide();
    $("#logInForm").hide();
    ///////////////------BELOW IS CODE FOR SEARCH FIELD----////////////
    $("#submitSearch").on("click", (e) => {
        getMovies();
        e.preventDefault();  //function that prevents submitting empty search form

});
    
    
//function for searching movies with search form   

function getMovies(){
    var userSearchChoice = $("#searchForm").val(); //var for user movie choice 
    var queryURL = "http://www.omdbapi.com/?s=" + userSearchChoice + "&apikey=17f76a93"
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .done(function (response) {
        console.log('response', response);

        var movies = response.Search; //var for storing api request result
        console.log('movies', movies);
        var output =""; //var for displaying movies on html
        for (i=0; i<movies.length; i++){
            console.log("test")
            
            output += `
            <div class = "col-md-3">
            <div class="well text-center">
            <img src="${movies[i].Poster}"></img>
             <h5>${movies[i].Title}</h5>
             <a onclick="movieSelected('${movies[i].imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
             </div>
            
          `;
         }; //enf of loop

        $("#moviePlace").html(output); 

    }) //end of function response
    .catch((err) => {
        console.log(err); //function in err case
    }); //end of catch err

} //end of function getMovies 



function movieSelected(){
  sessionStorage.setItem("movies[i].imdbId");
  console.log("test");
  window.location = "movie.html";
  return false;
}

function showMovieInfor(){
    var movieId = sessionStorage.getItem('movieId');
    var queryURL = "http://www.omdbapi.com/?i=" + movieId + "&apikey=17f76a93"
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .done((response) =>{
        var movie = response.data;
        var output = `
        <div class="row">
        <div class="col-md-4">
         <img src="${movies[i].Poster}" class="thumbnail">
        </div>
        <div class="col-md-8">
         <h2>${movies[i].Title}</h2>
           <ul class="list-group">
             <li class="list-group-item">Genre:${movies[i].Genre}</li>
             </ul>

        </div>
        </div>
        `;
        $("#movie").html(output);

    });
};
    ///////////////----------END OF THE CODE FOR SEARCH FIELD------------//////////////



    ///////////////----------CODE FOR RANDOM MOVIE SEARCH------------//////////////

    $("#spin").on("click", (e) => {
        getRandomMovie();
        e.preventDefault();  //function that prevents submitting empty search form

});

function getRandomMovie(){
    var userTytleChoice = $("#tytleInput").val();
    var userTypeChoice = $("#typeInput").val();
    var userYearChoice = $("#yearInput").val();

    var queryURL = "http://www.omdbapi.com/?s=" + userTytleChoice + "&apikey=17f76a93&type=" + userTypeChoice + "&y=" + userYearChoice;
    console.log(queryURL);
    $.ajax({
        url:queryURL,
        method: "GET"
    })
    .done(function (responseRandom){
        
        var randomMovies = responseRandom.Search;
        console.log(randomMovies);
        var randomOutput = randomMovies[Math.floor(Math.random()*randomMovies.length)];
        console.log(randomOutput);
        var showRandom = "";
        showRandom += `
            <div class = "col-md-3">
            <div class="well text-center">
            <img src="${randomOutput.Poster}"></img>
             <h5>${randomOutput.Title}</h5>
             <a onclick="movieSelected('${randomOutput.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
             </div>
            
          `;

          $("#randomMoviePlace").html(showRandom);
        
        /*for (i=0; i<randomOutput.length; i++){
            console.log("test");
            randomOutput += `
            <div class = "col-md-3">
            <div class="well text-center">
            <img src="${randomOutput[i].Poster}"></img>
             <h5>${randomOutput[i].Title}</h5>
             <a onclick="movieSelected('${randomOutput[i].imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
             </div>
            
          `;
        };*/ //end of loop here

        
}) //end of responseRandom here
    
    
} //end of getRandomMovie here


///////////////----------CODE FOR SIGN UP AND LOG IN------------//////////////

$("#signUp").click(function(){
    $("#header").hide();
    $("#randomizer").hide();
    $("#randomMoviePlace").hide();
    $("#moviePlace").hide();
    $("#logInForm").hide();
    $("#signUpForm").show();
    return false;

})


$("#logIn").click(function(){
    $("#header").hide();
    $("#randomizer").hide();
    $("#randomMoviePlace").hide();
    $("#moviePlace").hide();
    $("#signUpForm").hide();
    $("#logInForm").show();
    return false;

})

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAASgXXwagI49Z4C80hpOCOWS5hVBSrOec",
    authDomain: "project-uno-335d4.firebaseapp.com",
    databaseURL: "https://project-uno-335d4.firebaseio.com",
    projectId: "project-uno-335d4",
    storageBucket: "project-uno-335d4.appspot.com",
    messagingSenderId: "735977328762"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  // Initial Values
  var userName='';
  var userPass='';
  
  
  function login(){
    var userName = document.getElementById("userName").value;
    var userPass = document.getElementById("passWord").value;
  
    $("#submit").on("click", function(event) {
    event.preventDefault();
    // Get the input values
    var userName = $("#userName").val().trim();
    var userPass = parseInt($("#passWord").val().trim());
  
    // Log the Bidder and Price (Even if not the highest)
    console.log(userName);
    console.log(userPass);
  
    
      database.ref().set({
        userName: userName,
        userPass: userPass
      });
    });
  };
  
  database.ref().on("value", function(snapshot) {
  
  // Log everything that's coming out of snapshot
  console.log(snapshot.val());
  console.log(snapshot.val().userName);
  console.log(snapshot.val().userPass);
  
  
  // Change the HTML to reflect
  $("#userName").text(snapshot.val().userName);
  $("#passWord").text(snapshot.val().userPass);
  }); //end of function snapshot
  

    
    
    
     }) //don't touch this 

     

