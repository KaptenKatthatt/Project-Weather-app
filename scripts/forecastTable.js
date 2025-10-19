export function ForecastTable(weatherList, icon) {
  // Dygnets nederbörd räknas från sön 08:00 till sön 23:00.
  //Vind kl 12.00 på dagen
  return `

<thead>
  <tr>
    <th>
      Dygn
    </th>
    <th>
      weatherIcon
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
    <td>Idag</td>
    <td>
      <img src="${icon}" alt="Icon of the weather">
    </td>
    <td>${Math.round(weatherList[0].main.temp_min)}/${Math.round(
    weatherList[0].main.temp_max
  )}</td>
    <td>${Math.round(weatherList[0].wind.speed)}(${Math.round(
    weatherList[0].wind.gust
  )})</td>
    <td>${Math.round(weatherList[0].rain["3h"])}</td>
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
