export function mainRightForecast(weatherListItem, timezone) {
  const date = new Date((weatherListItem.dt + timezone) * 1000);
  /*   const weekday = date.toLocaleString("sv-SE", { weekday: "long" }); */

  function precipitationAmount() {
    if (weatherListItem.rain) {
      return Math.round(weatherListItem.rain["3h"] * 10) / 10;
    } else if (weatherListItem.snow) {
      return Math.round((weatherListItem.snow["3h"] * 10) / 10);
    } else {
      return 0;
    }
  }

  const hour = date.getHours();
  let dayPeriod;
  if (hour >= 5 && hour < 9) {
    dayPeriod = "Morgon";
  } else if (hour >= 9 && hour < 12) {
    dayPeriod = "Middag";
  } else if (hour >= 12 && hour < 18) {
    dayPeriod = "Eftermiddag";
  } else if (hour >= 18 && hour < 22) {
    dayPeriod = "Kväll";
  } else {
    dayPeriod = "Natt";
  }

  //Returns a column of weather info based on incoming time
  return `
  <tc 
  class="tableColumn p-3 fs-5">
    <td>
        <h6 class="fs-5 fw-bold">${dayPeriod}</h6>
    </td>
    <td>
   <img src="https://openweathermap.org/img/wn/${
     weatherListItem.weather[0].icon
   }@2x.png" alt="Icon of the days noon weather">
    </td>
    <!-- Temp -->
    <td>
      <p class="fw-bold mt-3 fs-3">${Math.round(
        weatherListItem.main.temp
      )}&deg</p>
      <!-- Feels like -->
      <p class="mt-4">Känns som ${Math.round(
        weatherListItem.main.feels_like
      )}&deg</p>
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
          ${
            weatherListItem.rain === undefined
              ? `<i class="wi wi-rain"></i>`
              : weatherListItem.rain
              ? `<i class="wi wi-rain"></i>`
              : `<i class="wi wi-snow"></i>`
          }
        </p>
      <p class="rainChance">
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
  </tc>


    `;
}
