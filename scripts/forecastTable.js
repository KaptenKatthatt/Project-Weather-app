export function ForecastTable(weatherList, icon) {
  // Dagen är 00-21

  /* {
    datum:
    tid:
  }
 */

  //GLOBAL VARIABLES 🌐
  //Local today is the local date on the searched city.
  const localTimezone = weatherList.city.timezone;
  //**All days are local days for the searched city**
  const today = new Date(
    (weatherList.list[0].dt + weatherList.city.timezone) * 1000
  );
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  const inThreeDays = new Date(today);
  inThreeDays.setDate(inThreeDays.getDate() + 3);
  const inFourDays = new Date(today);
  inFourDays.setDate(inFourDays.getDate() + 4);

  let todayWeatherArr = getDayWeather(weatherList.list, today);
  let localTomorrowWeatherArr = getDayWeather(weatherList.list, tomorrow);
  let dayAfterTomorrowWeatherArr = getDayWeather(
    weatherList.list,
    dayAfterTomorrow
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

  console.log("Todays weatherArr", getDayWeather(weatherList.list, today));
  console.log("tomorrow", getDayWeather(weatherList.list, tomorrow));
  console.log(
    "Day after tomorrow",
    getDayWeather(weatherList.list, dayAfterTomorrow, localTimezone)
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
  console.log("WindInfo obj", getWind(todayWeatherArr));

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
${formattedWeekday(tomorrow)}
${formattedWeekday(dayAfterTomorrow)}
${formattedWeekday(inThreeDays)}
${formattedWeekday(inFourDays)}
`
  );
   */
  //For each day of the five days, generate the weather table row.
  return `
    <!-- DAY 1 -->
  <tr>
    <td>${formattedWeekday(today)}</td>
    <td>
      <img src="${icon}" alt="Icon representation of the days weather">
    </td>
    <td>${getTemp(todayWeatherArr).minTemp}/${
    getTemp(todayWeatherArr).maxTemp
  }</td>
    <td>${getWind(todayWeatherArr).avgWindSpeed}(${
    getWind(todayWeatherArr).maxGust
  })</td>
    <td>${getTotalRain(todayWeatherArr)}</td>
  </tr>

  <!-- DAY 2 -->
  <tr>
    <td>${formattedWeekday(tomorrow)}</td>
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
    <td>${formattedWeekday(dayAfterTomorrow)}</td>
    <td>
      <img src="${icon}" alt="Icon representation of the days weather">
    </td>
    <td>${getTemp(dayAfterTomorrowWeatherArr).minTemp}/${
    getTemp(dayAfterTomorrowWeatherArr).maxTemp
  }</td>
    <td>${getWind(dayAfterTomorrowWeatherArr).avgWindSpeed}(${
    getWind(dayAfterTomorrowWeatherArr).maxGust
  })</td>
    <td>${getTotalRain(dayAfterTomorrowWeatherArr)}</td>
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
