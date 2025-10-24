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

  //Välj upp till åttta mätningar från varje dag, beroende på hur många där är. Gruppera dom efter datum så jag kan summera regnmängd.

  /* {
    datum:
    tid:
  }
 */

  //GLOBAL VARIABLES
  //Local today is the local date on the searched city.
  const localToday = new Date(
    (weatherList.list[0].dt + weatherList.city.timezone) * 1000
  );
  const localTimezone = weatherList.city.timezone;

  const localTomorrow = new Date();
  localTomorrow.setDate(localToday.getDate() + 1);
  const dayAfterLocalTomorrow = new Date();
  dayAfterLocalTomorrow.setDate(localToday.getDate() + 2);
  const inThreeDays = new Date();
  inThreeDays.setDate(localToday.getDate() + 3);
  const inFourDays = new Date();
  inFourDays.setDate(localToday.getDate() + 4);

  let localTodayWeatherArr = getDayWeather(
    weatherList.list,
    localToday,
    localTimezone
  );
  let localTomorrowWeatherArr = getDayWeather(
    weatherList.list,
    localTomorrow,
    localTimezone
  );
  let dayAfterLocalTomorrowWeatherArr =
    (weatherList.list, dayAfterLocalTomorrow, localTimezone);
  let inThreeDaysWeatherArr = getDayWeather(
    weatherList.list,
    inThreeDays,
    localTimezone
  );
  let inFourDaysWeatherArr = getDayWeather(
    weatherList.list,
    inFourDays,
    localTimezone
  );

  //GLOBAL FUNCTIONS
  // Capitalize first letter, rest lower case
  function formattedWeekday(weekday) {
    weekday = weekday.toLocaleString("sv-SE", {
      weekday: "long",
    });

    weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1).toLowerCase();

    return weekday;
  }
  /*   
  //Hardcoded to today( index[0])
  let longWeekDay = new Date(
    (weatherList.list[0].dt + weatherList.city.timezone) * 1000
  ).toLocaleString("sv-SE", {
    weekday: "long",
  });

  longWeekDay =
    longWeekDay.charAt(0).toUpperCase() + longWeekDay.slice(1).toLowerCase();
 
    // let capitalizedLongWeekDay = formattedWeekday(longWeekDay);
 
    */
  //Returns array with the weather measurements of the input day
  function getDayWeather(forecastArr, inputDate, timezone) {
    inputDate = inputDate.getUTCDate();

    let result = forecastArr.filter((weatherItem) => {
      let weatherItemDate = new Date((weatherItem.dt + timezone) * 1000);
      weatherItemDate = weatherItemDate.getUTCDate();
      if (inputDate === weatherItemDate) {
        return true;
      } else {
        return false;
      }
    });
    return result;
  }

  console.log(getDayWeather(weatherList.list, localToday, localTimezone));
  console.log(getDayWeather(weatherList.list, localTomorrow, localTimezone));
  console.log(
    getDayWeather(weatherList.list, dayAfterLocalTomorrow, localTimezone)
  );
  console.log(getDayWeather(weatherList.list, inThreeDays, localTimezone));
  console.log(getDayWeather(weatherList.list, inFourDays, localTimezone));

  //Returns the min or max temp of the input day arr.
  function getMaxMinTemp(dayWeatherArr, maxOrMinTemp) {
    //Math.max Math.min
    const tempArr = [];

    if (maxOrMinTemp === "maxTemp") {
      for (let i = 0; i < dayWeatherArr.length; i++) {
        tempArr.push(dayWeatherArr[i].main.temp_max);
      }
      return Math.max(...tempArr);
    } else if (maxOrMinTemp === "minTemp") {
      for (let i = 0; i < dayWeatherArr.length; i++) {
        tempArr.push(dayWeatherArr[i].main.temp_min);
      }
      return Math.min(...tempArr);
    }
  }

  //Returns array with average weather based on number of measurements left in day, and max gust of the day.
  function getWind(dayWeatherArr) {
    const windInfo = {
      avgWindSpeed: 0,
      maxGust: 0,
    };
    const windSpeedArr = [];
    for (let i = 0; i < dayWeatherArr.length; i++) {
      windSpeedArr.push(dayWeatherArr[i].wind.speed);
    }

    windInfo.avgWindSpeed =
      windSpeedArr.reduce((acc, curr) => acc + curr, 0) / dayWeatherArr.length;

    //Max gust of day
    const maxGustArr = [];
    for (let i = 0; i < dayWeatherArr.length; i++) {
      dayWeatherArr[i].wind.gust === undefined
        ? "0"
        : maxGustArr.push(dayWeatherArr[i].wind.gust);
    }
    windInfo.maxGust = Math.max(...maxGustArr);
    console.log(
      `Avg wind: ${windInfo.avgWindSpeed} Max gust ${windInfo.maxGust}`
    );
    return windInfo;
  }
  console.log(getWind(localTodayWeatherArr));
  /* 
  console.log(
    `
${formattedWeekday(today)}
${formattedWeekday(localTomorrow)}
${formattedWeekday(dayAfterLocalTomorrow)}
${formattedWeekday(inThreeDays)}
${formattedWeekday(inFourDays)}
`
  );
   */
  //For each day of the five days, generate the weather table row.
  return `
  <tr>
    <td>${formattedWeekday(localToday)}</td>
    <td>
      <img src="${icon}" alt="Icon representation of the days weather">
    </td>
    <td>${getMaxMinTemp(localTodayWeatherArr, "minTemp")}/${getMaxMinTemp(
    localTodayWeatherArr,
    "maxTemp"
  )}</td>
    <td>${getWind(localTodayWeatherArr).avgWindSpeed}(${
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

    <tr>
    <td>${formattedWeekday(localTomorrow)}</td>
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
`;
}
