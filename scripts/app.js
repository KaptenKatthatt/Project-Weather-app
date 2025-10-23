"use strict";

import { forecastSidebar } from "./forecastSidebar.js";
import { ForecastTable } from "./forecastTable.js";

const cityForm = document.querySelector("form");
const card = document.querySelector(".card");

const details = document.querySelector(".details");
const forecastContainer = document.querySelector(".forecast-container");

const backgroundImg = document.querySelector("img.time");
const icon = document.querySelector(".icon");
const iconImg = document.querySelector(".icon img");
const windArrow = document.querySelector(".windArrow");

const locationContainer = document.querySelector(".locationContainer");
const currentWeatherContainer = document.querySelector(
  ".currentWeatherContainer"
);
const forecastTable = document.querySelector(".forecastTable");

// console.log(new Date(2024, 2, 10, 2, 30).toString());
// const birthday3 = new Date(1995, 11, 17);
// console.log(birthday3);

//Update UI
const updateUI = (data) => {
  const { cityDets, weather, forecast } = data;

  //Get local time and local hour
  // const timestamp = weather.dt; //Distribute in app for efficiency?
  // const timezone = weather.timezone;

  let localTime = new Date(weather.dt * 1000 + weather.timezone * 1000);
  const localHour = localTime.getUTCHours();

  //update left card
  details.innerHTML = `
        <img class="mt-3" src="https://flagcdn.com/48x36/${cityDets.country.toLowerCase()}.png" alt="Country flag of chosen city">
        <h5 class="my-3">${cityDets.name}</h5>
          <p>Kl.${localHour}</p>
        <div class="my-3">${weather.weather[0].description}</div>
        <div class="display-4 my 4">
          <span>${Math.round(weather.main.temp)}</span>
          <span>&deg;C</span>
        </div>
        <i class="windArrow wi wi-wind from-${weather.wind.deg}-deg"></i>
         <p>${Math.round(weather.wind.speed)} m/s</p>
        `;

  // 18 hour forecast sidebar
  forecastContainer.innerHTML = `
    ${forecastSidebar(forecast.list[0])}
    ${forecastSidebar(forecast.list[2])}
    ${forecastSidebar(forecast.list[4])}
    ${forecastSidebar(forecast.list[6])}

`;

  //update icon images
  const iconSrc = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  iconImg.setAttribute("src", iconSrc);

  // 5 day forecast table(noon every day)
  forecastTable.innerHTML = ForecastTable(forecast, iconSrc);

  //update night/day background
  let timeSrc = Math.round(Date.now() / 1000);
  // console.log("Local time ", timeSrc);
  // console.log("Sunrise", weather.sys.sunrise);

  timeSrc =
    timeSrc > weather.sys.sunrise && timeSrc < weather.sys.sunset
      ? "img/day.svg"
      : "img/night.svg";

  backgroundImg.setAttribute("src", timeSrc);

  //remove d-none if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

//Calls city and weather functions to get data from API
const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.lat, cityDets.lon);
  const forecast = await getForecast(cityDets.lat, cityDets.lon);

  return {
    cityDets, //Om både nyckeln och värdet har samma namn räcker det att man skriver det en gång.
    weather: weather,
    forecast,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Get city value
  const city = cityForm.city.value.trim().toLowerCase();
  cityForm.reset();

  //Update the UI with the new city
  updateCity(city)
    .then((data) => {
      updateUI(data);
      localStorage.setItem("city", city); //Save city in local storage so it shows up next time page is opened.
    })
    .catch((err) => console.log(err));
});
//Check if there is a saved city in localStorage
let savedCity = localStorage.getItem("city");
if (savedCity) {
  updateCity(savedCity)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
