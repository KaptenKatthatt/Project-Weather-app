// Translations object
export const translations = {
  sv: {
    forecastTableTitle: "5-dygnsprognos",
    dayHeading: "Dygn",
    windHeading: `<span class="windHeading">Vind</span><span class="gust">(byvind)</span>`,
    precHeading: `<span class="precipLongSwe">Nederbörd</span><span class="precipShortSwe">Nederb.</span>`,
  },
  en: {
    forecastTableTitle: "5 day forecast",
    dayHeading: "Day",
    windHeading: `<span class="windHeading">Wind</span><span class="gust">(gust)</span>`,
    precHeading: `<span class="precipLongEng">Precipitation</span><span class="precipShortEng">Precip.</span>`,
  },
};

// DOM selectors
export const DOM = {
  cityForm: document.querySelector("form"),
  mainLeftEl: document.querySelector(".mainLeft"),
  mainRightEl: document.querySelector(".mainRight"),
  forecastTableContainerEl: document.querySelector(".forecastTableContainer"),
  forecastTableBodyEl: document.querySelector(".weatherTable"),
  windUnitEl: document.querySelector(".windUnit"),
  mainWeatherContainerEl: document.querySelector(".mainWeatherContainer"),
  htmlElement: document.documentElement,
  siteContainer: document.querySelector(".container"),
  themeToggleBtn: document.getElementById("theme-toggle"),
  tempToggleBtn: document.querySelector(".unitToggleBtn"),
  langSwitchBtn: document.querySelector(".langToggleBtn"),
  forecastTableTitleEl: document.querySelector(".forecastTableTitle"),
  dayHeadingEl: document.querySelector(".dayHeading"),
  windHeadingEl: document.querySelector(".windHeading"),
  precHeadingEl: document.querySelector(".precHeading"),
};
