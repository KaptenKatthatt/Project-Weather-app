import { getLang, getUnits } from "./forecast.js";

export function currentWeather(cityDets, localHour, weather) {
  const date = new Date((weather.dt + weather.timezone) * 1000);
  const weekday = date.toLocaleString(getLang(), { weekday: "long" });

  return `<img class="mt-4" src="https://flagcdn.com/48x36/${cityDets.country.toLowerCase()}.png" alt="Country flag of ${
    cityDets.name
  }">
          <h5 class="my-3 mx-2 display-4">${
            getLang() === "sv"
              ? cityDets.local_names?.sv ?? cityDets.name
              : cityDets.name
          }</h5>
          <div class="fs-5 text-capitalize">${weekday}</div>
          <div class="fs-5"> ${
            getLang() === "sv" ? `kl. ${localHour}` : `${localHour}`
          }
          </div>
          <div class="iconContainer">
          <img src="https://openweathermap.org/img/wn/${
            weather.weather[0].icon
          }@4x.png" alt="Icon of current weather">
          <div class="my-3 fs-4 text-capitalize">${
            weather.weather[0].description
          }</div>
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
}
