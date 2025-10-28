"use strict";

import { mainRightForecast } from "./mainRightForecast.js";
import { ForecastTable } from "./forecastTable.js";
import {
  getCity,
  getWeather,
  getForecast,
  setUnits,
  getUnits,
} from "./forecast.js";

const cityForm = document.querySelector("form");

const mainLeftEl = document.querySelector(".mainLeft");
const mainRightEl = document.querySelector(".mainRight");

const forecastTableContainerEl = document.querySelector(
  ".forecastTableContainer"
);
const forecastTableBodyEl = document.querySelector(".weatherTable");
const windUnitEl = document.querySelector(".windUnit");
const mainWeatherContainerEl = document.querySelector(".mainWeatherContainer");
const htmlElement = document.documentElement;
const siteContainer = document.querySelector(".container");

//Toolbar
const themeToggleBtn = document.getElementById("theme-toggle");
const tempToggleBtn = document.querySelector(".tempSwitchContainer");
const langSwitchBtn = document.querySelector(".langSwitchContainer");

// Ladda initialt tema från localStorage (eller sätt till light om inget finns)
let currentTheme = localStorage.getItem("theme") || "light";
htmlElement.setAttribute("data-bs-theme", currentTheme);
themeToggleBtn.innerHTML =
  currentTheme === "dark"
    ? `
<i class="wi wi-day-sunny wi-3x"></i> 
Växla till Dag 
<i class="wi wi-day-sunny wi-3x"></i>`
    : `
<i class="wi wi-moon-alt-waning-crescent-2 wi-3x"></i>
Växla till Natt
<i class="wi wi-moon-alt-waning-crescent-2 wi-3x"></i>`;

// Event listener för themeToggleBtn, utanför updateUI
themeToggleBtn.addEventListener("click", () => {
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  currentTheme = newTheme; // Uppdatera global variabel
  htmlElement.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeToggleBtn.innerHTML =
    newTheme === "dark"
      ? `
<i class="wi wi-day-sunny wi-3x"></i> 
Växla till Dag 
<i class="wi wi-day-sunny wi-3x"></i>`
      : `
<i class="wi wi-moon-alt-waning-crescent-2 wi-3x"></i>
Växla till Natt
<i class="wi wi-moon-alt-waning-crescent-2 wi-3x"></i>`;
});

let currentData = null;
let currentCity = null;
//Update UI
const updateUI = (data) => {
  const { cityDets, weather, forecast } = data;
  currentData = data;
  currentCity = cityDets.local_names?.sv ?? cityDets.name;
  //Get local time and local hour

  const localTime = new Date((weather.dt + weather.timezone) * 1000);
  const timezone = weather.timezone;
  const localHour = localTime.getUTCHours();

  //update mainLeft Container
  const date = new Date((weather.dt + weather.timezone) * 1000);
  const weekday = date.toLocaleString("sv-SE", { weekday: "long" });
  /* 
          cityDets.local_names
            ? cityDets.local_names.sv
              ? cityDets.local_names.sv
              : cityDets.name
            : cityDets.name
 */
  mainLeftEl.innerHTML = `
        <img class="mt-4" src="https://flagcdn.com/48x36/${cityDets.country.toLowerCase()}.png" alt="Country flag of ${
    cityDets.name
  }">
        <h5 class="my-3 mx-2 display-4">${
          cityDets.local_names?.sv ?? cityDets.name
        }</h5>
        <div class="fs-5">${weekday}</div>
        <div class="fs-5">kl.${localHour}</div>
        <div class="iconContainer">
        <img src="https://openweathermap.org/img/wn/${
          weather.weather[0].icon
        }@4x.png" alt="Icon of current weather">
        <div class="my-3 fs-4">${weather.weather[0].description}</div>
        <div class="display-4 my 4">
          <span>${Math.round(weather.main.temp)}&deg;${
    getUnits() === "metric" ? "C" : "F"
  }</span>
        </div>
          <i class="windArrow wi wi-wind from-${
            weather.wind.deg
          }-deg mt-3 fs-1"></i>
          <div class="fs-5">${Math.round(weather.wind.speed)} ${
    getUnits() === "metric" ? "m/s" : "mph"
  }</div>
        `;

  // 18 hour forecast sidebar
  mainRightEl.innerHTML = `
    ${mainRightForecast(forecast.list[0], timezone)}
    ${mainRightForecast(forecast.list[2], timezone)}
    ${mainRightForecast(forecast.list[4], timezone)}
    ${mainRightForecast(forecast.list[6], timezone)}
`;
  // Render 5 day forecast table
  forecastTableBodyEl.innerHTML = ForecastTable(forecast);

  // console.log("Local time ", timeSrc);
  const localUTCTime = (weather.dt + weather.timezone) * 1000;
  // console.log("Localtime", localUTCTime);
  // console.log("Sunrise", weather.sys.sunrise * 1000);
  // console.log("Sunset", weather.sys.sunset * 1000);
  const sunrise = (weather.sys.sunrise + weather.timezone) * 1000;
  const sunset = (weather.sys.sunset + weather.timezone) * 1000;

  // Update theme based on local time
  if (localUTCTime >= sunrise && localUTCTime <= sunset) {
    currentTheme = "light";
  } else {
    currentTheme = "dark";
  }

  htmlElement.setAttribute("data-bs-theme", currentTheme);
  localStorage.setItem("theme", currentTheme);
  themeToggleBtn.innerHTML =
    currentTheme === "dark"
      ? `
    <i class="wi wi-day-sunny wi-3x"></i> 
    Växla till Dag 
    <i class="wi wi-day-sunny wi-3x"></i>`
      : `
    <i class="wi wi-moon-alt-waning-crescent-2 wi-3x"></i>
    Växla till Natt
    <i class="wi wi-moon-alt-waning-crescent-2 wi-3x"></i>`;

  //Remove d-none class after first search
  mainWeatherContainerEl.classList.remove("d-none");
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
    .catch((err) => {
      mainWeatherContainerEl.classList.add("d-none");
      forecastTableContainerEl.classList.add("d-none");
      siteContainer.innerHTML += `
      <div class="alert alert-warning" role="alert">
        <h3>That city couldn't be found. Please try again.</h3>
      </div>
      `;
      // console.log("Testfel", err);
    });
});
//Check if there is a saved city in localStorage
let savedCity = localStorage.getItem("city");
if (savedCity) {
  updateCity(savedCity)
    .then((data) => {
      updateUI(data);
      //Scroll to end for debugging
      // scrollTo(0, 1530);
    })
    .catch((err) => console.log(err));
}

tempToggleBtn.addEventListener("click", () => {
  getUnits() === "metric" ? setUnits("imperial") : setUnits("metric");
  console.log(getUnits());
  windUnitEl.innerText = getUnits() === "metric" ? "m/s" : "mph";
  if (currentCity) {
    updateCity(currentCity)
      .then((data) => updateUI(data))
      .catch((err) => console.log(err));
  }
});
