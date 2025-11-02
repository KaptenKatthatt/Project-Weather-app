import { mainRightForecast } from "./mainRightForecast.js";
import { ForecastTable } from "./forecastTable.js";
import {
  getCity,
  getWeather,
  getForecast,
  setUnits,
  getUnits,
  setLang,
  getLang,
} from "./forecast.js";
import { currentWeather } from "./currentWeather.js";
import { translations, DOM } from "./constants.js";

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
const tempToggleBtn = document.querySelector(".unitToggleBtn");
const langSwitchBtn = document.querySelector(".langToggleBtn");

const forecastTableTitleEl = document.querySelector(".forecastTableTitle");
const dayHeadingEl = document.querySelector(".dayHeading");
const windHeadingEl = document.querySelector(".windHeading");
const precHeadingEl = document.querySelector(".precHeading");

//APP INITIALIZATION
// Load theme from storage or set to light of none is found
let currentTheme = localStorage.getItem("theme") || "light";
htmlElement.setAttribute("data-bs-theme", currentTheme);

localStorage.getItem("theme") === "light"
  ? themeToggleBtn.setAttribute("checked", "checked")
  : themeToggleBtn.removeAttribute("checked");

themeToggleBtn.innerHTML =
  currentTheme === "dark"
    ? `<i class="wi wi-day-sunny wi-3x"></i>`
    : `<i class="wi wi-moon-alt-waning-crescent-2 wi-3x"></i>`;

themeToggleBtn.addEventListener("click", () => {
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  currentTheme = newTheme;
  htmlElement.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  themeToggleBtn.innerHTML =
    newTheme === "dark"
      ? `<i class="wi wi-day-sunny wi-3x"></i>`
      : `<i class="wi wi-moon-alt-waning-crescent-2 wi-3x"></i>`;
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
  const localHour =
    getLang() === "sv"
      ? localTime.getUTCHours()
      : localTime.toLocaleTimeString("en", { hour: "numeric", hour12: true });

  mainLeftEl.innerHTML = currentWeather(cityDets, localHour, weather);

  // 18 hour forecast sidebar
  mainRightEl.innerHTML = `
    ${mainRightForecast(forecast.list[0], timezone)}
    ${mainRightForecast(forecast.list[2], timezone)}
    ${mainRightForecast(forecast.list[4], timezone)}
    ${mainRightForecast(forecast.list[6], timezone)}
`;
  // Render 5 day forecast table
  forecastTableBodyEl.innerHTML = ForecastTable(forecast);

  const localUTCTime = (weather.dt + weather.timezone) * 1000;
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
    <i class="wi wi-day-sunny wi-3x"></i>`
      : `
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
    cityDets,
    weather,
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
    .catch((err) => {
      mainWeatherContainerEl.classList.add("d-none");
      forecastTableContainerEl.classList.add("d-none");
      siteContainer.innerHTML += `
      <div class="alert alert-warning" role="alert">
        <h3>That city could not be found. Please try again.</h3>
      </div>
      `;
      console.log(err);
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

// Helper function to update all table headings
const updateTableHeadings = () => {
  const lang = getLang();
  forecastTableTitleEl.innerText = translations[lang].forecastTableTitle;
  dayHeadingEl.innerText = translations[lang].dayHeading;
  windHeadingEl.innerHTML = translations[lang].windHeading;
  precHeadingEl.innerHTML = translations[lang].precHeading;
};

//Initialize forecast table language
updateTableHeadings();

//Click event listener for temp toggle switch
tempToggleBtn.addEventListener("click", () => {
  getUnits() === "metric" ? setUnits("imperial") : setUnits("metric");
  // Update GUI only if there is a city selected.
  if (localStorage.getItem("city") !== null) {
    windUnitEl.innerText = getUnits() === "metric" ? "m/s" : "mph";
    updateCity(currentCity)
      .then((data) => updateUI(data))
      .catch((err) => console.log(err));
  }
});

// Click event listener for language switch
langSwitchBtn.addEventListener("click", () => {
  getLang() === "sv" ? setLang("en") : setLang("sv");
  // Update GUI only if there is a city selected.
  if (localStorage.getItem("city") !== null) {
    updateTableHeadings();
    updateCity(currentCity)
      .then((data) => updateUI(data))
      .catch((err) => console.log(err));
  }
});
