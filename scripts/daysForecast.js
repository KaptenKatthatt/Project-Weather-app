export function daysForecast(weatherListItem) {
  return `
  <!-- Time & Date -->
  <p>${weatherListItem.dt_txt}</p>
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
  <p>
    Vind ${weatherListItem.wind.deg}&deg;
  </p>
  <p>Vind ${Math.round(weatherListItem.wind.speed)}
  <!-- check if gust -->
  ${
    weatherListItem.wind.gust === undefined
      ? ""
      : `(${Math.round(weatherListItem.wind.gust)})`
  } m/s</p>
  <i class="windArrow wi wi-wind from-${weatherListItem.wind.deg}-deg"></i>
    
    `;
}
