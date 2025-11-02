export {
  setUnits,
  getUnits,
  setLang,
  getLang,
  getWeather,
  getForecast,
  getCity,
};

//Get weather information

//Set Metric or Imperial units
let units = localStorage.getItem("units") || "metric";
//Sets unitSwitch to localStorage value
document.querySelector(".unitToggleBtn").checked =
  units === "metric" ? false : true;

const setUnits = (newUnits) => {
  localStorage.setItem("units", newUnits);
  units = newUnits;
};
const getUnits = () => {
  if (localStorage.getItem("units") !== null) {
    return localStorage.getItem("units");
  } else {
    return units;
  }
};
//Set and Get Language
let lang = localStorage.getItem("lang") || "sv";
//Sets langSwitch to localStorage value
document.querySelector(".langToggleBtn").checked = lang === "sv" ? false : true;
//Sets inputfield language
document.querySelector(".inputField").placeholder =
  lang === "sv" ? "Sök efter en stad..." : "Search for a city...";

const setLang = (newLang) => {
  localStorage.setItem("lang", newLang);
  lang = newLang;
  document.querySelector(".inputField").placeholder =
    lang === "sv" ? "Sök efter en stad..." : "Search for a city...";
};
const getLang = () => {
  if (localStorage.getItem("lang") !== null) {
    return localStorage.getItem("lang");
  } else {
    return lang;
  }
};

const getWeather = async (lat, lon) => {
  const result = await fetch(
    `/api/openweather?type=weather&lat=${lat}&lon=${lon}&units=${units}&lang=${lang}`
  );
  if (!result.ok) throw new Error("Failed to fetch weather");
  const data = await result.json();

  console.log("getWeather", data);
  return data;
};
// Get 5-day forecast
const getForecast = async (lat, lon) => {
  const result = await fetch(
    `/api/openweather?type=forecast&lat=${lat}&lon=${lon}&units=${units}&lang=${lang}`
  );
  if (!result.ok) throw new Error("Failed to fetch forecast");
  const data = await result.json();

  console.log("getForecast", data);

  return data;
};

//Get city information. Gets Key that is then used in getWeather to get the weather for that city.
const getCity = async (city) => {
  const result = await fetch(
    `/api/openweather?type=geo&q=${city}&limit=1&lang=${lang}`
  );
  if (!result.ok) throw new Error("Failed to fetch city");
  const data = await result.json();

  console.log("getCity", data[0]);

  return data[0];
};
