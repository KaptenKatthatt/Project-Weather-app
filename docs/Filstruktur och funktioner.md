Filstruktur och funktioner
app.js (Main entry point - App logic)
updateUI() - Uppdaterar hela UI:n med väderdata
updateCity() - Hämtar data från API för en stad
updateTableHeadings() - Uppdaterar tabell-rubriker baserat på språk
Event listeners för: formulär, tema-toggle, enhets-toggle, språk-toggle
translations objekt - Innehåller all text för tabellrubriker
constants.js (Konstanter och DOM-selektorer)
translations - Översättningar för svenska/engelska
DOM - Centraliserade DOM-element-selektorer
forecast.js (API & State management)
getCity() - Hämtar stad från Geocoding API
getWeather() - Hämtar aktuellt väder
getForecast() - Hämtar 5-dagars prognos
setUnits() / getUnits() - Hanterar enheter (metric/imperial)
setLang() / getLang() - Hanterar språk (sv/en)
Problem: Manipulerar DOM direkt (borde flyttas)
currentWeather.js (UI komponenter)
currentWeather() - Renderar aktuellt väder-panel (vänster sida)
mainRightForecast.js (UI komponenter)
mainRightForecast() - Renderar 18-timme prognos-kort (höger sidebar)
Hjälpfunktioner: precipitationAmount(), precipitationIcon(), dayPeriod logik
forecastTable.js (UI komponenter)
ForecastTable() - Renderar 5-dagars prognostabell
Många hjälpfunktioner: getDayWeather(), getTemp(), getWind(), getTotalPrecipitation(), etc.
