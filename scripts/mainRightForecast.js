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
  <tc>
    <td>
        <h6>${dayPeriod}</h6>
    </td>
    <td>
      icon
    </td>
    <!-- Temp -->
    <td>
      <p class="fs-6">${Math.round(weatherListItem.main.temp)}&deg;C</p>
      <!-- Feels like -->
      <p class="fs-6">Känns som ${Math.round(
        weatherListItem.main.feels_like
      )}&deg;C</p>
      </td>
      <td>
          <p class="">
        ${Math.round(weatherListItem.wind.speed)}
        <!-- If gust show, else none -->
        ${
          weatherListItem.wind.gust === undefined
            ? ""
            : `(${Math.round(weatherListItem.wind.gust)})`
        }

        </p>
        <i class=" windArrow wi wi-wind from-${
          weatherListItem.wind.deg
        }-deg mb-2"></i>
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
