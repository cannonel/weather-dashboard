//global variables
var searchBtn = document.querySelector("#search-btn");
var currentForecastEl = document.querySelector("#current-forecast");
var futureForecastEl = document.querySelector("#future-forecast")
var searchResultsEl = document.querySelector("#search-results")
var imgContainer = document.querySelector("#img-container")
var searchHistory = document.querySelector("#serach-history")

//5 day forecast
var forecastDay2 = moment().add(1, "days").format("MMM D");
var forecastDay3 = moment().add(2, "days").format("MMM D");
var forecastDay4 = moment().add(3, "days").format("MMM D");
var forecastDay5 = moment().add(4, "days").format("MMM D");

//current date
var currentTime = moment().format("dddd, MMMM Do");
$("#current-time").text(currentTime);

var userInput = [];

//los functiones
searchBtn.addEventListener("click", function (event) {
    event.preventDefault();

    //value of the city searched for
    var searchQuery = document.querySelector("#search-bar").value;
    //error message for blank field
    if (!searchQuery) {
    $("#error-msg").addClass("show");
    $("#error-msg").text("please enter a valid entry");
    $("#error-msg").delay(3000).fadeOut();
    } else {
        updateStorage(searchQuery);
        getCityData(searchQuery);
        loadHistoryBtns(searchQuery);
    }
});
