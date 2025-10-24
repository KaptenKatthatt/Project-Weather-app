export function ForecastTable(weatherList, icon) {
  // Dagen är 00-21

  /* {
    datum:
    tid:
  }
 */

  //GLOBAL VARIABLES 🌐
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

  let localTodayWeatherArr = getDayWeather(weatherList.list, localToday);
  let localTomorrowWeatherArr = getDayWeather(weatherList.list, localTomorrow);
  let dayAfterLocalTomorrowWeatherArr = getDayWeather(
    weatherList.list,
    dayAfterLocalTomorrow
  );

  let inThreeDaysWeatherArr = getDayWeather(weatherList.list, inThreeDays);
  let inFourDaysWeatherArr = getDayWeather(weatherList.list, inFourDays);

  //GLOBAL FUNCTIONS 🌐
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
  function getDayWeather(forecastArr, inputDate) {
    inputDate = inputDate.getUTCDate();

    let result = forecastArr.filter((weatherItem) => {
      let weatherItemDate = new Date((weatherItem.dt + localTimezone) * 1000);
      weatherItemDate = weatherItemDate.getUTCDate();
      if (inputDate === weatherItemDate) {
        return true;
      } else {
        return false;
      }
    });
    return result;
  }

  console.log(
    "Todays weatherArr",
    getDayWeather(weatherList.list, localToday, localTimezone)
  );
  console.log(
    "Localtomorrow",
    getDayWeather(weatherList.list, localTomorrow, localTimezone)
  );
  console.log(
    "Day after tomorrow",
    getDayWeather(weatherList.list, dayAfterLocalTomorrow, localTimezone)
  );
  console.log(
    "In three days",
    getDayWeather(weatherList.list, inThreeDays, localTimezone)
  );
  console.log(
    "In four days",
    getDayWeather(weatherList.list, inFourDays, localTimezone)
  );

  //Returns the min or max temp of the input day arr.
  function getTemp(dayWeatherArr) {
    const tempObj = {
      minTemp: 0,
      maxTemp: 0,
    };
    let tempArr = [];
    //Get maxTemp
    for (let i = 0; i < dayWeatherArr.length; i++) {
      tempArr.push(dayWeatherArr[i].main.temp_max);
    }
    tempObj.maxTemp = Math.round(Math.max(...tempArr));
    tempArr = [];
    //Get minTemp
    for (let i = 0; i < dayWeatherArr.length; i++) {
      tempArr.push(dayWeatherArr[i].main.temp_min);
    }
    tempObj.minTemp = Math.round(Math.min(...tempArr));
    //Return temps
    return tempObj;
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

    windInfo.avgWindSpeed = Math.round(
      windSpeedArr.reduce((acc, curr) => acc + curr, 0) / dayWeatherArr.length
    );

    //Max gust of day
    const maxGustArr = [];
    for (let i = 0; i < dayWeatherArr.length; i++) {
      dayWeatherArr[i].wind.gust === undefined
        ? maxGustArr.push(0)
        : maxGustArr.push(dayWeatherArr[i].wind.gust);
    }
    windInfo.maxGust = Math.round(Math.max(...maxGustArr));
    return windInfo;
  }
  console.log("WindInfo obj", getWind(localTodayWeatherArr));

  function getTotalRain(dayWeatherArr) {
    const totalRainArr = [];
    for (let i = 0; i < dayWeatherArr.length; i++) {
      dayWeatherArr[i].rain === undefined
        ? totalRainArr.push(0)
        : totalRainArr.push(dayWeatherArr[i].rain["3h"]);
    }
    console.log(
      "Total rain",
      Math.round(totalRainArr.reduce((acc, curr) => acc + curr, 0))
    );
    return Math.round(totalRainArr.reduce((acc, curr) => acc + curr, 0));
  }
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
    <!-- DAY 1 -->
  <tr>
    <td>${formattedWeekday(localToday)}</td>
    <td>
      <img src="${icon}" alt="Icon representation of the days weather">
    </td>
    <td>${getTemp(localTodayWeatherArr).minTemp}/${
    getTemp(localTodayWeatherArr).maxTemp
  }</td>
    <td>${getWind(localTodayWeatherArr).avgWindSpeed}(${
    getWind(localTodayWeatherArr).maxGust
  })</td>
    <td>${getTotalRain(localTodayWeatherArr)}</td>
  </tr>

  <!-- DAY 2 -->
  <tr>
    <td>${formattedWeekday(localTomorrow)}</td>
    <td>
      <img src="${icon}" alt="Icon representation of the days weather">
    </td>
    <td>${getTemp(localTomorrowWeatherArr).minTemp}/${
    getTemp(localTomorrowWeatherArr).maxTemp
  }</td>
    <td>${getWind(localTomorrowWeatherArr).avgWindSpeed}(${
    getWind(localTomorrowWeatherArr).maxGust
  })</td>
    <td>${getTotalRain(localTomorrowWeatherArr)}</td>
  </tr>
  <!-- DAY 3 -->
  <tr>
    <td>${formattedWeekday(dayAfterLocalTomorrow)}</td>
    <td>
      <img src="${icon}" alt="Icon representation of the days weather">
    </td>
    <td>${getTemp(dayAfterLocalTomorrowWeatherArr).minTemp}/${
    getTemp(dayAfterLocalTomorrowWeatherArr).maxTemp
  }</td>
    <td>${getWind(dayAfterLocalTomorrowWeatherArr).avgWindSpeed}(${
    getWind(dayAfterLocalTomorrowWeatherArr).maxGust
  })</td>
    <td>${getTotalRain(dayAfterLocalTomorrowWeatherArr)}</td>
  </tr>

  <!-- DAY 4 -->
  <tr>
    <td>${formattedWeekday(inThreeDays)}</td>
    <td>
      <img src="${icon}" alt="Icon representation of the days weather">
    </td>
    <td>${getTemp(inThreeDaysWeatherArr).minTemp}/${
    getTemp(inThreeDaysWeatherArr).maxTemp
  }</td>
    <td>${getWind(inThreeDaysWeatherArr).avgWindSpeed}(${
    getWind(inThreeDaysWeatherArr).maxGust
  })</td>
    <td>${getTotalRain(inThreeDaysWeatherArr)}</td>
  </tr>
  <!-- DAY 5 -->
  <tr>
    <td>${formattedWeekday(inFourDays)}</td>
    <td>
      <img src="${icon}" alt="Icon representation of the days weather">
    </td>
    <td>${getTemp(inFourDaysWeatherArr).minTemp}/${
    getTemp(inFourDaysWeatherArr).maxTemp
  }</td>
    <td>${getWind(inFourDaysWeatherArr).avgWindSpeed}(${
    getWind(inFourDaysWeatherArr).maxGust
  })</td>
    <td>${getTotalRain(inFourDaysWeatherArr)}</td>
  </tr>
`;
}
