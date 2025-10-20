export function ForecastTable(weatherList, icon) {
  // Dygnets nederbörd räknas från sön 08:00 till sön 23:00.
  //function daysRain

  //Vind kl 12.00 på dagen eller högsta vind/byar under dagen
  //function highestWind som tar in alla vindvärden för den dagen och plockar ut det högsta

  return `

<thead>
  <tr>
    <th>
      Dygn
    </th>
    <th>
      
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
    <td>${weatherList[0].dt_txt}</td>
    <td>
      <img src="${icon}" alt="Icon of the weather">
    </td>
    <td>${Math.round(weatherList[0].main.temp_min)}/${Math.round(
    weatherList[0].main.temp_max
  )}</td>
    <td>${Math.round(weatherList[0].wind.speed)}(${
    weatherList[0].wind.gust === undefined
      ? "0"
      : Math.round(weatherList[0].wind.gust)
  })</td>
    <td>${
      weatherList[0].rain === undefined
        ? "0"
        : Math.round(weatherList[0].rain["3h"])
    }</td>
  </tr>

  <tr>
    <td>Idag+1</td>
    <td>Idag+1</td>
    <td>Idag+1</td>
    <td>Idag+1</td>
    <td>Idag+1</td>
  </tr>
  <tr>
    <td>Idag+2</td>
    <td>Idag+2</td>
    <td>Idag+2</td>
    <td>Idag+2</td>
    <td>Idag+2</td>
  </tr>
  <tr>
    <td>Idag+3</td>
    <td>Idag+3</td>
    <td>Idag+3</td>
    <td>Idag+3</td>
    <td>Idag+3</td>
  </tr>
  <tr>
    <td>Idag+4</td>
    <td>Idag+4</td>
    <td>Idag+4</td>
    <td>Idag+4</td>
    <td>Idag+4</td>
  </tr>
</tbody>

`;
}
