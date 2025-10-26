export function ForecastTable(weatherList) {
  //GLOBAL VARIABLES 🌐
  //Local today is the local date on the searched city.
  //**All days are local days for the searched city**
  //Timezone of searched city
  const localTimezone = weatherList.city.timezone;
  //Day Date objects based on todays date
  const today = new Date((weatherList.list[0].dt + localTimezone) * 1000);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  const inThreeDays = new Date(today);
  inThreeDays.setDate(inThreeDays.getDate() + 3);
  const inFourDays = new Date(today);
  inFourDays.setDate(inFourDays.getDate() + 4);

  //Variables containing the weather measurement arrays of each day
  let todayWeatherArr = getDayWeather(weatherList.list, today);
  let tomorrowWeatherArr = getDayWeather(weatherList.list, tomorrow);
  let dayAfterTomorrowWeatherArr = getDayWeather(
    weatherList.list,
    dayAfterTomorrow
  );
  let inThreeDaysWeatherArr = getDayWeather(weatherList.list, inThreeDays);
  let inFourDaysWeatherArr = getDayWeather(weatherList.list, inFourDays);

  //GLOBAL FUNCTIONS 🌐

  // Capitalizes first letter, rest lower case
  function formattedWeekday(weekday) {
    weekday = weekday.toLocaleString("sv-SE", {
      weekday: "long",
    });
    weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1).toLowerCase();
    return weekday;
  }

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

  // console.log("Todays weatherArr", getDayWeather(weatherList.list, today));
  // console.log("tomorrow", getDayWeather(weatherList.list, tomorrow));
  // console.log(
  //   "Day after tomorrow",
  //   getDayWeather(weatherList.list, dayAfterTomorrow)
  // );
  // console.log("In three days", getDayWeather(weatherList.list, inThreeDays));
  // console.log("In four days", getDayWeather(weatherList.list, inFourDays));

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
    //Average wind speed of the day
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

  //Returns total rain of input day array
  function getTotalRain(dayWeatherArr) {
    const totalRainArr = [];
    for (let i = 0; i < dayWeatherArr.length; i++) {
      dayWeatherArr[i].rain === undefined
        ? totalRainArr.push(0)
        : totalRainArr.push(dayWeatherArr[i].rain["3h"]);
    }
    return Math.round(totalRainArr.reduce((acc, curr) => acc + curr, 0));
  }
  /* 
  function getWeatherIcon(dayWeatherArr) {
    let noonIcon = "";
    let noonIconUrl = "";
    for (let i = 0; i < dayWeatherArr.length; i++) {
      if (dayWeatherArr[i].dt_txt.includes("12:00:00")) {
        noonIcon = dayWeatherArr[i].weather[0].icon;
        noonIconUrl = `<img src="https://openweathermap.org/img/wn/${noonIcon}@2x.png" alt="Icon of the days noon weather"></img>`;
      }
      //Fallback if 12:00 has passed and is not in reply.
      else {
        noonIcon = dayWeatherArr[0].weather[0].icon;
        noonIconUrl = `<img src="https://openweathermap.org/img/wn/${noonIcon}@2x.png" alt="Icon of the days noon weather"></img>`;
      }
    }

    return noonIconUrl;
  } */

  //Returns icon for 12:00 on the selected day
  function getWeatherIcon(dayWeatherArr) {
    const noonItem = dayWeatherArr.find((day) =>
      day.dt_txt.includes("12:00:00")
    );
    if (noonItem) {
      const noonIcon = noonItem.weather[0].icon;
      return `<img src="https://openweathermap.org/img/wn/${noonIcon}@2x.png" alt="Icon of the days noon weather">`;
    }
    //Fallback if 12:00 has passed and is not in reply.
    else {
      noonIcon = dayWeatherArr[0].weather[0].icon;
      noonIconUrl = `<img src="https://openweathermap.org/img/wn/${noonIcon}@2x.png" alt="Icon of the days noon weather"></img>`;
    }
  }

  //Renders one row in table
  function renderWeatherTable(dayArr, day) {
    console.log(dayArr);
    return `
    <tr>
      <td>${formattedWeekday(day)}</td>
      <td>${getWeatherIcon(dayArr)}</td>
      <td>${getTemp(dayArr).minTemp}&deg;/${getTemp(dayArr).maxTemp}&deg;</td>
      <td>${getWind(dayArr).avgWindSpeed}(${getWind(dayArr).maxGust})</td>
      <td>${getTotalRain(dayArr)}</td>
    </tr>
  `;
  }

  //Output to app.js: 5 day forecast table
  return `
    ${renderWeatherTable(todayWeatherArr, today)}
    ${renderWeatherTable(tomorrowWeatherArr, tomorrow)}
    ${renderWeatherTable(dayAfterTomorrowWeatherArr, dayAfterTomorrow)}
    ${renderWeatherTable(inThreeDaysWeatherArr, inThreeDays)}
    ${renderWeatherTable(inFourDaysWeatherArr, inFourDays)}
    `;
}
