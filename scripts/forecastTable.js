export function ForecastTable(weatherList, icon) {
  // Dagen är 00-21

  //Dygnets lägsta och högsta temp. 00-21
  // Lägsta Ta alla mätpunkter på main.temp_min och plocka ut lägsta
  // Högsta main.temp_max och plocka ut högsta

  // Dygnets nederbörd räknas från sön 08:00 till sön 23:00.
  //function daysRain

  //Vind kl 12.00 på dagen eller högsta vind/byar under dagen
  //function highestWind som tar in alla vindvärden för den dagen och plockar ut det högsta
  // Capitalize first letter, rest lower case
  function capitalizeSv(text) {
    if (!text) return text;
    return (
      text.charAt(0).toLocaleUpperCase("sv-SE") +
      text.slice(1).toLocaleLowerCase("sv-SE")
    );
  }
  //
  let day = new Date(weatherList[6].dt * 1000).toLocaleString("sv-SE", {
    weekday: "long",
  });
  day = capitalizeSv(day);

  return `

<thead>
  <tr>
    <th>
      Dygn
    </th>
    <th>
    <!-- Icon heading, left blank-->
    </th>
    <th>
      L/H
    </th>
    <th>Vind(byvind)</th>
    <th>Nederbörd</th>
  </tr>

</thead>
<tbody class="table-group-divider">
  <tr>
    <td>${day}</td>
    <td>
      <img src="${icon}" alt="Icon of the weather">
    </td>
    <td>${Math.round(weatherList[6].main.temp_min)}/${Math.round(
    weatherList[6].main.temp_max
  )}</td>
    <td>${Math.round(weatherList[6].wind.speed)}(${
    weatherList[6].wind.gust === undefined
      ? "0"
      : Math.round(weatherList[6].wind.gust)
  })</td>
    <td>${
      weatherList[6].rain === undefined
        ? "0"
        : Math.round(weatherList[6].rain["3h"])
    }</td>
  </tr>
</tbody>

`;
}
