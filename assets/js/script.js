const WEATHER_API_BASE_URL = 'https://api.openweathermap.org'; 
const WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1'; 
const MAX_DAILY_FORECAST = 5;
const fdList = document.getElementById('five-day'); 
var forecast = document.getElementById('forecast');

// Search Text and Search Button

    var cityInput = document.getElementById('cityInput'); 
    var searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', getCity);

    searchButton.addEventListener("click", function(event){
        event.preventDefault();

      });
