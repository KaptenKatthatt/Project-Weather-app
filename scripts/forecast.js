export {
  setUnits,
  getUnits,
  setLang,
  getLang,
  getWeather,
  getForecast,
  getCity,
};
// import { key } from "./api.js";
// const API_KEY = process.env.API_KEY;

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
  const res = await fetch(
    `/api/openweather?type=weather&lat=${lat}&lon=${lon}&units=${units}&lang=${lang}`
  );
  if (!res.ok) throw new Error("Failed to fetch weather");
  const data = await res.json();

  // console.log("getWeather", data);
  return data;
};
// Get 5-day forecast
const getForecast = async (lat, lon) => {
  const res = await fetch(
    `/api/openweather?type=forecast&lat=${lat}&lon=${lon}&units=${units}&lang=${lang}`
  );
  if (!res.ok) throw new Error("Failed to fetch forecast");
  const data = await res.json();

  // console.log("getForecast", data);

  return data;
};

//Get city information. Gets Key that is then used in getWeather to get the weather for that city.
const getCity = async (city) => {
  const res = await fetch(
    `/api/openweather?type=geo&q=${city}&limit=1&lang=${lang}`
  );
  if (!res.ok) throw new Error("Failed to fetch city");
  const data = await res.json();

  // console.log("getCity", data[0]);

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
