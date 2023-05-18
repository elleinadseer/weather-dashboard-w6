const WEATHER_API_BASE_URL = 'https://api.openweathermap.org'; 
const WEATHER_API_KEY = '3770aa61038a0816864d556d797ecb9f'; 
const MAX_DAILY_FORECAST = 5;
const fdList = document.getElementById('five-day'); 
var forecast = document.getElementById('forecast');

const getCity = () => {
    // Get the Location entered by the user
    const userLocation = cityInput.value;

    console.log(cityInput.value);
    tellWeather(userLocation);
}

const tellWeather = (search) => {

 // Lookup the location to get the Lat/Lon
 var apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
 fetch (apiUrl)
     .then(response => response.json())
     .then(data => {

         console.log(data);

         // Pick the First location from the results
         var lat = data[0].lat;
         var lon = data[0].lon;

         const myData = {
         name: data[0].name,
         country: data[0].country,
         lat: data[0].lat,
         lon: data[0].lon
         }

         console.log(myData);

         // Get the Weather
         var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;         
         fetch(apiUrl)
             .then(response => response.json())
             .then(data => {
 
                 console.log(data);
                 // Show the Current Weather Forecast 
                 displayCurrentWeather (data);

                 // Show the 5 Day Weather Forecast 
                 displayWeatherForecast(data);
                 })

             // Display the Weather
             displayWeather (myData);
             })
}



var displayCurrentWeather = (weatherData) => {
    var currentWeather = weatherData.current;

    var date = document.getElementById('date')
    date.textContent = new Date(currentWeather.dt*1000).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}); 

    // Display the Current Weather
    document.getElementById('icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png"/>`;
    document.getElementById('temp').textContent = `Temp: ${currentWeather.temp} Celsius`;
    document.getElementById('wind').textContent = `Wind: ${currentWeather.wind_speed} MPH`; 
    document.getElementById('humidity').textContent = `Humidity: ${currentWeather.humidity}%`; 
}

    const displayWeatherForecast = (weatherData) => {

    // Get the Daily Forecasts
    const dayData = weatherData.daily;

    // Show the Forecast section
    fdList.style.display = 'flex';
    forecast.style.display = 'display';


    // Clear any current Forecasts
    fdList.innerHTML = '';

    for (let i = 0; i <MAX_DAILY_FORECAST; i++) {
    // Add the new Forecasts so they are displayed one each
    var dayForecast = dayData[i];
    var day = new Date(dayForecast.dt*1000).toLocaleDateString('en-GB', {weekday: 'long'}); 
    var icon = `<img src="https://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png"/>`;
    var temp = `Temp: ${dayForecast.temp.day} Celsius`;
    var humidity = `Humidity: ${dayForecast.humidity}%`; 
    var wind = `Wind: ${dayForecast.wind_speed} MPH`;

    var newForecast = document.createElement('div'); 
    newForecast.classList.add('forecast-day'); 
    newForecast.innerHTML = `<div class="weather-info"> 
             <div class="date">
             <span>${day}</span>
             </div>
             <div class="icon">
             <span>${icon}</span>
             </div>
             <p></p>
             <div class="temperature">
             <span>${temp}</span>
             </div>
             <div class="wind">
             <span>${wind}</span>
             </div>
             <div class="humidity">
             <span>${humidity}</span>
             </div>
         </div>`;
     fdList.appendChild(newForecast);
    }
}

const getWeather = (lat, lon) => {

    // Get the Weather
    var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;    
    console.log(apiUrl);
    fetch(apiUrl)
         .then(response => response.json())
         .then(data => {

             console.log(data);

             // Show the Current Weather Forecast
             displayCurrentWeather(data);

              // Show the 5 Day Weather Forecast
              displayWeatherForecast(data);
         })
}

// Display the name and country
const displayWeather = (weatherData) => {
    document.getElementById('city-name').textContent = `${weatherData.name}, ${weatherData.country}`;

    getWeather(weatherData.lat, weatherData.lon);

}

// Search Text and Search Button

    var cityInput = document.getElementById('cityInput'); 
    var searchButton = document.getElementById('searchButton');

    searchButton.addEventListener("click", function(event){
        event.preventDefault();

        forecast.style.display = 'block';

        var cityValue = document.getElementById('cityInput').value; 

        localStorage.setItem("city", cityValue);

        var savedCities = document.getElementById('saved-cities');

        var historyButton = document.createElement('button'); 
        historyButton.innerHTML = cityValue;
        savedCities.appendChild(historyButton);

        var savedHistoryButtons = document.querySelectorAll("#saved-cities button");

        savedHistoryButtons.forEach(button => button.addEventListener("click", handleClick));

        // When history buttons are clicked this function will play out 

        function handleClick(event) {

            var clickedHistoryButton = event.target;
          var buttonContent = clickedHistoryButton.innerText; // Retrieve the button contents

          console.log("Updated content:", buttonContent);

          tellWeather(buttonContent);

          event.preventDefault();
    }
  
    // Call the getCity function for the search button
    getCity();
  });





