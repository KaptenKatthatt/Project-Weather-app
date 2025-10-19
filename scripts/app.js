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

/* //Wind arrow transformation
function windArrowDir(deg) {
  <i class="windArrow wi wi-wind towards-n"></i>;
} */

//Update UI
const updateUI = (data) => {
  const { cityDets, weather, forecast } = data;
  //Get local time and local hour
  const timestamp = weather.dt;
  const timezone = weather.timezone;
  let localTime = new Date(timestamp * 1000 + timezone * 1000);
  const localHour = localTime.getUTCHours();
  //Location
  /*  locationContainer.innerHTML = `<h3 class="my-3">${cityDets.name}</h3>`;
  //Current weather

  currentWeatherContainer.innerHTML += `
  <p>Kl. ${localHour}</p>
  <span>${Math.round(weather.main.temp)}&deg;</span>
  Känns som ${Math.round(weather.main.feels_like)}&deg;
  `; */

  //update details template
  details.innerHTML = `
        <h5 class="my-3">${cityDets.name}</h5>
          <p>Kl. ${localHour}</p>
        <div class="my-3">${weather.weather[0].description}</div>
        <div class="display-4 my 4">
          <span>${Math.round(weather.main.temp)}</span>
          <span>&deg;C</span>
        </div>
        <i class="windArrow wi wi-wind from-${weather.wind.deg}-deg"></i>
         <p>${Math.round(weather.wind.speed)} m/s</p>
        `;

  // 5 day forecast presentation
  forecastContainer.innerHTML = `
  <h5 class="my-3">5 day </h5>
  <!-- Time & Date -->
  <p>${forecast.list[0].dt_txt}</p>
  <!-- Temp -->
  <p>Temp: ${Math.round(forecast.list[0].main.temp)}&deg;C</p>
  <!-- Feels like -->
  <p>Känns som ${Math.round(forecast.list[0].main.feels_like)}</p>
  <!-- If rain, & chance rain -->
  Regn ${forecast.list[0].pop === undefined ? "0mm" : forecast.list[0].pop}mm
  <br><br>
  Vind nu 
  Vinkel ${weather.wind.deg}&deg;
  Hastighet ${weather.wind.speed}(${weather.wind.gust}) m/s
<i class="windArrow wi wi-wind from-${weather.wind.deg}-deg"></i>
  `;
  /* 

    <p>% chance for rain ${forecast.list[0].pop}</p>
  <p>mm of rain ${forecast.list[0].rain}</p>


  <p>${forecast.list[8].dt_txt}</p>
  <p>Temp: ${Math.round(forecast.list[8].main.temp)}</p>
    <p>${forecast.list[16].dt_txt}</p>
  <p>Temp: ${Math.round(forecast.list[16].main.temp)}</p>
      <p>${forecast.list[24].dt_txt}</p>
  <p>Temp: ${Math.round(forecast.list[24].main.temp)}</p>
    <p>${forecast.list[32].dt_txt}</p> emp)}</p> 
 */

  //update icon images
  const iconSrc = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  iconImg.setAttribute("src", iconSrc);
  //update night/day background
  let timeSrc = Math.round(Date.now() / 1000);
  console.log("Local time ", timeSrc);
  console.log("Sunrise", weather.sys.sunrise);
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
  console.log(cityDets.lat, cityDets.lon);

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

let savedCity = localStorage.getItem("city");
if (savedCity) {
  updateCity(savedCity)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
