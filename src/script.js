// Scenario 1 - Fuctions
function pickCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#user-city");
  let h2 = document.querySelector("h2");
  h2.innerHTML = inputCity.value;

  //Weather API request when user types the city
  function showWeather(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("h1");
    temperatureElement.innerHTML = `${temperature}°`;

    let humidity = response.data.main.humidity;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${humidity}%`;

    let wind = Math.round(response.data.wind.speed);
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${wind}km/h`;

    let currentIcon = response.data.weather[0].icon;
    let currentIconElement = document.querySelector("#current-icon");
    currentIconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${currentIcon}@2x.png`
    );
  }

  let apiKey = "8faec0e45e93e61e880c60b71662661c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

// Scenario 1 - User's input to form
let form = document.querySelector("#city-form");
form.addEventListener("submit", pickCity);

// Clock and Date - Displays date and time in h3
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novermber",
  "December",
];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let minutes = now.getMinutes();
let hours = now.getHours();

let time = `${hours}:${minutes} ${day}, ${month} ${date}`;

let h3 = document.querySelector("h3");
h3.innerHTML = time;
