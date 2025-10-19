const cityForm = document.querySelector("form");
const card = document.querySelector(".card");

const details = document.querySelector(".details");
const forecastContainer = document.querySelector(".forecast-container");

const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  //   const cityDets = data.cityDets;
  //   const weather = data.weather;

  // Destructure properties för att spara dom i de två variablerna inuti {}, hämtar dom från data. Gör samma sak som ovan.
  const { cityDets, weather, forecast } = data;
  // let lang = sv; Gör en if check på om där finns local_names först
  //update details template
  details.innerHTML = `
        <h5 class="my-3">${cityDets.name}</h5>
        <div class="my-3">${weather.weather[0].description}</div>
        <div class="display-4 my 4">
          <span>${Math.round(weather.main.temp)}</span>
          <span>&deg;C</span>
        </div>`;
  // 5 day forecast presentation
  forecastContainer.innerHTML = `
  <h5 class="my-3">5 day </h5>
  <p>${forecast.list[0].dt_txt}</p>
  <p>Temp: ${Math.floor(forecast.list[0].main.temp)}</p>
  <p>% chance for rain ${forecast.list[0].pop}</p>
  <p>mm of rain ${forecast.list[0].rain}</p>
 
  `;
  /* 
  <p>${forecast.list[8].dt_txt}</p>
  <p>Temp: ${Math.floor(forecast.list[8].main.temp)}</p>
    <p>${forecast.list[16].dt_txt}</p>
  <p>Temp: ${Math.floor(forecast.list[16].main.temp)}</p>
      <p>${forecast.list[24].dt_txt}</p>
  <p>Temp: ${Math.floor(forecast.list[24].main.temp)}</p>
    <p>${forecast.list[32].dt_txt}</p> emp)}</p> 
 */

  //update the night/day & icon images
  const iconSrc = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  icon.setAttribute("src", iconSrc);

  let timeSrc = Math.floor(Date.now() / 1000);
  console.log("Local time ", timeSrc);
  console.log("Sunrise", weather.sys.sunrise);
  timeSrc =
    timeSrc > weather.sys.sunrise && timeSrc < weather.sys.sunset
      ? "img/day.svg"
      : "img/night.svg";

  time.setAttribute("src", timeSrc);

  //remove d-none if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

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
