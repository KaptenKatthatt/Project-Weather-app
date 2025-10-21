export function forecastSidebar(weatherListItem) {
  const date = new Date(weatherListItem.dt * 1000);
  const weekday = date.toLocaleString("sv-SE", { weekday: "long" });

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

  // let localDate = date.toLocaleString("sv-SE", {
  //   day: "2-digit",
  //   month: "2-digit",
  // });

  return `
  <!-- Weekday and dayperiod -->
  <h5 class="mt-3 fw-bold">${weekday}</h5>
  <h6>${dayPeriod}</h6>
  <!-- Temp -->
  <p>Temp: ${Math.round(weatherListItem.main.temp)}&deg;C</p>
  <!-- Feels like -->
  <p>Känns som ${Math.round(weatherListItem.main.feels_like)}&deg;C</p>
  <!-- If rain show, else 0 -->
  Regn ${
    weatherListItem.rain === undefined
      ? "0"
      : Math.round(weatherListItem.rain["3h"])
  }mm
  <p class="mt-2">
  Vind<br> 
  ${Math.round(weatherListItem.wind.speed)}
  <!-- If gust show, else none -->
  ${
    weatherListItem.wind.gust === undefined
      ? ""
      : `(${Math.round(weatherListItem.wind.gust)})`
  } m/s
  </p>
  <p>  <i class=" windArrow wi wi-wind from-${
    weatherListItem.wind.deg
  }-deg"></i>
</p>
 
    `;
}
