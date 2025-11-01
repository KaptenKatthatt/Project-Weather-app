import { getLang } from "./forecast.js";

export function mainRightForecast(weatherListItem, timezone) {
  const date = new Date((weatherListItem.dt + timezone) * 1000);
  /*   const weekday = date.toLocaleString("sv-SE", { weekday: "long" }); */

  function precipitationAmount() {
    if (weatherListItem.rain) {
      return weatherListItem.rain["3h"].toFixed(1);
    } else if (weatherListItem.snow) {
      return (weatherListItem.snow["3h"] * 10).toFixed(1);
    } else {
      return 0;
    }
  }

  function precipitationIcon() {
    if (weatherListItem.rain) {
      return `<i class="wi wi-rain"></i>`;
    } else if (weatherListItem.snow) {
      return `<i class="wi wi-snow"></i>`;
    } else {
      return `<i class="wi wi-rain"></i>`;
    }
  }

  const hour = date.getHours();
  let dayPeriod;
  if (hour >= 5 && hour < 9) {
    dayPeriod = getLang() === "sv" ? "Morgon" : "Morning";
  } else if (hour >= 9 && hour < 12) {
    dayPeriod = getLang() === "sv" ? "Middag" : "Noon";
  } else if (hour >= 12 && hour < 18) {
    dayPeriod = getLang() === "sv" ? "Eftermiddag" : "Afternoon";
  } else if (hour >= 18 && hour < 22) {
    dayPeriod = getLang() === "sv" ? "Kväll" : "Evening";
  } else {
    dayPeriod = getLang() === "sv" ? "Natt" : "Night";
  }

  //Returns a column of weather info based on incoming time
  return `
  <div 
  class="tableColumn p-3 fs-5">
    <td>
        <h6 class="fs-5 fw-bold">${dayPeriod}</h6>
    </td>
    <td>
        <img src="https://openweathermap.org/img/wn/${
          weatherListItem.weather[0].icon
        }@2x.png" alt="Icon of the days noon weather" class="foreCastIcon">

    </td>
    <!-- Temp -->
    <td>
      <p class="fw-bold mt-3 fs-3">${Math.round(
        weatherListItem.main.temp
      )}&deg</p>
      <!-- Feels like -->
      <p class="mt-4">${
        getLang() === "sv" ? "Känns som" : "Feels like"
      } ${Math.round(weatherListItem.main.feels_like)}&deg</p>
      </td>
      <td>
      <i class="fs-1 mt-5 windArrow wi wi-wind from-${
        weatherListItem.wind.deg
      }-deg"></i>
          <p>
        ${Math.round(weatherListItem.wind.speed)}
        <!-- If gust show, else none -->
        ${
          weatherListItem.wind.gust === undefined
            ? ""
            : `(${Math.round(weatherListItem.wind.gust)})`
        }
        </p>
      </td>   
      <td>
      <p class="precipitationIcon mt-5 fs-1">
          ${precipitationIcon()}
        </p>
      <p class="precipitationChance">
        ${
          weatherListItem.pop === undefined
            ? "0%"
            : Math.round(weatherListItem.pop) * 100
        }%
      </p>
      <p class="precipitationAmount">
        ${precipitationAmount()}mm
      </p>
    </td>
  </div>
    `;
}
