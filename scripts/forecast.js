export {
  setUnits,
  getUnits,
  setLang,
  getLang,
  getWeather,
  getForecast,
  getCity,
};
import { key } from "./api.js";

//Get weather information

//Set Metric or Imperial units
let units = "metric";
const setUnits = (newUnits) => {
  units = newUnits;
};
const getUnits = () => units;
//Set and Get Language
let lang = "sv";
const setLang = (newLang) => {
  lang = newLang;
};
const getLang = () => lang;

const getWeather = async (lat, lon) => {
  // const key = process.env.WEATHER_API_KEY;
  const base = `https://api.openweathermap.org/data/2.5/weather?`;
  const query = `lat=${lat}&lon=${lon}&units=${units}&appid=${key}&lang=${lang}`;

  const response = await fetch(base + query);
  const data = await response.json();

  console.log("getWeather", data);
  return data;
};
// Get 5-day forecast
const getForecast = async (lat, lon) => {
  const base = `https://api.openweathermap.org/data/2.5/forecast?`;
  const query = `lat=${lat}&lon=${lon}&units=${units}&appid=${key}&lang=${lang}`;

  const response = await fetch(base + query);
  const data = await response.json();

  console.log("getForecast", data);

  return data;
};

//Get city information. Gets Key that is then used in getWeather to get the weather for that city.
const getCity = async (city) => {
  const base = "http://api.openweathermap.org/geo/1.0/direct";
  const query = `?q=${city}&limit=1&appid=${key}&lang=${lang}`;

  const response = await fetch(base + query);
  const data = await response.json();

  console.log("getCity", data[0]);

  return data[0];
};
/* getCity("manchester")
  .then((data) => {
    return getWeather(data.Key);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
 */
// getWeather("329260");
