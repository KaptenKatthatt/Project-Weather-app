export function mainRightForecast(weatherListItem, timezone) {
  const date = new Date((weatherListItem.dt + timezone) * 1000);
  /*   const weekday = date.toLocaleString("sv-SE", { weekday: "long" }); */

  const hour = date.getHours();
  let dayPeriod;
  if (hour >= 5 && hour < 9) {
    dayPeriod = "morgon";
  } else if (hour >= 9 && hour < 12) {
    dayPeriod = "middag";
  } else if (hour >= 12 && hour < 18) {
    dayPeriod = "eftermiddag";
  } else if (hour >= 18 && hour < 22) {
    dayPeriod = "kväll";
  } else {
    dayPeriod = "natt";
  }

  //Returns a column of weather info based on incoming time
  return `
  <tc class="p-3 fs-5">
    <td>
        <h6 class="fs-5 fw-bold text-capitalize">${dayPeriod}</h6>
    </td>
    <td>
   <img src="https://openweathermap.org/img/wn/${
     weatherListItem.weather[0].icon
   }@2x.png" alt="Icon of the days noon weather">
    </td>
    <!-- Temp -->
    <td>
      <p class="fw-bold">${Math.round(weatherListItem.main.temp)}&deg</p>
      <!-- Feels like -->
      <p>Känns som ${Math.round(weatherListItem.main.feels_like)}&deg</p>
      </td>
      <td>
          <p>
        ${Math.round(weatherListItem.wind.speed)}
        <!-- If gust show, else none -->
        ${
          weatherListItem.wind.gust === undefined
            ? ""
            : `(${Math.round(weatherListItem.wind.gust)})`
        }
        </p>
        <i class="fs-1 windArrow wi wi-wind from-${
          weatherListItem.wind.deg
        }-deg"></i>
      </td>   
      <td>
      <p class="">
        ${
          weatherListItem.rain === undefined
            ? "0"
            : Math.round(weatherListItem.rain["3h"])
        }mm
      </p>
    </td>
  </tc>


    `;
}
