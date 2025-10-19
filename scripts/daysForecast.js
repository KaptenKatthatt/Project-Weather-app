function daysForecast(weatherListItem) {
  return `
    <!-- Time & Date -->
  <p>${forecast.list[timeOfDay].dt_txt}</p>
  <!-- Temp -->
  <p>Temp: ${Math.round(forecast.list[timeOfDay].main.temp)}&deg;C</p>
  <!-- Feels like -->
  <p>Känns som ${Math.round(forecast.list[timeOfDay].main.feels_like)}</p>
  <!-- If rain, & chance rain -->
  Regn ${
    forecast.list[timeOfDay].pop === undefined
      ? "0mm"
      : forecast.list[timeOfDay].pop
  }mm
  <p>
    Vind ${forecast.list[timeOfDay].wind.deg}&deg;
  </p>
  <p>Hastighet ${Math.round(forecast.list[timeOfDay].wind.speed)}
  <!-- check if gust -->
  ${
    forecast.list[timeOfDay].wind.gust === undefined
      ? ""
      : `(${Math.round(forecast.list[timeOfDay].wind.gust)})`
  } m/s</p>
  <i class="windArrow wi wi-wind from-${
    forecast.list[timeOfDay].wind.deg
  }-deg"></i>
    
    `;
}
