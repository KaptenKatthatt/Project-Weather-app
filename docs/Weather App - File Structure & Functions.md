# Weather App - File Structure & Functions Overview

## Project Structure

```
/Weather app/scripts/
├── app.js                 (Main entry point - App logic & event handlers)
├── constants.js           (Constants, translations & DOM selectors)
├── forecast.js            (API calls & State management)
├── currentWeather.js      (UI component - Current weather panel)
├── mainRightForecast.js   (UI component - 18-hour forecast cards)
├── forecastTable.js       (UI component - 5-day forecast table)
└── api.js                 (API utility functions - if used)
```

---

## File Documentation

### **app.js** - Main Application Logic

**Purpose**: Central hub for app initialization, event handling, and UI updates

**Key Functions**:

- `updateUI(data)` - Updates entire UI with weather data
- `updateCity(city)` - Fetches data from API for a city
- `updateTableHeadings()` - Updates table headings based on language
- Event listeners: form submit, theme toggle, unit toggle, language toggle

**Key Variables**:

- `currentTheme` - Stores current theme (light/dark)
- `currentData` - Stores latest weather data
- `currentCity` - Stores current city name

**Translations Object**:

```javascript
translations = {
  sv: { ... },
  en: { ... }
}
```

---

### **constants.js** - Constants & Configuration

**Purpose**: Centralized storage for translations and DOM element selectors

**Exports**:

#### `translations` Object

- Swedish (sv) and English (en) translations for:
  - `forecastTableTitle` - "5-dygnsprognos" / "5 day forecast"
  - `dayHeading` - "Dygn" / "Day"
  - `windHeading` - Wind header with gust indicator
  - `precHeading` - Precipitation header

#### `DOM` Object

Centralized DOM selectors for:

- Forms: `cityForm`, `inputField`
- Main containers: `mainLeftEl`, `mainRightEl`, `siteContainer`
- Forecast containers: `forecastTableContainerEl`, `forecastTableBodyEl`
- Buttons: `themeToggleBtn`, `tempToggleBtn`, `langSwitchBtn`
- Table headings: `forecastTableTitleEl`, `dayHeadingEl`, `windHeadingEl`, `precHeadingEl`
- Other: `htmlElement`, `windUnitEl`, `mainWeatherContainerEl`

---

### **forecast.js** - API Integration & State Management

**Purpose**: Handle all API calls and manage application state (units, language)

**Key Functions**:

#### Data Fetching

- `getCity(city)` - Geocoding API → Gets city coordinates & details
- `getWeather(lat, lon)` - OpenWeather API → Gets current weather data
- `getForecast(lat, lon)` - OpenWeather API → Gets 5-day forecast

#### State Management

- `setUnits(newUnits)` - Sets units to localStorage (metric/imperial)
- `getUnits()` - Retrieves units from localStorage
- `setLang(newLang)` - Sets language to localStorage (sv/en)
- `getLang()` - Retrieves language from localStorage

**State Variables**:

- `units` - "metric" or "imperial"
- `lang` - "sv" or "en"

**⚠️ Issues to Fix**:

- Directly manipulates DOM (checkboxes, input placeholders)
- Should be moved to app.js or separated into dedicated module

---

### **currentWeather.js** - Current Weather UI Component

**Purpose**: Generate HTML for the current weather panel (left side)

**Exports**:

- `currentWeather(cityDets, localHour, weather)` - Returns HTML string

**Features**:

- Country flag image
- City name (localized if available)
- Current weekday
- Current time
- Weather icon & description
- Temperature (with unit indicator)
- Wind speed & direction (animated arrow)

**Dependencies**:

- `getLang()` from forecast.js
- `getUnits()` from forecast.js

---

### **mainRightForecast.js** - 18-Hour Forecast UI Component

**Purpose**: Generate HTML for individual 18-hour forecast cards (right sidebar)

**Exports**:

- `mainRightForecast(weatherListItem, timezone)` - Returns HTML string for one forecast card

**Helper Functions**:

- `precipitationAmount()` - Calculates precipitation from weather data
- `precipitationIcon()` - Returns appropriate precipitation icon
- `dayPeriod` - Determines time period (Morning, Noon, Evening, Night) based on hour

**Features**:

- Time period label
- Weather icon
- Temperature
- Precipitation info
- Wind speed & direction

---

### **forecastTable.js** - 5-Day Forecast Table Component

**Purpose**: Generate HTML table for 5-day weather forecast

**Exports**:

- `ForecastTable(weatherList)` - Returns complete table HTML

**Key Variables**:

- `localTimezone` - Timezone of searched city
- Day objects: `today`, `tomorrow`, `dayAfterTomorrow`, `inThreeDays`, `inFourDays`
- Weather arrays for each day

**Helper Functions**:

- `formattedWeekday(weekday)` - Capitalizes first letter
- `getDayWeather(forecastArr, inputDate)` - Filters weather data for specific day
- Row generation functions for each day

**Features**:

- Weekday headers
- Temperature min/max
- Precipitation amount
- Wind speed
- Weather description

---

### **api.js** - (Optional) API Utility Functions

**Purpose**: Potentially centralized API call logic
**Status**: May not be in use - check if needed

---

## Data Flow

```
User Input (Search/Toggle)
        ↓
    app.js (Event Handler)
        ↓
forecast.js (API calls)
        ↓
API Response (JSON)
        ↓
updateUI() in app.js
        ↓
Component Functions:
  - currentWeather()
  - mainRightForecast()
  - ForecastTable()
        ↓
HTML Rendering to DOM
```

---

## State Management

| State        | Storage      | Module      | Getter        | Setter                       |
| ------------ | ------------ | ----------- | ------------- | ---------------------------- |
| Theme        | localStorage | app.js      | -             | `currentTheme`               |
| Units        | localStorage | forecast.js | `getUnits()`  | `setUnits()`                 |
| Language     | localStorage | forecast.js | `getLang()`   | `setLang()`                  |
| City         | localStorage | app.js      | -             | localStorage.setItem("city") |
| Current Data | Memory       | app.js      | `currentData` | `updateUI()`                 |

---

## Environment Variables Needed

- OpenWeather API Key (for weather & forecast endpoints)
- Geocoding API Key (for city search)
- Backend proxy endpoint: `/api/openweather`

---

## TODO / Improvements

- [ ] Move DOM manipulation out of forecast.js
- [ ] Create dedicated theme.js or ui-utilities.js module
- [ ] Add translations for day periods (Morgon, Middag, etc.) in constants.js
- [ ] Consider moving translations logic to constants.js
- [ ] Add error handling improvements
- [ ] Separate concerns: split forecast.js into api.js and state.js
- [ ] Add JSDoc comments for all functions
- [ ] Consider using modules/imports consistently

---

**Last Updated**: 2 November 2025
