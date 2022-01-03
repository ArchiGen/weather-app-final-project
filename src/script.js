// Return city value
function search(city) {
  let apiKey = "8faec0e45e93e61e880c60b71662661c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

// Handling submit button
function pickCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#user-city");
  let h2 = document.querySelector("h2");
  h2.innerHTML = inputCity.value;
  search(inputCity.value);
}

//calculate the date of last weather update
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

//Forecast weather
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecastWeather");
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="row g-0 forecast">
  <div class="col-4 data" >${formatDay(forecastDay.dt)}</div>
  <div class="col-4 data"><strong>${Math.round(
    forecastDay.temp.day
  )}°</strong>/${Math.round(forecastDay.temp.night)}°C</div>
  <div class="col-4 data"><img src="http://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png" height="35px"></div>
  </div>`;

      forecastElement.innerHTML = forecastHTML;
    }
  });
}

//Getting coordinates
function getForecast(coordinates) {
  let apiKey = "8faec0e45e93e61e880c60b71662661c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric
`;
  axios.get(apiUrl).then(displayForecast);
}

//Weather API request when user types the city

function showWeather(response) {
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h1");
  temperatureElement.innerHTML = `${temperature}°`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}m/h`;

  let currentIcon = response.data.weather[0].icon;
  let currentIconElement = document.querySelector("#current-icon");
  currentIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${currentIcon}@2x.png`
  );

  getForecast(response.data.coord);
}

///////////////////////////////////////////////////////////////
// Temperature conversion
//Celcius button
function showCelcius() {
  temperatureElement.innerHTML = `${temperature}°`;
  celcius.classList.add("active");
  farenheit.classList.remove("active");
}

let celcius = document.querySelector("#celc");
celcius.addEventListener("click", showCelcius);

//Farenheit button
function convertToFarenheit() {
  let temperatureFarenheit = (temperature * 9) / 5 + 32;
  let temperatureFarenheitRound = Math.round(temperatureFarenheit);
  temperatureElement.innerHTML = `${temperatureFarenheitRound}°`;
  farenheit.classList.add("active");
  celcius.classList.remove("active");
}

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", convertToFarenheit);

/////////////////////////////////////////////////////////////
// Global
let temperature = null;
let temperatureElement = document.querySelector("h1");
let form = document.querySelector("#city-form");
form.addEventListener("submit", pickCity);
search("London");
displayForecast();
showCelcius();
///////////////////////////////////////////////////////////////

//END
