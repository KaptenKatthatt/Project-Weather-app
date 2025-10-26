"use strict";

import { forecastSidebar } from "./forecastSidebar.js";
import { ForecastTable } from "./forecastTable.js";

const cityForm = document.querySelector("form");
const card = document.querySelector(".card");

const details = document.querySelector(".details");
const mainLeftEl = document.querySelector(".mainLeft");
const forecastContainer = document.querySelector(".forecast-container");

const backgroundImg = document.querySelector("img.time");
const iconImg = document.querySelector(".icon img");

const forecastTableContainerEl = document.querySelector(
  ".forecastTableContainer"
);
const forecastTableBodyEl = document.querySelector(".weatherTable");
const forecastCardEl = document.querySelector(".forecast-card");

//Update UI
const updateUI = (data) => {
  const { cityDets, weather, forecast } = data;

  //Get local time and local hour
  // const timestamp = weather.dt; //Distribute in app for efficiency?
  // const timezone = weather.timezone;

  let localTime = new Date(weather.dt * 1000 + weather.timezone * 1000);
  const localHour = localTime.getUTCHours();
  /* 
  //update left card
  details.innerHTML = `
        <img class="mt-4" src="https://flagcdn.com/48x36/${cityDets.country.toLowerCase()}.png" alt="Country flag of chosen city">
        <h5 class="my-3 display-6">${cityDets.name}</h5>
        <div class="fs-6">Kl.${localHour}</div>
        <div class="my-3 fs-4">${weather.weather[0].description}</div>
        <div class="display-4 my 4">
          <span>${Math.round(weather.main.temp)}</span>
          <span>&deg;C</span>
        </div>
        <i class="windArrow wi wi-wind from-${weather.wind.deg}-deg mt-3"></i>
         <div class="fs-5">${Math.round(weather.wind.speed)} m/s</div>
        `;
 */
  //update mainLeft Container

  mainLeftEl.innerHTML = `
  
        <img class="mt-4" src="https://flagcdn.com/48x36/${cityDets.country.toLowerCase()}.png" alt="Country flag of chosen city">
        <h5 class="my-3 display-2">${cityDets.name}</h5>
        <div class="fs-5">Kl.${localHour}</div>
        <div class="iconContainer">
        <img src="https://openweathermap.org/img/wn/${
          weather.weather[0].icon
        }@4x.png" alt="Icon of current weather">
        <div class="my-3 fs-4">${weather.weather[0].description}</div>
        <div class="display-4 my 4">
          <span>${Math.round(weather.main.temp)}</span>
          <span>&deg;C</span>
        </div>
          <i class="windArrow wi wi-wind from-${
            weather.wind.deg
          }-deg mt-3 fs-1"></i>
          <div class="fs-5">${Math.round(weather.wind.speed)} m/s</div>
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

  // Render 5 day forecast table
  forecastTableBodyEl.innerHTML = ForecastTable(forecast);

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

  card.classList.remove("d-none");
  forecastCardEl.classList.remove("d-none");
  forecastTableContainerEl.classList.remove("d-none");
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
  // scrollTo(0, 245);
  // scrollTo({ top: 245, behavior: "smooth" });
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
    .then((data) => {
      updateUI(data);
      //Scroll to end for debugging
      scrollTo(0, 1530);
    })
    .catch((err) => console.log(err));
}

//Theme switcher
const toggleButton = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

// Ladda sparat tema från localStorage
const savedTheme = localStorage.getItem("theme") || "light";
htmlElement.setAttribute("data-bs-theme", savedTheme);
toggleButton.textContent =
  savedTheme === "dark" ? "Växla till Dag" : "Växla till Natt";

toggleButton.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  htmlElement.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  toggleButton.textContent =
    newTheme === "dark" ? "Växla till Dag" : "Växla till Natt";
});
