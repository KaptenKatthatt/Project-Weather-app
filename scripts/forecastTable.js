export function ForecastTable(weatherList, icon) {
  // Dagen är 00-21

  //Dygnets lägsta och högsta temp. 00-21
  // Lägsta Ta alla mätpunkter på main.temp_min och plocka ut lägsta
  // Högsta main.temp_max och plocka ut högsta

  // Dygnets nederbörd räknas från sön 08:00 till sön 23:00.
  //function daysRain

  //Vind: högsta vind/byar under dagen
  //function highestWind som tar in alla vindvärden för den dagen och plockar ut det högsta

  //funktion som ska returnera alla mätningar för en dag och sen kolla max och min temp, medelvind och maxvind och summera nederbörd

  //Math.max(...arrayMedTemp)
  // Math.min(...arrayMedTemp/Vind)

  //nederbördsArray.reduce för att slå ihop alla regnvärden för en dag.

  //Välj alla mätningar från kl 2-23, 8st.

  //Välj alla mätningar där day är day+1 och

  // Capitalize first letter, rest lower case
  function capitalizeSv(text) {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  //
  let day = new Date(
    (weatherList.list[6].dt + weatherList.city.timezone) * 1000
  ).toLocaleString("sv-SE", {
    weekday: "long",
  });

  day = capitalizeSv(day);

  function extractFullDay() {
    // let dayPeriod = new Date(weatherList.dt);
    const hourArray = [];
    for (let i = 0; i < 10; i++) {
      // let tempHour = 0;
      let hour = new Date(
        (weatherList.list[i].dt + weatherList.city.timezone) * 1000
      ).getUTCHours();
      console.log("Hour", hour);
      let date = new Date(
        (weatherList.list[i].dt + weatherList.city.timezone) * 1000
      ).getUTCDate();
      console.log("Date", date);
      let today = new Date(
        (weatherList.list[i].dt + weatherList.city.timezone) * 1000
      ).getDate();
      console.log("Today", today);
      // hourArray.push(hour);

      // console.log("HourArray", hourArray);
    }
    return;
  }

  console.log(extractFullDay());
  return;
  `
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
    <td>${Math.round(weatherList.list[6].main.temp_min)}/${Math.round(
    weatherList.list[6].main.temp_max
  )}</td>
    <td>${Math.round(weatherList.list[6].wind.speed)}(${
    weatherList.list[6].wind.gust === undefined
      ? "0"
      : Math.round(weatherList.list[6].wind.gust)
  })</td>
    <td>${
      weatherList.list[6].rain === undefined
        ? "0"
        : Math.round(weatherList.list[6].rain["3h"])
    }</td>
  </tr>
</tbody>

`;
}
