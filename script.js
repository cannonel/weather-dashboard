//global variables
var searchBtn = document.querySelector("#search-btn");
var currentForecastEl = document.querySelector("#current-forecast");
var futureForecastEl = document.querySelector("#future-forecast");
var searchResultsEl = document.querySelector("#results");
var imgContainer = document.querySelector("#img-container");
var searchHistory = document.querySelector("#search-history");

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

//function to update local storage
function updateStorage(searchQuery) {
    userInput.push(searchQuery);
    localStorage.setItem("queries", JSON.stringify(userInput));

}

//gets the searched city
function getCityData(searchQuery) {
    console.log(userInput);
    var cityData =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      searchQuery +
      "&limit=1&appid=096c6b1c200b27403244ac76a0e8bd2d";
    fetch(cityData).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // if nothing comes back, console log
          if (data === "[]") {
            $("#error").textContent = "That didn't work. Try again.";
          } else {
            // if data received, set lat/lon to localstorage
            localStorage.setItem("lat", data[0].lat);
            localStorage.setItem("lon", data[0].lon);
            console.log("City data for: " + data[0].name, data[0].state);
            //when submit is clicked, text will persist
            $("#search-bar").textContent = data[0].name;
            // fetch weather data for city
            getWeatherData(data[0].name, data[0].state);
          }
        });
      }
    });
  }

function getWeatherData(city, state) {
    var lat = localStorage.getItem("lat");
    var lon = localStorage.getItem("lon");

    var dataURL = 
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&exclude=minutely,hourly&appid=096c6b1c200b27403244ac76a0e8bd2d";

    fetch(dataURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrent(data.current, city, state);
                displayForecast(data.daily);
            });
        } else {
            console.log("error");
        }
    })
    .catch(function (error){ 
        console.log("unable to connect to openweather");
    });
}

function displayCurrent(weather, city, state) {
    currentForecastEl.textContent = "";
    searchResultsEl.textContent = "";
    imgContainer.textContent = "";
    $("#search-bar").val("");
    $("current-forecast").removeClass("invisible");

    //show current weather for search
    var cityStateEl = document.createElement("h3");
    cityStateEl.textContent = "Current weather - " + city +  " " + state;
    var timeStamp = document.createElement("p");
    timeStamp.textContent = "Time is: ";
    searchResultsEl.appendChild(cityStateEl);

    var currentImg = document.createElement("img");
    currentImg.setAttribute("src", "https://openweather.org/img/wn" + weather.weather[0].icon + ".png");
    imgContainer.appendChild(currentImg);
    currentForecastEl.appendChild(imgContainer);

    //header
    // WEATHER HEADER
  var currentMainEl = document.createElement("h1");
  currentMainEl.textContent = weather.weather[0].main;
  currentForecastEl.appendChild(currentMainEl);
  // TEMP
  var currentTempEl = document.createElement("h4");
  currentTempEl.textContent = "Temp: " + roundNum(weather.temp) + "\u00B0 F";
  currentForecastEl.appendChild(currentTempEl);
  // FEEL
  var currentFeelEl = document.createElement("h4");
  currentFeelEl.textContent =
    "Feels like: " + roundNum(weather.feels_like) + "\u00B0 F";
  currentForecastEl.appendChild(currentFeelEl);
  // HUMIDITY
  var currentHumidEl = document.createElement("h4");
  currentHumidEl.textContent = "Humidity: " + weather.humidity + "%";
  currentForecastEl.appendChild(currentHumidEl);
  // UVI
  var currentUviEl = document.createElement("h4");
  currentUviEl.textContent = "UV Index: " + weather.uvi;
  // add color classes
  if (weather.uvi <= 2) {
      currentUviEl.classList = "green"
  }
  if (weather.uvi >= 3 && weather.uvi <= 5) {
      currentUviEl.classList = "yellow"
  }
  if (weather.uvi >= 6 && weather.uvi <= 7) {
      currentUviEl.classList = "orange"
  }
  if (weather.uvi >= 8) {
      currentUviEl.classList = "red"
  }
  currentForecastEl.appendChild(currentUviEl);
}


//load past searches
function loadHistoryBtns() {

};